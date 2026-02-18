import { useEffect, useState } from 'react';
import {
  getCourseByIdFromSupabase,
  getVideosByCourseId,
  type VideoFromDb,
} from '../lib/supabaseCourses';
import { getCourseById } from '../courses';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export interface CourseDetailItem {
  id: string;
  title: string;
  description: string | null;
  duration?: string;
  order: number;
  videoUrl?: string;
  isPreview?: boolean;
}

export interface CourseDetail {
  id: string;
  title: string;
  description: string;
  tagline?: string;
  items: CourseDetailItem[];
  fromSupabase: boolean;
}

function formatDuration(seconds: number | null): string | undefined {
  if (seconds == null) return undefined;
  if (seconds < 60) return `${seconds} sec`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m} min ${s} sec` : `${m} min`;
}

/**
 * Fetches one course by id (UUID from Supabase or static id). Returns null if not found.
 */
export function useCourseDetail(courseId: string | undefined): {
  course: CourseDetail | null;
  loading: boolean;
} {
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(!!courseId);

  useEffect(() => {
    if (!courseId) {
      setCourse(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    const isUuid = UUID_REGEX.test(courseId);

    if (isUuid) {
      Promise.all([
        getCourseByIdFromSupabase(courseId),
        getVideosByCourseId(courseId),
      ])
        .then(([c, videos]) => {
          if (cancelled) return;
          if (!c) {
            setCourse(null);
            return;
          }
          setCourse({
            id: c.id,
            title: c.title,
            description: c.description ?? '',
            items: (videos as VideoFromDb[]).map((v) => ({
              id: v.id,
              title: v.title,
              description: v.description,
              duration: formatDuration(v.duration_seconds) ?? undefined,
              order: v.order_index,
              videoUrl: v.video_url,
              isPreview: v.is_preview,
            })),
            fromSupabase: true,
          });
        })
        .catch(() => {
          if (!cancelled) setCourse(null);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    } else {
      const staticCourse = getCourseById(courseId);
      if (!staticCourse) {
        setCourse(null);
        setLoading(false);
        return;
      }
      const sorted = [...staticCourse.modules].sort((a, b) => a.order - b.order);
      setCourse({
        id: staticCourse.id,
        title: staticCourse.title,
        description: staticCourse.description,
        tagline: staticCourse.tagline,
        items: sorted.map((m) => ({
          id: m.id,
          title: m.title,
          description: m.description,
          duration: m.duration ?? undefined,
          order: m.order,
        })),
        fromSupabase: false,
      });
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [courseId]);

  return { course, loading };
}

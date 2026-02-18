import { useEffect, useState } from 'react';
import { getCoursesFromSupabase } from '../lib/supabaseCourses';
import { COURSES } from '../courses';

export interface CourseListItem {
  id: string;
  title: string;
  description: string;
  tagline?: string;
  moduleCount: number;
  fromSupabase: boolean;
}

/**
 * Returns the list of courses to show (published from Supabase, or static fallback).
 */
export function useCoursesList(): { courses: CourseListItem[]; loading: boolean } {
  const [courses, setCourses] = useState<CourseListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getCoursesFromSupabase()
      .then((fromDb) => {
        if (cancelled) return;
        if (fromDb.length > 0) {
          setCourses(
            fromDb.map((c) => ({
              id: c.id,
              title: c.title,
              description: c.description ?? '',
              moduleCount: 0, // videos count shown on detail page
              fromSupabase: true,
            }))
          );
        } else {
          setCourses(
            COURSES.map((c) => ({
              id: c.id,
              title: c.title,
              description: c.description,
              tagline: c.tagline,
              moduleCount: c.modules.length,
              fromSupabase: false,
            }))
          );
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCourses(
            COURSES.map((c) => ({
              id: c.id,
              title: c.title,
              description: c.description,
              tagline: c.tagline,
              moduleCount: c.modules.length,
              fromSupabase: false,
            }))
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { courses, loading };
}

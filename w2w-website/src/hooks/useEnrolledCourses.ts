import { useEffect, useState } from 'react';
import { getEnrolledCourseIds } from '../lib/enrolledCourses';

/**
 * Returns the list of course IDs the current user is enrolled in.
 * Pass null for userId when not logged in.
 */
export function useEnrolledCourses(userId: string | null): {
  enrolledIds: string[];
  loading: boolean;
} {
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(!!userId);

  useEffect(() => {
    if (!userId) {
      setEnrolledIds([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    getEnrolledCourseIds(userId)
      .then((ids) => {
        if (!cancelled) setEnrolledIds(ids);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  return { enrolledIds, loading };
}

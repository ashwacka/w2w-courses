/**
 * Fetches course IDs the current user has purchased (enrolled in).
 * Uses your Supabase table: user_purchases (user_id, course_id UUID).
 */

import { supabase } from './supabase';

export async function getEnrolledCourseIds(userId: string): Promise<string[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('user_purchases')
    .select('course_id')
    .eq('user_id', userId);

  if (error) return [];
  return (data ?? []).map((row: { course_id: string }) => row.course_id);
}

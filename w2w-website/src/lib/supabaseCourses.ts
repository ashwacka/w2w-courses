/**
 * Fetches courses and videos from your Supabase tables:
 * - courses (id UUID, title, description, thumbnail_url, price, is_published)
 * - videos (course_id, title, description, video_url, duration_seconds, order_index, is_preview)
 */

import { supabase } from './supabase';

export interface CourseFromDb {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  price: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface VideoFromDb {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  video_url: string;
  duration_seconds: number | null;
  order_index: number;
  is_preview: boolean;
  created_at?: string;
  updated_at?: string;
}

export async function getCoursesFromSupabase(): Promise<CourseFromDb[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('courses')
    .select('id, title, description, thumbnail_url, price, is_published, created_at, updated_at')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) return [];
  return (data ?? []) as CourseFromDb[];
}

export async function getCourseByIdFromSupabase(courseId: string): Promise<CourseFromDb | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('courses')
    .select('id, title, description, thumbnail_url, price, is_published, created_at, updated_at')
    .eq('id', courseId)
    .single();

  if (error || !data) return null;
  return data as CourseFromDb;
}

export async function getVideosByCourseId(courseId: string): Promise<VideoFromDb[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('videos')
    .select('id, course_id, title, description, video_url, duration_seconds, order_index, is_preview, created_at, updated_at')
    .eq('course_id', courseId)
    .order('order_index', { ascending: true });

  if (error) return [];
  return (data ?? []) as VideoFromDb[];
}

import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEnrolledCourses } from '../hooks/useEnrolledCourses';
import { useCoursesList } from '../hooks/useCoursesList';
import styles from './MyCourses.module.css';

export function MyCourses() {
  const { user, loading: authLoading } = useAuth();
  const { enrolledIds, loading: enrolledLoading } = useEnrolledCourses(user?.id ?? null);
  const { courses: allCourses, loading: coursesLoading } = useCoursesList();
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/login?redirect=/my-courses', { replace: true });
    }
  }, [user, authLoading, navigate]);

  if (authLoading || !user) {
    return (
      <div className={styles.container}>
        <p className={styles.loading}>Loading…</p>
      </div>
    );
  }

  const enrolledCourses = allCourses.filter((c) => enrolledIds.includes(c.id));
  const metaLabel = (c: { moduleCount: number }) =>
    c.moduleCount > 0 ? `${c.moduleCount} modules` : 'Videos';

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Courses</h1>
      <p className={styles.subtitle}>
        Courses you have enrolled in. Start learning below.
      </p>

      {enrolledLoading || (enrolledIds.length > 0 && coursesLoading) ? (
        <p className={styles.loading}>Loading your courses…</p>
      ) : enrolledCourses.length === 0 ? (
        <div className={styles.empty}>
          <h2 className={styles.emptyTitle}>No courses yet</h2>
          <p className={styles.emptyText}>
            You don’t have access to any courses yet. Enrol in a course or contact us to get
            started.
          </p>
          <Link to="/courses" className={styles.emptyLink}>
            Browse courses
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {enrolledCourses.map((course) => (
            <Link key={course.id} to={`/course/${course.id}`} className={styles.card}>
              <div className={styles.cardIcon}>✒️</div>
              <h2 className={styles.cardTitle}>{course.title}</h2>
              <p className={styles.cardTagline}>{course.tagline ?? course.description}</p>
              <p className={styles.cardMeta}>{metaLabel(course)}</p>
              <span className={styles.cardLink}>Open course →</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

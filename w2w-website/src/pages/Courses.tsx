import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEnrolledCourses } from '../hooks/useEnrolledCourses';
import { useCoursesList } from '../hooks/useCoursesList';
import styles from './Courses.module.css';

export function Courses() {
  const { user } = useAuth();
  const { enrolledIds } = useEnrolledCourses(user?.id ?? null);
  const { courses, loading } = useCoursesList();

  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.loading}>Loading courses…</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our courses</h1>
      <p className={styles.subtitle}>
        Handwriting and graphology programs for students, kids, and professionals. Enrolled
        courses are unlocked in My Courses.
      </p>
      <div className={styles.grid}>
        {courses.map((course) => {
          const isEnrolled = enrolledIds.includes(course.id);
          const subtitle = course.tagline ?? course.description;
          const meta = course.moduleCount > 0 ? `${course.moduleCount} modules` : 'Videos';
          if (isEnrolled) {
            return (
              <Link key={course.id} to={`/course/${course.id}`} className={styles.card}>
                <div className={styles.cardIcon}>✒️</div>
                <h2 className={styles.cardTitle}>{course.title}</h2>
                <p className={styles.cardTagline}>{subtitle}</p>
                <p className={styles.cardMeta}>{meta}</p>
                <span className={styles.cardLink}>View course →</span>
              </Link>
            );
          }
          return (
            <div key={course.id} className={styles.cardLocked}>
              <div className={styles.cardLockIcon}>🔒</div>
              <h2 className={styles.cardTitle}>{course.title}</h2>
              <p className={styles.cardTagline}>{subtitle}</p>
              <p className={styles.cardMeta}>{meta}</p>
              <p className={styles.cardLockedText}>
                {user
                  ? 'Contact us to enrol and get access.'
                  : 'Log in to see your courses, or contact us to enrol.'}
              </p>
              <div className={styles.cardLockedActions}>
                {!user && (
                  <Link to="/login" className={styles.cardLockedButton}>
                    Log in
                  </Link>
                )}
                <Link to="/contact" className={styles.cardLockedButtonSecondary}>
                  Contact us
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

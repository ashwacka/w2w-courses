import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEnrolledCourses } from '../hooks/useEnrolledCourses';
import { useCourseDetail } from '../hooks/useCourseDetail';
import styles from './Course.module.css';

export function Course() {
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const { enrolledIds, loading: enrolledLoading } = useEnrolledCourses(user?.id ?? null);
  const { course, loading: courseLoading } = useCourseDetail(id ?? undefined);

  if (!id) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>Course not found.</p>
        <Link to="/courses" className={styles.backLink}>
          ← Back to courses
        </Link>
      </div>
    );
  }

  if (courseLoading && !course) {
    return (
      <div className={styles.container}>
        <p className={styles.loading}>Loading…</p>
        <Link to="/courses" className={styles.backLink}>
          ← Back to courses
        </Link>
      </div>
    );
  }

  if (!course) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>Course not found.</p>
        <Link to="/courses" className={styles.backLink}>
          ← Back to courses
        </Link>
      </div>
    );
  }

  const hasAccess = !!user && enrolledIds.includes(course.id);
  const loading = authLoading || (!!user && enrolledLoading);

  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.loading}>Loading…</p>
        <Link to="/courses" className={styles.backLink}>
          ← Back to courses
        </Link>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className={styles.scroll}>
        <div className={styles.topBar}>
          <Link to="/courses" className={styles.backLink}>
            ← Back to courses
          </Link>
        </div>
        <div className={styles.header}>
          <div className={styles.headerIcon}>🔒</div>
          <h1 className={styles.title}>{course.title}</h1>
          {course.tagline && <p className={styles.tagline}>{course.tagline}</p>}
          <p className={styles.description}>{course.description}</p>
        </div>
        <div className={styles.lockedCta}>
          <p className={styles.ctaText}>
            This course is available to enrolled students only. Contact us to enrol, or log in if
            you already have access.
          </p>
          <div className={styles.ctaRow}>
            {!user && (
              <Link to={`/login?redirect=/course/${course.id}`} className={styles.ctaButton}>
                Log in
              </Link>
            )}
            <a href="mailto:nidhi@write2win.com.sg" className={styles.ctaButton}>
              Email to enrol
            </a>
            <Link to="/contact" className={styles.ctaSecondary}>
              Contact us
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const sectionLabel = course.fromSupabase ? 'Videos' : 'Course modules';
  const sectionSub =
    course.items.length > 0
      ? `${course.items.length} ${course.fromSupabase ? 'videos' : 'modules'} • Complete in order for the best experience`
      : 'Content will appear here.';

  return (
    <div className={styles.scroll}>
      <div className={styles.topBar}>
        <Link to="/courses" className={styles.backLink}>
          ← Back to courses
        </Link>
      </div>
      <div className={styles.header}>
        <div className={styles.headerIcon}>✒️</div>
        <h1 className={styles.title}>{course.title}</h1>
        {course.tagline && <p className={styles.tagline}>{course.tagline}</p>}
        <p className={styles.description}>{course.description}</p>
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{sectionLabel}</h2>
        <p className={styles.sectionSub}>{sectionSub}</p>
        <div className={styles.moduleList}>
          {course.items.map((item, index) => (
            <div key={item.id} className={styles.moduleCard}>
              <div className={styles.moduleNumber}>{index + 1}</div>
              <div className={styles.moduleContent}>
                <h3 className={styles.moduleTitle}>{item.title}</h3>
                {item.description && (
                  <p className={styles.moduleDesc}>{item.description}</p>
                )}
                {item.duration && (
                  <span className={styles.moduleDuration}>{item.duration}</span>
                )}
                {item.videoUrl && (
                  <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.videoLink}
                  >
                    {item.isPreview ? 'Watch preview →' : 'Watch video →'}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.cta}>
        <p className={styles.ctaText}>
          Ready to start? Enrol or contact us for batches.
        </p>
        <div className={styles.ctaRow}>
          <a
            href="mailto:nidhi@write2win.com.sg"
            className={styles.ctaButton}
          >
            Email to enrol
          </a>
          <Link to="/contact" className={styles.ctaSecondary}>
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}

import { Link, useParams } from 'react-router-dom';
import { getCourseById } from '../courses';
import styles from './Course.module.css';

export function Course() {
  const { id } = useParams<{ id: string }>();
  const course = id ? getCourseById(id) : null;

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

  const sortedModules = [...course.modules].sort((a, b) => a.order - b.order);

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
        <p className={styles.tagline}>{course.tagline}</p>
        <p className={styles.description}>{course.description}</p>
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Course modules</h2>
        <p className={styles.sectionSub}>
          {sortedModules.length} modules • Complete in order for the best experience
        </p>
        <div className={styles.moduleList}>
          {sortedModules.map((mod, index) => (
            <div key={mod.id} className={styles.moduleCard}>
              <div className={styles.moduleNumber}>{index + 1}</div>
              <div className={styles.moduleContent}>
                <h3 className={styles.moduleTitle}>{mod.title}</h3>
                <p className={styles.moduleDesc}>{mod.description}</p>
                {mod.duration && (
                  <span className={styles.moduleDuration}>{mod.duration}</span>
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

import { Link } from 'react-router-dom';
import { COURSES } from '../courses';
import styles from './Courses.module.css';

export function Courses() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our courses</h1>
      <p className={styles.subtitle}>
        Handwriting and graphology programs for students, kids, and professionals. Choose a course
        to see modules and start learning.
      </p>
      <div className={styles.grid}>
        {COURSES.map((course) => (
          <Link key={course.id} to={`/course/${course.id}`} className={styles.card}>
            <div className={styles.cardIcon}>✒️</div>
            <h2 className={styles.cardTitle}>{course.title}</h2>
            <p className={styles.cardTagline}>{course.tagline}</p>
            <p className={styles.cardMeta}>{course.modules.length} modules</p>
            <span className={styles.cardLink}>View course →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

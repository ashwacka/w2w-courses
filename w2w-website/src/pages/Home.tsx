import { Link } from 'react-router-dom';
import { getFeaturedCourses } from '../courses';
import styles from './Home.module.css';

export function Home() {
  const featured = getFeaturedCourses();

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Write2Win</h1>
        <p className={styles.heroTagline}>Write the right way to win</p>
        <p className={styles.heroSub}>
          Singapore’s leading handwriting school — now online. Build better handwriting, boost grades,
          and grow confidence with result-proven programs for students and kids.
        </p>
        <Link to="/courses" className={styles.ctaButton}>
          Find your course
        </Link>
      </section>

      <section className={styles.stats}>
        <div className={styles.statsInner}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>1,200+</span>
            <span className={styles.statLabel}>Happy students</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>9</span>
            <span className={styles.statLabel}>Programs</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>9</span>
            <span className={styles.statLabel}>Qualified teachers</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>7</span>
            <span className={styles.statLabel}>Centers</span>
          </div>
        </div>
      </section>

      <section className={styles.howItWorks}>
        <h2 className={styles.howTitle}>How it works</h2>
        <p className={styles.howSub}>Get started in three simple steps</p>
        <div className={styles.steps}>
          <div className={styles.step}>
            <span className={styles.stepNum}>1</span>
            <h3 className={styles.stepTitle}>Choose your course</h3>
            <p className={styles.stepText}>
              Pick a program that fits your goal — from kids’ handwriting to graphology and signature improvement.
            </p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNum}>2</span>
            <h3 className={styles.stepTitle}>Learn at your pace</h3>
            <p className={styles.stepText}>
              Work through structured modules online. Practice with exercises designed to show real progress.
            </p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNum}>3</span>
            <h3 className={styles.stepTitle}>See the results</h3>
            <p className={styles.stepText}>
              Better handwriting, clearer expression, and more confidence in exams and everyday writing.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Popular courses</h2>
        <p className={styles.sectionSub}>
          Start with our most trusted programs for students and families.
        </p>
        <div className={styles.courseGrid}>
          {featured.map((course) => (
            <Link key={course.id} to={`/course/${course.id}`} className={styles.courseCard}>
              <div className={styles.courseCardIcon}>✒️</div>
              <h3 className={styles.courseCardTitle}>{course.title}</h3>
              <p className={styles.courseCardTagline}>{course.tagline}</p>
              <span className={styles.courseCardLink}>View course →</span>
            </Link>
          ))}
        </div>
        <div className={styles.sectionCta}>
          <Link to="/courses" className={styles.viewAllLink}>View all courses</Link>
        </div>
      </section>

      <section className={styles.about}>
        <h2 className={styles.aboutTitle}>About Write2Win</h2>
        <p className={styles.aboutBody}>
          Write2Win was founded in 2012 with a mission to positively affect lives through handwriting.
          We value each person’s uniqueness and guide them to write the right way—in career, personal
          life, and relationships. We’re a one-stop shop to understand your true personality through
          your handwriting.
        </p>
      </section>

      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to improve your handwriting?</h2>
        <p className={styles.ctaSub}>Explore courses or get in touch — we’re here to help.</p>
        <div className={styles.ctaRow}>
          <Link to="/courses" className={styles.ctaSecondary}>
            View all courses
          </Link>
          <Link to="/contact" className={styles.ctaButtonLight}>
            Contact us
          </Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © {new Date().getFullYear()} Write2Win. Handwriting Analysis & Courses.
        </p>
        <p className={styles.footerText}>Singapore • India</p>
      </footer>
    </>
  );
}

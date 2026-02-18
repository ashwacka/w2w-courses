import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Header.module.css';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Courses' },
  { to: '/contact', label: 'Contact Us' },
];

export function Header() {
  const location = useLocation();
  const { user, loading, signOut } = useAuth();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <span className={styles.logoText}>Write2Win</span>
        <span className={styles.tagline}>Write the right way</span>
      </Link>
      <nav className={styles.nav}>
        {navItems.map(({ to, label }) => {
          const isActive =
            location.pathname === to ||
            (to === '/courses' && location.pathname.startsWith('/course'));
          return (
            <Link
              key={to}
              to={to}
              className={[styles.navItem, isActive && styles.navItemActive].filter(Boolean).join(' ')}
            >
              {label}
            </Link>
          );
        })}
        {!loading && (
          user ? (
            <>
              <Link
                to="/my-courses"
                className={[styles.navItem, location.pathname === '/my-courses' && styles.navItemActive].filter(Boolean).join(' ')}
              >
                My Courses
              </Link>
              <button type="button" className={styles.navItemButton} onClick={() => signOut()}>
                Log out
              </button>
            </>
          ) : (
            <Link to="/login" className={styles.navItem}>
              Log in
            </Link>
          )
        )}
      </nav>
    </header>
  );
}

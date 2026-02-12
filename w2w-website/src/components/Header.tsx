import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Courses' },
  { to: '/contact', label: 'Contact Us' },
];

export function Header() {
  const location = useLocation();

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
      </nav>
    </header>
  );
}

import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Login.module.css';

type Mode = 'login' | 'signup';

export function Login() {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { signIn, signUp, isConfigured } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') ?? '/my-courses';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!email.trim() || !password) {
      setError('Please enter email and password.');
      return;
    }
    setLoading(true);

    if (mode === 'login') {
      const { error: err } = await signIn(email.trim(), password);
      if (err) {
        setError(err.message || 'Invalid email or password.');
        setLoading(false);
        return;
      }
      navigate(redirectTo, { replace: true });
    } else {
      const { error: err } = await signUp(email.trim(), password);
      if (err) {
        setError(err.message || 'Could not create account.');
        setLoading(false);
        return;
      }
      setSuccess('Account created. Please check your email to confirm, or sign in below.');
      setMode('login');
    }
    setLoading(false);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {mode === 'login' ? 'Log in' : 'Create account'}
      </h1>
      <p className={styles.subtitle}>
        {mode === 'login'
          ? 'Sign in to access your courses.'
          : 'Sign up to get started with Write2Win.'}
      </p>

      {!isConfigured && (
        <div className={styles.notConfigured}>
          <strong>Auth not configured</strong>
          Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env to enable login.
        </div>
      )}

      <div className={styles.tabs}>
        <button
          type="button"
          className={[styles.tab, mode === 'login' && styles.tabActive].filter(Boolean).join(' ')}
          onClick={() => setMode('login')}
        >
          Log in
        </button>
        <button
          type="button"
          className={[styles.tab, mode === 'signup' && styles.tabActive].filter(Boolean).join(' ')}
          onClick={() => setMode('signup')}
        >
          Sign up
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={styles.input}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            className={styles.input}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <button type="submit" className={styles.submit} disabled={loading || !isConfigured}>
          {loading ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}
        </button>
      </form>

      <p className={styles.footer}>
        <Link to="/" className={styles.footerLink}>
          ← Back to home
        </Link>
      </p>
    </div>
  );
}

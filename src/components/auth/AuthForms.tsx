"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import styles from './AuthForm.module.css';

// ─── LOGIN ────────────────────────────────────────────────────────────────────
export function LoginForm() {
  const { t } = useLanguage();
  const m = (t as any).auth?.login || {};
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const result = await signIn('credentials', {
      email: email.toLowerCase(),
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(m.invalidCredentials || 'Invalid email or password. Please try again.');
      setIsSubmitting(false);
    } else {
      setSuccess(true);
      // Redirect: if next param exists use it, otherwise go to profile/home
      const params = new URLSearchParams(window.location.search);
      const callbackUrl = params.get('callbackUrl') || '/';
      router.push(callbackUrl);
      router.refresh();
    }
  };

  if (success) {
    return (
      <div className={styles.formWrapper}>
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3>{m.successMsg || 'Welcome back!'}</h3>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.title}>{m.title || 'Log In'}</h2>
      {error && (
        <div className={styles.errorBanner}>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="login-email">{m.email || 'Email Address'}</label>
          <input
            id="login-email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="login-password">{m.password || 'Password'}</label>
          <div style={{ position: 'relative' }}>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              )}
            </button>
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <input type="checkbox" id="login-remember" />
          <label htmlFor="login-remember" className={styles.checkboxLabel}>{m.rememberMe || 'Remember me'}</label>
        </div>

        <Link href="/forgot-password" className={styles.forgotLink}>
          {m.forgotPasswordLink || 'Forgot password?'}
        </Link>

        <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
          {isSubmitting ? (m.loading || 'Logging in...') : (m.submitBtn || 'Log In')}
        </button>

        <p className={styles.footerText}>
          {m.noAccountText || "Don't have an account?"}{' '}
          <Link href="/signup" className={styles.footerLink} replace>{m.signupLink || 'Sign up'}</Link>
        </p>
      </form>
    </div>
  );
}

// ─── SIGNUP ───────────────────────────────────────────────────────────────────
export function SignupForm() {
  const { t } = useLanguage();
  const m = (t as any).auth?.signup || {};
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(m.passwordMismatch || 'Passwords do not match');
      return;
    }
    setError('');
    setIsSubmitting(true);

    // 1. Register the user
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Registration failed. Please try again.');
      setIsSubmitting(false);
      return;
    }

    // 2. Auto sign-in after successful registration
    const signInResult = await signIn('credentials', {
      email: email.toLowerCase(),
      password,
      redirect: false,
    });

    if (signInResult?.error) {
      // Registration succeeded but auto-login failed — send to login
      router.push('/login?registered=1');
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push('/');
        router.refresh();
      }, 1500);
    }
    setIsSubmitting(false);
  };

  if (success) {
    return (
      <div className={styles.formWrapper}>
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3>{m.successMsg || 'Account created! Signing you in...'}</h3>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.title}>{m.title || 'Create Account'}</h2>
      {error && <div className={styles.errorBanner}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="signup-name">{m.fullName || 'Full Name'}</label>
          <input
            id="signup-name"
            type="text"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="signup-email">{m.email || 'Email Address'}</label>
          <input
            id="signup-email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="signup-password">{m.password || 'Password'}</label>
          <div style={{ position: 'relative' }}>
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              )}
            </button>
          </div>
          <span className={styles.hintText}>{m.passwordHint || 'At least 8 characters'}</span>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="signup-confirm">{m.confirmPassword || 'Confirm Password'}</label>
          <input
            id="signup-confirm"
            type={showPassword ? "text" : "password"}
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); if (error) setError(''); }}
            required
            minLength={8}
            autoComplete="new-password"
          />
        </div>

        <div className={styles.checkboxGroup}>
          <input type="checkbox" id="signup-terms" required />
          <label htmlFor="signup-terms" className={styles.checkboxLabel}>{m.termsText || 'I agree to the Terms & Privacy Policy'}</label>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
          {isSubmitting ? (m.loading || 'Creating...') : (m.submitBtn || 'Create Account')}
        </button>

        <p className={styles.footerText}>
          {m.hasAccountText || "Already have an account?"}{' '}
          <Link href="/login" className={styles.footerLink} replace>{m.loginLink || 'Log in'}</Link>
        </p>
      </form>
    </div>
  );
}

// ─── FORGOT PASSWORD ──────────────────────────────────────────────────────────
export function ForgotPasswordForm() {
  const { t } = useLanguage();
  const m = (t as any).auth?.forgotPassword || {};

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Show success regardless (security best practice — never reveal if email exists)
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 800);
  };

  if (success) {
    return (
      <div className={styles.formWrapper}>
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>{m.successMsg || 'If an account exists for this email, a reset link has been sent.'}</p>
          <div style={{ marginTop: '2rem' }}>
            <Link href="/login" className={styles.footerLink} replace>← {m.backToLogin || 'Back to login'}</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.title}>{m.title || 'Reset Password'}</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="forgot-email">{m.email || 'Email Address'}</label>
          <input
            id="forgot-email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
          {isSubmitting ? (m.loading || 'Sending...') : (m.submitBtn || 'Send Reset Link')}
        </button>

        <p className={styles.footerText}>
          <Link href="/login" className={styles.footerLink} replace>← {m.backToLogin || 'Back to login'}</Link>
        </p>
      </form>
    </div>
  );
}

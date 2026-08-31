'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/sys-ops';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
    } else {
      router.push(callbackUrl);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0B1120',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-inter), Inter, sans-serif',
      }}
    >
      {/* Background grid pattern */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 25% 25%, rgba(201,169,110,0.04) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(99,102,241,0.04) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '0 1rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              color: '#C9A96E',
              fontWeight: 700,
              marginBottom: '0.5rem',
            }}
          >
            SYS-OPS
          </div>
          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#E2E8F0',
              margin: 0,
              letterSpacing: '-0.03em',
            }}
          >
            Admin Access
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.5rem' }}>
            Bossert Immobilien Control Panel
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            backgroundColor: '#131D33',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px',
            padding: '2rem',
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Error */}
            {error && (
              <div
                style={{
                  backgroundColor: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  borderRadius: '6px',
                  padding: '0.75rem 1rem',
                  color: '#FCA5A5',
                  fontSize: '0.85rem',
                }}
              >
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: '#94A3B8',
                  marginBottom: '0.5rem',
                }}
              >
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@bossert-immobilien.de"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  backgroundColor: '#0B1120',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                  color: '#E2E8F0',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.15s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(201,169,110,0.5)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>

            {/* Password */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: '#94A3B8',
                  marginBottom: '0.5rem',
                }}
              >
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  backgroundColor: '#0B1120',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                  color: '#E2E8F0',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.15s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(201,169,110,0.5)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.85rem',
                backgroundColor: loading ? '#1A2744' : '#C9A96E',
                color: loading ? '#64748B' : '#0B1120',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                marginTop: '0.5rem',
              }}
            >
              {loading ? 'AUTHENTICATING...' : 'SIGN IN TO SYS-OPS'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#334155', marginTop: '1.5rem' }}>
          Unauthorized access is strictly prohibited.
        </p>
      </div>
    </div>
  );
}

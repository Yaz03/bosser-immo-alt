'use client';

import React from 'react';
import { signOut } from 'next-auth/react';

const roleColors: Record<string, { bg: string; text: string }> = {
  SUPER_ADMIN: { bg: 'rgba(201,169,110,0.2)', text: '#C9A96E' },
  ADMIN: { bg: 'rgba(99,102,241,0.2)', text: '#818CF8' },
  EDITOR: { bg: 'rgba(16,185,129,0.2)', text: '#34D399' },
  VIEWER: { bg: 'rgba(100,116,139,0.2)', text: '#94A3B8' },
};

const roleLabels: Record<string, string> = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  EDITOR: 'Editor',
  VIEWER: 'Viewer',
};

interface TopBarProps {
  userName: string;
  userRole: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function TopBar({ userName, userRole, breadcrumbs }: TopBarProps) {
  const roleStyle = roleColors[userRole] || roleColors.VIEWER;

  return (
    <header
      style={{
        height: '60px',
        backgroundColor: '#0B1120',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
        <span style={{ color: '#475569' }}>Sys-ops</span>
        {breadcrumbs?.map((crumb, i) => (
          <React.Fragment key={i}>
            <span style={{ color: '#334155' }}>›</span>
            <span style={{ color: i === breadcrumbs.length - 1 ? '#E2E8F0' : '#64748B' }}>
              {crumb.label}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Right Side: User info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Role Badge */}
        <span
          style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            padding: '0.25rem 0.6rem',
            borderRadius: '4px',
            backgroundColor: roleStyle.bg,
            color: roleStyle.text,
          }}
        >
          {roleLabels[userRole] || userRole}
        </span>

        {/* Avatar + Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#1A2744',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              color: '#C9A96E',
              fontWeight: 600,
              border: '1px solid rgba(201,169,110,0.3)',
            }}
          >
            {userName?.[0]?.toUpperCase() || 'U'}
          </div>
          <span style={{ fontSize: '0.85rem', color: '#E2E8F0' }}>{userName}</span>
        </div>

        {/* Logout */}
        <button
          onClick={() => signOut({ callbackUrl: '/sys-ops/login' })}
          style={{
            background: 'none',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '6px',
            padding: '0.35rem 0.75rem',
            color: '#94A3B8',
            cursor: 'pointer',
            fontSize: '0.78rem',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(239,68,68,0.5)';
            e.currentTarget.style.color = '#EF4444';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.color = '#94A3B8';
          }}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}

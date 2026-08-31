'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  icon: string;
  roles?: string[];
}

const navGroups = [
  {
    items: [
      { label: 'Dashboard', href: '/sys-ops', icon: '⬡' },
    ],
  },
  {
    label: 'CONTENT',
    items: [
      { label: 'Properties', href: '/sys-ops/properties', icon: '🏢' },
      { label: 'Articles', href: '/sys-ops/articles', icon: '📝' },
      { label: 'Testimonials', href: '/sys-ops/testimonials', icon: '⭐' },
      { label: 'References', href: '/sys-ops/references', icon: '📁' },
      { label: 'Team', href: '/sys-ops/team', icon: '👥' },
      { label: 'FAQs', href: '/sys-ops/faqs', icon: '❓' },
    ],
  },
  {
    label: 'SETTINGS',
    items: [
      { label: 'Site Settings', href: '/sys-ops/settings', icon: '⚙️' },
    ],
  },
  {
    label: 'OPERATIONS',
    items: [
      { label: 'Contacts & Leads', href: '/sys-ops/contacts', icon: '📬' },
    ],
  },

  {
    label: 'ADMIN',
    items: [
      { label: 'Users', href: '/sys-ops/users', icon: '👤', roles: ['SUPER_ADMIN', 'ADMIN'] },
      { label: 'Audit Log', href: '/sys-ops/audit-log', icon: '📋', roles: ['SUPER_ADMIN'] },
    ],
  },
];

interface SidebarProps {
  userRole: string;
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ userRole, collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: collapsed ? '68px' : '240px',
        minHeight: '100vh',
        backgroundColor: '#0F1729',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.25s ease',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: collapsed ? '1.5rem 0' : '1.5rem 1.25rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          justifyContent: collapsed ? 'center' : 'space-between',
        }}
      >
        {!collapsed && (
          <div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#C9A96E', fontWeight: 600 }}>
              SYS-OPS
            </div>
            <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '0.1rem' }}>
              Bossert Admin
            </div>
          </div>
        )}
        <button
          onClick={onToggle}
          style={{
            background: 'none',
            border: 'none',
            color: '#94A3B8',
            cursor: 'pointer',
            fontSize: '1rem',
            padding: '0.25rem',
            lineHeight: 1,
          }}
        >
          {collapsed ? '▶' : '◀'}
        </button>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '1rem 0', overflowY: 'auto' }}>
        {navGroups.map((group, gi) => (
          <div key={gi}>
            {group.label && !collapsed && (
              <div
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  color: '#475569',
                  padding: '1rem 1.25rem 0.4rem',
                  fontWeight: 600,
                }}
              >
                {group.label}
              </div>
            )}
            {group.items
              .filter((item) => {
                if (!item.roles) return true;
                return item.roles.includes(userRole);
              })
              .map((item) => {
                const isActive = item.href === '/sys-ops' 
                  ? pathname === '/sys-ops' 
                  : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: collapsed ? '0.65rem 0' : '0.65rem 1.25rem',
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      backgroundColor: isActive ? 'rgba(201, 169, 110, 0.12)' : 'transparent',
                      borderRight: isActive ? '2px solid #C9A96E' : '2px solid transparent',
                      color: isActive ? '#C9A96E' : '#94A3B8',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: isActive ? 600 : 400,
                      transition: 'all 0.15s ease',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                        e.currentTarget.style.color = '#E2E8F0';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#94A3B8';
                      }
                    }}
                  >
                    <span style={{ fontSize: '1rem', flexShrink: 0 }}>{item.icon}</span>
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
          </div>
        ))}
      </nav>
    </aside>
  );
}

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminShell from '@/components/sys-ops/AdminShell';
import { redirect } from 'next/navigation';
import { canManageUsers } from '@/lib/auth';
import type { Role } from '@prisma/client';

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

export default async function UsersPage() {
  const session = await auth();
  if (!session) redirect('/sys-ops/login');

  const actorRole = (session.user as { role: Role }).role;
  if (!canManageUsers(actorRole)) redirect('/sys-ops');

  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, isActive: true, lastLoginAt: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  });

  const superAdminEmail = process.env.SUPERADMIN_EMAIL;

  return (
    <AdminShell breadcrumbs={[{ label: 'Users' }]}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#E2E8F0', letterSpacing: '-0.03em', margin: 0 }}>
            User Management
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            {users.length} admin accounts
          </p>
        </div>
        <a
          href="/sys-ops/users/new"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.25rem',
            backgroundColor: '#C9A96E',
            color: '#0B1120',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
          }}
        >
          + Invite User
        </a>
      </div>

      {/* Warning banner */}
      <div
        style={{
          backgroundColor: 'rgba(245,158,11,0.08)',
          border: '1px solid rgba(245,158,11,0.2)',
          borderRadius: '8px',
          padding: '0.85rem 1.25rem',
          marginBottom: '1.5rem',
          fontSize: '0.82rem',
          color: '#FCD34D',
        }}
      >
        ⚠️ The <strong>System Super Admin</strong> account (linked to <code>.env</code>) cannot be modified or deleted.
      </div>

      {/* Table */}
      <div
        style={{
          backgroundColor: '#131D33',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['Name', 'Email', 'Role', 'Status', 'Last Login', 'Actions'].map((h) => (
                <th key={h} style={{ padding: '0.85rem 1.25rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', color: '#64748B' }}>
                  {h.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => {
              const isSystemAdmin = user.email === superAdminEmail;
              const roleStyle = roleColors[user.role] || roleColors.VIEWER;

              return (
                <tr
                  key={user.id}
                  style={{
                    borderBottom: i < users.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    opacity: user.isActive ? 1 : 0.5,
                  }}
                >
                  <td style={{ padding: '0.85rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: '#1A2744',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.78rem',
                          color: '#C9A96E',
                          fontWeight: 600,
                          border: '1px solid rgba(201,169,110,0.2)',
                          flexShrink: 0,
                        }}
                      >
                        {user.name[0]?.toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', color: '#E2E8F0', fontWeight: 500 }}>{user.name}</div>
                        {isSystemAdmin && (
                          <div style={{ fontSize: '0.68rem', color: '#C9A96E', letterSpacing: '0.08em' }}>SYSTEM ACCOUNT</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 1.25rem', fontSize: '0.83rem', color: '#94A3B8' }}>{user.email}</td>
                  <td style={{ padding: '0.85rem 1.25rem' }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '4px',
                        backgroundColor: roleStyle.bg,
                        color: roleStyle.text,
                      }}
                    >
                      {roleLabels[user.role] || user.role}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1.25rem' }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '4px',
                        backgroundColor: user.isActive ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                        color: user.isActive ? '#34D399' : '#FCA5A5',
                      }}
                    >
                      {user.isActive ? 'ACTIVE' : 'DISABLED'}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1.25rem', fontSize: '0.8rem', color: '#64748B' }}>
                    {user.lastLoginAt
                      ? new Date(user.lastLoginAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                      : 'Never'}
                  </td>
                  <td style={{ padding: '0.85rem 1.25rem' }}>
                    {isSystemAdmin ? (
                      <span style={{ fontSize: '0.75rem', color: '#334155' }}>— Protected</span>
                    ) : (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <a
                          href={`/sys-ops/users/${user.id}/edit`}
                          style={{ padding: '0.3rem 0.7rem', backgroundColor: 'rgba(99,102,241,0.15)', color: '#818CF8', borderRadius: '4px', textDecoration: 'none', fontSize: '0.75rem' }}
                        >
                          Edit
                        </a>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

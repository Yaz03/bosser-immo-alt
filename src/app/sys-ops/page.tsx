import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminShell from '@/components/sys-ops/AdminShell';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect('/sys-ops/login');

  // Fetch quick stats
  const [
    propertiesCount,
    publishedProperties,
    articlesCount,
    newSubmissions,
    subscribers,
    recentLogs,
  ] = await Promise.all([
    prisma.property.count(),
    prisma.property.count({ where: { status: 'PUBLISHED' } }),
    prisma.article.count({ where: { status: 'PUBLISHED' } }),
    prisma.contactSubmission.count({ where: { status: 'NEW' } }),
    prisma.newsletterSubscriber.count({ where: { isActive: true } }),
    prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 8,
    }),
  ]);

  const userName = session.user?.name || 'Admin';
  const userRole = (session.user as { role?: string })?.role || 'VIEWER';

  const stats = [
    { label: 'Total Properties', value: propertiesCount, sub: `${publishedProperties} published`, color: '#C9A96E', icon: '🏢' },
    { label: 'Published Articles', value: articlesCount, sub: 'Knowledge articles', color: '#818CF8', icon: '📝' },
    { label: 'New Inquiries', value: newSubmissions, sub: 'Awaiting response', color: '#EF4444', icon: '📬' },
    { label: 'Subscribers', value: subscribers, sub: 'Newsletter signups', color: '#34D399', icon: '📧' },
  ];

  return (
    <AdminShell>
      {/* Welcome */}
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#E2E8F0',
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          Welcome back, {userName.split(' ')[0]} 👋
        </h1>
        <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '0.3rem' }}>
          {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2.5rem',
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              backgroundColor: '#131D33',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '10px',
              padding: '1.25rem 1.5rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                  {stat.label.toUpperCase()}
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: stat.color, lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '0.35rem' }}>
                  {stat.sub}
                </div>
              </div>
              <span style={{ fontSize: '1.5rem', opacity: 0.6 }}>{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout: Quick Actions + Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1.5rem' }}>

        {/* Quick Actions */}
        <div
          style={{
            backgroundColor: '#131D33',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '10px',
            padding: '1.5rem',
          }}
        >
          <h2 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.08em', marginBottom: '1.25rem', marginTop: 0 }}>
            QUICK ACTIONS
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {[
              { label: '+ Add New Property', href: '/sys-ops/properties/new', color: '#C9A96E' },
              { label: '+ Write New Article', href: '/sys-ops/articles/new', color: '#818CF8' },
              { label: '→ View Submissions', href: '/sys-ops/submissions', color: '#34D399' },
              { label: '→ Manage Users', href: '/sys-ops/users', color: '#94A3B8' },
            ].map((action) => (
              <a
                key={action.href}
                href={action.href}
                style={{
                  display: 'block',
                  padding: '0.65rem 1rem',
                  backgroundColor: '#0B1120',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '6px',
                  color: action.color,
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = action.color + '44')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div
          style={{
            backgroundColor: '#131D33',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '10px',
            padding: '1.5rem',
          }}
        >
          <h2 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.08em', marginBottom: '1.25rem', marginTop: 0 }}>
            RECENT ACTIVITY
          </h2>
          {recentLogs.length === 0 ? (
            <p style={{ color: '#475569', fontSize: '0.85rem' }}>No activity yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recentLogs.map((log) => (
                <div
                  key={log.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.5rem',
                      borderRadius: '3px',
                      backgroundColor:
                        log.action === 'CREATE' ? 'rgba(16,185,129,0.15)' :
                        log.action === 'DELETE' ? 'rgba(239,68,68,0.15)' :
                        'rgba(99,102,241,0.15)',
                      color:
                        log.action === 'CREATE' ? '#34D399' :
                        log.action === 'DELETE' ? '#FCA5A5' :
                        '#818CF8',
                      flexShrink: 0,
                    }}
                  >
                    {log.action}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: '0.82rem', color: '#E2E8F0' }}>{log.entityType}</span>
                    {log.detail && (
                      <span style={{ fontSize: '0.78rem', color: '#64748B' }}> · {log.detail}</span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#334155', flexShrink: 0 }}>
                    {new Date(log.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}

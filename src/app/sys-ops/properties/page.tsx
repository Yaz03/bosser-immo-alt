import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminShell from '@/components/sys-ops/AdminShell';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const statusColors: Record<string, { bg: string; text: string }> = {
  PUBLISHED: { bg: 'rgba(16,185,129,0.15)', text: '#34D399' },
  DRAFT: { bg: 'rgba(245,158,11,0.15)', text: '#FCD34D' },
  ARCHIVED: { bg: 'rgba(100,116,139,0.15)', text: '#94A3B8' },
};

export default async function PropertiesPage() {
  const session = await auth();
  if (!session) redirect('/sys-ops/login');

  const properties = await prisma.property.findMany({
    include: { images: { take: 1, orderBy: { order: 'asc' } } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <AdminShell breadcrumbs={[{ label: 'Properties' }]}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#E2E8F0', letterSpacing: '-0.03em', margin: 0 }}>
            Properties
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            {properties.length} total properties
          </p>
        </div>
        <Link
          href="/sys-ops/properties/new"
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
          + Add Property
        </Link>
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
              {['Property', 'Type', 'Price', 'Location', 'Status', 'Actions'].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: '0.85rem 1.25rem',
                    textAlign: 'left',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    color: '#64748B',
                  }}
                >
                  {h.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {properties.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#475569' }}>
                  No properties yet. Add your first one!
                </td>
              </tr>
            ) : (
              properties.map((prop, i) => {
                const statusStyle = statusColors[prop.status] || statusColors.DRAFT;
                const thumb = prop.images[0]?.url || prop.heroImage;

                return (
                  <tr
                    key={prop.id}
                    style={{
                      borderBottom: i < properties.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    }}
                  >
                    {/* Thumbnail + ID */}
                    <td style={{ padding: '0.85rem 1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div
                          style={{
                            width: '48px',
                            height: '36px',
                            borderRadius: '4px',
                            backgroundColor: '#1A2744',
                            backgroundImage: thumb ? `url(${thumb})` : undefined,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ fontSize: '0.78rem', color: '#475569', fontFamily: 'monospace' }}>
                          {prop.id.slice(0, 8)}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem', fontSize: '0.85rem', color: '#E2E8F0' }}>
                      {prop.type}
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem', fontSize: '0.85rem', color: '#C9A96E', fontWeight: 600 }}>
                      {prop.priceDisplay}
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem', fontSize: '0.85rem', color: '#94A3B8' }}>
                      {prop.location}
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem' }}>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          letterSpacing: '0.08em',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '4px',
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.text,
                        }}
                      >
                        {prop.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Link
                          href={`/sys-ops/properties/${prop.id}/edit`}
                          style={{
                            padding: '0.3rem 0.7rem',
                            backgroundColor: 'rgba(99,102,241,0.15)',
                            color: '#818CF8',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                          }}
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/properties/${prop.id}`}
                          target="_blank"
                          style={{
                            padding: '0.3rem 0.7rem',
                            backgroundColor: 'rgba(100,116,139,0.15)',
                            color: '#94A3B8',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            fontSize: '0.75rem',
                          }}
                        >
                          View ↗
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

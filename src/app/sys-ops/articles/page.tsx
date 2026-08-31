'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import AdminShell from '@/components/sys-ops/AdminShell';

interface Article {
  id: string;
  titleEn: string;
  category: string;
  status: string;
  featured: boolean;
  publishedAt: string;
  heroImage: string | null;
}

const STATUS_COLORS: Record<string, string> = {
  PUBLISHED: '#34D399',
  DRAFT: '#FCD34D',
  ARCHIVED: '#94A3B8',
};

export default function ArticlesListPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/sys-ops/articles?limit=100');
    const data = await res.json();
    setArticles(data.articles || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, []);

  useEffect(() => { fetchArticles(); }, [fetchArticles]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    await fetch(`/api/sys-ops/articles/${id}`, { method: 'DELETE' });
    fetchArticles();
    setDeleting(null);
  };

  const th: React.CSSProperties = {
    padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.7rem',
    fontWeight: 600, letterSpacing: '0.1em', color: '#475569',
    textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.05)',
  };
  const td: React.CSSProperties = {
    padding: '0.9rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.04)',
    fontSize: '0.87rem', color: '#CBD5E1', verticalAlign: 'middle',
  };

  return (
    <AdminShell breadcrumbs={[{ label: 'Articles' }]}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#E2E8F0', letterSpacing: '-0.03em', margin: 0 }}>
            Articles <span style={{ color: '#475569', fontWeight: 400, fontSize: '1rem' }}>({total})</span>
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            Knowledge Hub articles — shown on the /knowledge page
          </p>
        </div>
        <Link
          href="/sys-ops/articles/new"
          style={{ padding: '0.65rem 1.25rem', backgroundColor: '#C9A96E', color: '#0B1120', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}
        >
          + New Article
        </Link>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: '#131D33', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: '#475569' }}>Loading...</div>
        ) : articles.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: '#475569' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📝</div>
            <p>No articles yet.</p>
            <Link href="/sys-ops/articles/new" style={{ color: '#C9A96E', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
              Create your first article →
            </Link>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={th}>Article</th>
                <th style={th}>Category</th>
                <th style={th}>Status</th>
                <th style={th}>Featured</th>
                <th style={th}>Published</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id} style={{ transition: 'background 0.1s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {/* Title + thumbnail */}
                  <td style={td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {a.heroImage ? (
                        <img src={a.heroImage} alt="" style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }} />
                      ) : (
                        <div style={{ width: '48px', height: '36px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', flexShrink: 0 }} />
                      )}
                      <span style={{ fontWeight: 500, color: '#E2E8F0', lineHeight: 1.3 }}>{a.titleEn}</span>
                    </div>
                  </td>
                  <td style={td}>
                    <span style={{ padding: '0.2rem 0.5rem', backgroundColor: 'rgba(201,169,110,0.1)', color: '#C9A96E', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 600 }}>
                      {a.category}
                    </span>
                  </td>
                  <td style={td}>
                    <span style={{
                      padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 600,
                      backgroundColor: `${STATUS_COLORS[a.status] || '#94A3B8'}20`,
                      color: STATUS_COLORS[a.status] || '#94A3B8',
                    }}>
                      {a.status}
                    </span>
                  </td>
                  <td style={td}>
                    {a.featured ? (
                      <span style={{ color: '#C9A96E', fontSize: '0.85rem' }}>⭐ Yes</span>
                    ) : (
                      <span style={{ color: '#334155', fontSize: '0.82rem' }}>—</span>
                    )}
                  </td>
                  <td style={td}>
                    {a.publishedAt
                      ? new Date(a.publishedAt).toLocaleDateString('en-DE', { day: '2-digit', month: 'short', year: 'numeric' })
                      : <span style={{ color: '#334155' }}>—</span>}
                  </td>
                  <td style={td}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link
                        href={`/sys-ops/articles/${a.id}/edit`}
                        style={{ padding: '0.35rem 0.7rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '5px', color: '#94A3B8', textDecoration: 'none', fontSize: '0.78rem' }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(a.id, a.titleEn)}
                        disabled={deleting === a.id}
                        style={{ padding: '0.35rem 0.7rem', backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '5px', color: '#FCA5A5', cursor: 'pointer', fontSize: '0.78rem' }}
                      >
                        {deleting === a.id ? '...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminShell>
  );
}

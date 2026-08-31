'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminShell from '@/components/sys-ops/AdminShell';
import ImageUpload from '@/components/sys-ops/ImageUpload';

interface ArticleFormProps {
  initial?: {
    id?: string;
    titleEn: string;
    titleDe: string;
    descEn: string;
    descDe: string;
    contentEn: string;
    contentDe: string;
    category: string;
    heroImage: string;
    status: string;
    featured: boolean;
    author: string;
    slug: string;
    metaTitleEn: string;
    metaDescEn: string;
  };
}

const CATEGORIES = ['Market Insights', 'Investment', 'Lifestyle', 'Legal & Finance', 'Architecture', 'Off-Market'];
const STATUSES = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.7rem 1rem',
  backgroundColor: '#0B1120',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '8px', color: '#E2E8F0',
  fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box',
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.7rem', fontWeight: 600,
  letterSpacing: '0.1em', color: '#94A3B8', marginBottom: '0.35rem',
};
const sectionStyle: React.CSSProperties = {
  backgroundColor: '#131D33', border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: '10px', padding: '1.5rem', marginBottom: '1.25rem',
};

const defaultForm = {
  id: undefined as string | undefined,
  titleEn: '', titleDe: '',
  descEn: '', descDe: '',
  contentEn: '', contentDe: '',
  category: CATEGORIES[0],
  heroImage: '',
  status: 'DRAFT',
  featured: false,
  author: '',
  slug: '',
  metaTitleEn: '', metaDescEn: '',
};

export default function ArticleForm({ initial }: ArticleFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({ ...defaultForm, ...initial });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content');

  const isEdit = !!form.id;

  const set = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  // Auto-generate slug from EN title
  const handleTitleChange = (val: string) => {
    set('titleEn', val);
    if (!isEdit || !form.slug) {
      set('slug', val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  const handleSave = async (e: React.FormEvent, asDraft = false) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      ...form,
      status: asDraft ? 'DRAFT' : form.status,
      publishedAt: form.status === 'PUBLISHED' || !asDraft ? new Date().toISOString() : null,
    };

    const url = isEdit ? `/api/sys-ops/articles/${form.id}` : '/api/sys-ops/articles';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/sys-ops/articles');
    } else {
      const d = await res.json();
      setError(d.error || 'Save failed');
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'content' as const, label: '📝 Content' },
    { id: 'seo' as const, label: '🔍 SEO' },
    { id: 'settings' as const, label: '⚙️ Settings' },
  ];

  return (
    <AdminShell
      breadcrumbs={[
        { label: 'Articles', href: '/sys-ops/articles' },
        { label: isEdit ? 'Edit Article' : 'New Article' },
      ]}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#E2E8F0', letterSpacing: '-0.03em', margin: 0 }}>
            {isEdit ? 'Edit Article' : 'New Article'}
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            {isEdit ? `Editing: ${form.titleEn}` : 'Fill in the details below to create a new article.'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={(e) => handleSave(e, true)}
            disabled={saving}
            style={{ padding: '0.65rem 1.1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#94A3B8', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={(e) => handleSave(e, false)}
            disabled={saving}
            style={{ padding: '0.65rem 1.25rem', backgroundColor: saving ? '#1A2744' : '#C9A96E', color: saving ? '#64748B' : '#0B1120', border: 'none', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer' }}
          >
            {saving ? 'Saving...' : isEdit ? 'Update Article' : 'Publish Article'}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '0.75rem 1rem', color: '#FCA5A5', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
          {error}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '1.5rem' }}>
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: '0.65rem 1.1rem', background: 'none', border: 'none',
            borderBottom: activeTab === tab.id ? '2px solid #C9A96E' : '2px solid transparent',
            color: activeTab === tab.id ? '#C9A96E' : '#64748B',
            fontSize: '0.83rem', fontWeight: activeTab === tab.id ? 600 : 400,
            cursor: 'pointer', marginBottom: '-1px',
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={(e) => handleSave(e, false)}>

        {/* ── CONTENT TAB ─────────────────────────── */}
        {activeTab === 'content' && (
          <>
            {/* Hero Image */}
            <div style={sectionStyle}>
              <h3 style={{ color: '#E2E8F0', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem' }}>Hero Image</h3>
              <ImageUpload
                value={form.heroImage}
                onChange={(url) => set('heroImage', url)}
                folder="articles"
              />
            </div>

            {/* Titles */}
            <div style={sectionStyle}>
              <h3 style={{ color: '#E2E8F0', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.25rem' }}>Titles</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>TITLE (English) *</label>
                  <input style={inputStyle} value={form.titleEn} required
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Luxury Real Estate Trends 2025" />
                </div>
                <div>
                  <label style={labelStyle}>TITLE (German)</label>
                  <input style={inputStyle} value={form.titleDe}
                    onChange={(e) => set('titleDe', e.target.value)}
                    placeholder="Luxusimmobilien-Trends 2025" />
                </div>
              </div>
            </div>

            {/* Excerpts */}
            <div style={sectionStyle}>
              <h3 style={{ color: '#E2E8F0', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.25rem' }}>Excerpt / Description</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>EXCERPT (English) *</label>
                  <textarea style={{ ...inputStyle, resize: 'vertical' }} value={form.descEn} rows={3} required
                    onChange={(e) => set('descEn', e.target.value)}
                    placeholder="Short summary shown in the article list..." />
                </div>
                <div>
                  <label style={labelStyle}>EXCERPT (German)</label>
                  <textarea style={{ ...inputStyle, resize: 'vertical' }} value={form.descDe} rows={3}
                    onChange={(e) => set('descDe', e.target.value)}
                    placeholder="Kurze Zusammenfassung..." />
                </div>
              </div>
            </div>

            {/* Body Content */}
            <div style={sectionStyle}>
              <h3 style={{ color: '#E2E8F0', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.25rem' }}>Body Content</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>BODY (English)</label>
                  <textarea style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: '0.82rem' }}
                    value={form.contentEn} rows={12}
                    onChange={(e) => set('contentEn', e.target.value)}
                    placeholder="Full article content in English. Supports plain text or basic Markdown..." />
                </div>
                <div>
                  <label style={labelStyle}>BODY (German)</label>
                  <textarea style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: '0.82rem' }}
                    value={form.contentDe} rows={12}
                    onChange={(e) => set('contentDe', e.target.value)}
                    placeholder="Vollständiger Artikelinhalt auf Deutsch..." />
                </div>
              </div>
            </div>

            <div style={{ ...sectionStyle }}>
              <label style={labelStyle}>AUTHOR</label>
              <input style={inputStyle} value={form.author}
                onChange={(e) => set('author', e.target.value)}
                placeholder="Bossert Editorial Team" />
            </div>
          </>
        )}

        {/* ── SEO TAB ─────────────────────────────── */}
        {activeTab === 'seo' && (
          <div style={sectionStyle}>
            <h3 style={{ color: '#E2E8F0', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.25rem' }}>SEO & URL</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>SLUG (URL path)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#475569', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>/knowledge/</span>
                  <input style={inputStyle} value={form.slug}
                    onChange={(e) => set('slug', e.target.value)}
                    placeholder="luxury-real-estate-trends-2025" />
                </div>
              </div>
              <div>
                <label style={labelStyle}>META TITLE (English)</label>
                <input style={inputStyle} value={form.metaTitleEn}
                  onChange={(e) => set('metaTitleEn', e.target.value)}
                  placeholder="Defaults to article title if empty" />
              </div>
              <div>
                <label style={labelStyle}>META DESCRIPTION (English)</label>
                <textarea style={{ ...inputStyle, resize: 'vertical' }} value={form.metaDescEn} rows={3}
                  onChange={(e) => set('metaDescEn', e.target.value)}
                  placeholder="~155 characters. Defaults to excerpt if empty." />
                <span style={{ fontSize: '0.72rem', color: '#475569', marginTop: '0.25rem', display: 'block' }}>
                  {form.metaDescEn.length} / 155 characters
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── SETTINGS TAB ────────────────────────── */}
        {activeTab === 'settings' && (
          <div style={sectionStyle}>
            <h3 style={{ color: '#E2E8F0', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.25rem' }}>Publication Settings</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={labelStyle}>CATEGORY *</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.category}
                  onChange={(e) => set('category', e.target.value)} required>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>STATUS</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.status}
                  onChange={(e) => set('status', e.target.value)}>
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', backgroundColor: 'rgba(201,169,110,0.05)', border: '1px solid rgba(201,169,110,0.1)', borderRadius: '8px' }}>
              <input type="checkbox" id="featured" checked={form.featured}
                onChange={(e) => set('featured', e.target.checked)}
                style={{ width: '15px', height: '15px', cursor: 'pointer' }} />
              <label htmlFor="featured" style={{ ...labelStyle, margin: 0, cursor: 'pointer', color: '#C9A96E' }}>
                ⭐ FEATURED — Shown as the hero article at the top of the Knowledge Hub
              </label>
            </div>
          </div>
        )}

      </form>
    </AdminShell>
  );
}

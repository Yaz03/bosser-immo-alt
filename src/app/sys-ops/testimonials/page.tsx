'use client';

import React, { useState, useEffect, useCallback } from 'react';
import AdminShell from '@/components/sys-ops/AdminShell';
import ImageUpload from '@/components/sys-ops/ImageUpload';

interface Testimonial {
  id: string;
  quoteEn: string;
  quoteDe?: string;
  author: string;
  location: string;
  image?: string;
  order: number;
  isActive: boolean;
}

const emptyForm = {
  quoteEn: '', quoteDe: '',
  author: '', location: '',
  image: '', order: 0, isActive: true,
};

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

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/sys-ops/testimonials');
    const data = await res.json();
    setTestimonials(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchTestimonials(); }, [fetchTestimonials]);

  const openNew = () => {
    setEditId(null);
    setForm({ ...emptyForm, order: testimonials.length });
    setShowForm(true);
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEdit = (t: Testimonial) => {
    setEditId(t.id);
    setForm({
      quoteEn: t.quoteEn, quoteDe: t.quoteDe || '',
      author: t.author, location: t.location,
      image: t.image || '', order: t.order, isActive: t.isActive,
    });
    setShowForm(true);
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError('');
    const url = editId ? `/api/sys-ops/testimonials/${editId}` : '/api/sys-ops/testimonials';
    const method = editId ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method, headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) { setShowForm(false); fetchTestimonials(); }
    else { const d = await res.json(); setError(d.error || 'Save failed'); }
    setSaving(false);
  };

  const handleDelete = async (id: string, author: string) => {
    if (!confirm(`Delete testimonial from "${author}"?`)) return;
    await fetch(`/api/sys-ops/testimonials/${id}`, { method: 'DELETE' });
    fetchTestimonials();
  };

  const toggleActive = async (t: Testimonial) => {
    await fetch(`/api/sys-ops/testimonials/${t.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...t, isActive: !t.isActive }),
    });
    fetchTestimonials();
  };

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <AdminShell breadcrumbs={[{ label: 'Testimonials' }]}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#E2E8F0', letterSpacing: '-0.03em', margin: 0 }}>
            Testimonials
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            Client testimonials shown in the homepage carousel
          </p>
        </div>
        <button onClick={openNew}
          style={{ padding: '0.65rem 1.25rem', backgroundColor: '#C9A96E', color: '#0B1120', border: 'none', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
          + Add Testimonial
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ backgroundColor: '#131D33', border: '1px solid rgba(201,169,110,0.2)', borderRadius: '10px', padding: '1.75rem', marginBottom: '2rem' }}>
          <h3 style={{ color: '#E2E8F0', fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem' }}>
            {editId ? 'Edit Testimonial' : 'New Testimonial'}
          </h3>
          {error && (
            <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px', padding: '0.6rem 1rem', color: '#FCA5A5', fontSize: '0.83rem', marginBottom: '1rem' }}>
              {error}
            </div>
          )}
          <form onSubmit={handleSave}>
            {/* Background image */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>BACKGROUND IMAGE (shown behind the testimonial card)</label>
              <ImageUpload value={form.image} onChange={(url) => set('image', url)} folder="testimonials" />
            </div>

            {/* Author & Location */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={labelStyle}>CLIENT NAME *</label>
                <input style={inputStyle} value={form.author} required
                  onChange={(e) => set('author', e.target.value)}
                  placeholder="Thomas Müller" />
              </div>
              <div>
                <label style={labelStyle}>PROPERTY / LOCATION *</label>
                <input style={inputStyle} value={form.location} required
                  onChange={(e) => set('location', e.target.value)}
                  placeholder="Luxury Villa, Frankfurt" />
              </div>
              <div style={{ minWidth: '100px' }}>
                <label style={labelStyle}>SORT ORDER</label>
                <input style={inputStyle} type="number" value={form.order} min={0}
                  onChange={(e) => set('order', parseInt(e.target.value))} />
              </div>
            </div>

            {/* Quotes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={labelStyle}>TESTIMONIAL (English) *</label>
                <textarea style={{ ...inputStyle, resize: 'vertical' }} value={form.quoteEn} rows={5} required
                  onChange={(e) => set('quoteEn', e.target.value)}
                  placeholder="Bossert Immobilien exceeded our every expectation..." />
              </div>
              <div>
                <label style={labelStyle}>TESTIMONIAL (German)</label>
                <textarea style={{ ...inputStyle, resize: 'vertical' }} value={form.quoteDe} rows={5}
                  onChange={(e) => set('quoteDe', e.target.value)}
                  placeholder="Bossert Immobilien hat all unsere Erwartungen übertroffen..." />
              </div>
            </div>

            {/* Active */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input type="checkbox" id="tActive" checked={form.isActive}
                onChange={(e) => set('isActive', e.target.checked)}
                style={{ width: '15px', height: '15px', cursor: 'pointer' }} />
              <label htmlFor="tActive" style={{ ...labelStyle, margin: 0, cursor: 'pointer' }}>SHOW IN CAROUSEL</label>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowForm(false)}
                style={{ padding: '0.6rem 1.1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '7px', color: '#94A3B8', cursor: 'pointer', fontSize: '0.83rem' }}>
                Cancel
              </button>
              <button type="submit" disabled={saving}
                style={{ padding: '0.6rem 1.25rem', backgroundColor: saving ? '#1A2744' : '#C9A96E', color: saving ? '#64748B' : '#0B1120', border: 'none', borderRadius: '7px', fontSize: '0.83rem', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer' }}>
                {saving ? 'Saving...' : editId ? 'Update' : 'Add Testimonial'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div style={{ backgroundColor: '#131D33', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: '#475569' }}>Loading...</div>
        ) : testimonials.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: '#475569' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⭐</div>
            <p>No testimonials yet.</p>
            <p style={{ fontSize: '0.82rem', color: '#334155', marginTop: '0.5rem' }}>
              Until you add testimonials here, the site shows locale defaults.
            </p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['#', 'Client', 'Property', 'Quote', 'Status', 'Actions'].map((h) => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', color: '#475569', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t, i) => (
                <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                  {/* Order */}
                  <td style={{ padding: '1rem', color: '#475569', fontSize: '0.82rem', width: '40px' }}>
                    {t.image ? (
                      <img src={t.image} alt="" style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '4px' }} />
                    ) : (
                      <span style={{ color: '#334155' }}>#{i + 1}</span>
                    )}
                  </td>
                  {/* Author */}
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(201,169,110,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9A96E', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
                        {t.author.substring(0, 2)}
                      </div>
                      <span style={{ fontWeight: 500, color: '#E2E8F0', fontSize: '0.87rem' }}>{t.author}</span>
                    </div>
                  </td>
                  {/* Location */}
                  <td style={{ padding: '1rem', color: '#94A3B8', fontSize: '0.82rem' }}>{t.location}</td>
                  {/* Quote preview */}
                  <td style={{ padding: '1rem', color: '#64748B', fontSize: '0.78rem', maxWidth: '300px' }}>
                    <span style={{ fontStyle: 'italic' }}>
                      &ldquo;{t.quoteEn.length > 80 ? t.quoteEn.slice(0, 80) + '...' : t.quoteEn}&rdquo;
                    </span>
                  </td>
                  {/* Status */}
                  <td style={{ padding: '1rem' }}>
                    <button onClick={() => toggleActive(t)} style={{
                      padding: '0.2rem 0.6rem', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 600,
                      backgroundColor: t.isActive ? 'rgba(52,211,153,0.15)' : 'rgba(100,116,139,0.15)',
                      color: t.isActive ? '#34D399' : '#94A3B8',
                    }}>
                      {t.isActive ? 'ACTIVE' : 'HIDDEN'}
                    </button>
                  </td>
                  {/* Actions */}
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => openEdit(t)}
                        style={{ padding: '0.35rem 0.7rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '5px', color: '#94A3B8', cursor: 'pointer', fontSize: '0.78rem' }}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(t.id, t.author)}
                        style={{ padding: '0.35rem 0.7rem', backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '5px', color: '#FCA5A5', cursor: 'pointer', fontSize: '0.78rem' }}>
                        Delete
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

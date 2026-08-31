'use client';

import React, { useState, useEffect, useCallback } from 'react';
import AdminShell from '@/components/sys-ops/AdminShell';
import ImageUpload from '@/components/sys-ops/ImageUpload';

interface TeamMember {
  id: string;
  name: string;
  titleEn: string;
  titleDe?: string;
  quoteEn?: string;
  quoteDe?: string;
  image?: string;
  order: number;
  isActive: boolean;
}

const emptyForm = {
  name: '', titleEn: '', titleDe: '',
  quoteEn: '', quoteDe: '',
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

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/sys-ops/team');
    const data = await res.json();
    setMembers(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const openNew = () => {
    setEditId(null);
    setForm({ ...emptyForm, order: members.length });
    setShowForm(true);
    setError('');
  };

  const openEdit = (m: TeamMember) => {
    setEditId(m.id);
    setForm({
      name: m.name, titleEn: m.titleEn, titleDe: m.titleDe || '',
      quoteEn: m.quoteEn || '', quoteDe: m.quoteDe || '',
      image: m.image || '', order: m.order, isActive: m.isActive,
    });
    setShowForm(true);
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError('');
    const url = editId ? `/api/sys-ops/team/${editId}` : '/api/sys-ops/team';
    const method = editId ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method, headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) { setShowForm(false); fetchMembers(); }
    else { const d = await res.json(); setError(d.error || 'Save failed'); }
    setSaving(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}" from the team?`)) return;
    await fetch(`/api/sys-ops/team/${id}`, { method: 'DELETE' });
    fetchMembers();
  };

  const toggleActive = async (m: TeamMember) => {
    await fetch(`/api/sys-ops/team/${m.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...m, isActive: !m.isActive }),
    });
    fetchMembers();
  };

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <AdminShell breadcrumbs={[{ label: 'Team Members' }]}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#E2E8F0', letterSpacing: '-0.03em', margin: 0 }}>
            Team Members
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            Manage the team displayed on the About page
          </p>
        </div>
        <button onClick={openNew}
          style={{ padding: '0.65rem 1.25rem', backgroundColor: '#C9A96E', color: '#0B1120', border: 'none', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
          + Add Member
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ backgroundColor: '#131D33', border: '1px solid rgba(201,169,110,0.2)', borderRadius: '10px', padding: '1.75rem', marginBottom: '2rem' }}>
          <h3 style={{ color: '#E2E8F0', fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem' }}>
            {editId ? 'Edit Member' : 'New Team Member'}
          </h3>
          {error && (
            <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px', padding: '0.6rem 1rem', color: '#FCA5A5', fontSize: '0.83rem', marginBottom: '1rem' }}>
              {error}
            </div>
          )}
          <form onSubmit={handleSave}>
            {/* Photo */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>PORTRAIT PHOTO</label>
              <ImageUpload value={form.image} onChange={(url) => set('image', url)} folder="team" />
            </div>

            {/* Name + Order */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={labelStyle}>FULL NAME *</label>
                <input style={inputStyle} value={form.name} required
                  onChange={(e) => set('name', e.target.value)}
                  placeholder="Alexandra Schmidt" />
              </div>
              <div style={{ minWidth: '100px' }}>
                <label style={labelStyle}>SORT ORDER</label>
                <input style={inputStyle} type="number" value={form.order} min={0}
                  onChange={(e) => set('order', parseInt(e.target.value))} />
              </div>
            </div>

            {/* Titles */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={labelStyle}>JOB TITLE (English) *</label>
                <input style={inputStyle} value={form.titleEn} required
                  onChange={(e) => set('titleEn', e.target.value)}
                  placeholder="Managing Director" />
              </div>
              <div>
                <label style={labelStyle}>JOB TITLE (German)</label>
                <input style={inputStyle} value={form.titleDe}
                  onChange={(e) => set('titleDe', e.target.value)}
                  placeholder="Geschäftsführerin" />
              </div>
            </div>

            {/* Quotes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={labelStyle}>QUOTE / BIO (English)</label>
                <textarea style={{ ...inputStyle, resize: 'vertical' }} value={form.quoteEn} rows={4}
                  onChange={(e) => set('quoteEn', e.target.value)}
                  placeholder="Personal quote or short biography..." />
              </div>
              <div>
                <label style={labelStyle}>QUOTE / BIO (German)</label>
                <textarea style={{ ...inputStyle, resize: 'vertical' }} value={form.quoteDe} rows={4}
                  onChange={(e) => set('quoteDe', e.target.value)}
                  placeholder="Persönliches Zitat oder Kurzbiografie..." />
              </div>
            </div>

            {/* Active toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input type="checkbox" id="memberActive" checked={form.isActive}
                onChange={(e) => set('isActive', e.target.checked)}
                style={{ width: '15px', height: '15px', cursor: 'pointer' }} />
              <label htmlFor="memberActive" style={{ ...labelStyle, margin: 0, cursor: 'pointer' }}>VISIBLE ON SITE</label>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowForm(false)}
                style={{ padding: '0.6rem 1.1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '7px', color: '#94A3B8', cursor: 'pointer', fontSize: '0.83rem' }}>
                Cancel
              </button>
              <button type="submit" disabled={saving}
                style={{ padding: '0.6rem 1.25rem', backgroundColor: saving ? '#1A2744' : '#C9A96E', color: saving ? '#64748B' : '#0B1120', border: 'none', borderRadius: '7px', fontSize: '0.83rem', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer' }}>
                {saving ? 'Saving...' : editId ? 'Update Member' : 'Add Member'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Members Grid */}
      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: '#475569' }}>Loading...</div>
      ) : members.length === 0 ? (
        <div style={{ backgroundColor: '#131D33', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '4rem', textAlign: 'center', color: '#475569' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>👥</div>
          <p>No team members yet.</p>
          <p style={{ fontSize: '0.82rem', color: '#334155', marginTop: '0.5rem' }}>
            Until you add members here, the About page shows the default locale content.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {members.map((m) => (
            <div key={m.id} style={{
              backgroundColor: '#131D33', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '10px', overflow: 'hidden',
              opacity: m.isActive ? 1 : 0.5,
              transition: 'opacity 0.2s',
            }}>
              {/* Portrait */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', backgroundColor: '#0B1120' }}>
                {m.image ? (
                  <img src={m.image} alt={m.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: '#1E293B' }}>
                    👤
                  </div>
                )}
                {/* Order badge */}
                <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.72rem', color: '#94A3B8', fontWeight: 600 }}>
                  #{m.order + 1}
                </div>
                {/* Active badge */}
                {!m.isActive && (
                  <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', backgroundColor: 'rgba(239,68,68,0.9)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.68rem', color: 'white', fontWeight: 700 }}>
                    HIDDEN
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: '1.25rem' }}>
                <div style={{ fontWeight: 700, color: '#E2E8F0', fontSize: '1rem', marginBottom: '0.15rem' }}>{m.name}</div>
                <div style={{ color: '#C9A96E', fontSize: '0.82rem', fontStyle: 'italic', marginBottom: '0.75rem' }}>{m.titleEn}</div>
                {m.quoteEn && (
                  <p style={{ color: '#64748B', fontSize: '0.78rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                    {m.quoteEn.length > 100 ? m.quoteEn.slice(0, 100) + '...' : m.quoteEn}
                  </p>
                )}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => openEdit(m)}
                    style={{ flex: 1, padding: '0.4rem 0', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#94A3B8', cursor: 'pointer', fontSize: '0.78rem' }}>
                    Edit
                  </button>
                  <button onClick={() => toggleActive(m)}
                    style={{ flex: 1, padding: '0.4rem 0', backgroundColor: m.isActive ? 'rgba(52,211,153,0.08)' : 'rgba(201,169,110,0.08)', border: `1px solid ${m.isActive ? 'rgba(52,211,153,0.2)' : 'rgba(201,169,110,0.2)'}`, borderRadius: '6px', color: m.isActive ? '#34D399' : '#C9A96E', cursor: 'pointer', fontSize: '0.78rem' }}>
                    {m.isActive ? 'Hide' : 'Show'}
                  </button>
                  <button onClick={() => handleDelete(m.id, m.name)}
                    style={{ padding: '0.4rem 0.7rem', backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', color: '#FCA5A5', cursor: 'pointer', fontSize: '0.78rem' }}>
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}

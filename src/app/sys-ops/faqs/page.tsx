'use client';

import React, { useState, useEffect } from 'react';
import AdminShell from '@/components/sys-ops/AdminShell';

interface FAQ {
  id: string;
  questionEn: string;
  answerEn: string;
  questionDe?: string;
  answerDe?: string;
  category?: string;
  isActive: boolean;
  order: number;
}

const emptyForm = {
  questionEn: '', answerEn: '',
  questionDe: '', answerDe: '',
  category: '', isActive: true,
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

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchFaqs = async () => {
    setLoading(true);
    const res = await fetch('/api/sys-ops/faqs');
    const data = await res.json();
    setFaqs(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchFaqs(); }, []);

  const openNew = () => { setEditId(null); setForm(emptyForm); setShowForm(true); setError(''); };
  const openEdit = (faq: FAQ) => {
    setEditId(faq.id);
    setForm({
      questionEn: faq.questionEn,
      answerEn: faq.answerEn,
      questionDe: faq.questionDe || '',
      answerDe: faq.answerDe || '',
      category: faq.category || '',
      isActive: faq.isActive,
    });
    setShowForm(true);
    setError('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const url = editId ? `/api/sys-ops/faqs/${editId}` : '/api/sys-ops/faqs';
    const method = editId ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setShowForm(false);
      fetchFaqs();
    } else {
      const d = await res.json();
      setError(d.error || 'Save failed');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return;
    await fetch(`/api/sys-ops/faqs/${id}`, { method: 'DELETE' });
    fetchFaqs();
  };

  const toggleActive = async (faq: FAQ) => {
    await fetch(`/api/sys-ops/faqs/${faq.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...faq, isActive: !faq.isActive }),
    });
    fetchFaqs();
  };

  return (
    <AdminShell breadcrumbs={[{ label: 'FAQs' }]}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#E2E8F0', letterSpacing: '-0.03em', margin: 0 }}>
            FAQs
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            Manage frequently asked questions shown on the contact page
          </p>
        </div>
        <button
          onClick={openNew}
          style={{ padding: '0.65rem 1.25rem', backgroundColor: '#C9A96E', color: '#0B1120', border: 'none', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
        >
          + Add FAQ
        </button>
      </div>

      {/* Create/Edit Form */}
      {showForm && (
        <div style={{ backgroundColor: '#131D33', border: '1px solid rgba(201,169,110,0.2)', borderRadius: '10px', padding: '1.75rem', marginBottom: '2rem' }}>
          <h3 style={{ color: '#E2E8F0', fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem' }}>
            {editId ? 'Edit FAQ' : 'New FAQ'}
          </h3>
          {error && (
            <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px', padding: '0.6rem 1rem', color: '#FCA5A5', fontSize: '0.83rem', marginBottom: '1rem' }}>
              {error}
            </div>
          )}
          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={labelStyle}>QUESTION (English) *</label>
                <input style={inputStyle} value={form.questionEn} required
                  onChange={(e) => setForm({ ...form, questionEn: e.target.value })}
                  placeholder="How does the process work?" />
              </div>
              <div>
                <label style={labelStyle}>QUESTION (German)</label>
                <input style={inputStyle} value={form.questionDe}
                  onChange={(e) => setForm({ ...form, questionDe: e.target.value })}
                  placeholder="Wie funktioniert der Prozess?" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={labelStyle}>ANSWER (English) *</label>
                <textarea style={{ ...inputStyle, resize: 'vertical' }} value={form.answerEn} rows={4} required
                  onChange={(e) => setForm({ ...form, answerEn: e.target.value })}
                  placeholder="Detailed answer in English..." />
              </div>
              <div>
                <label style={labelStyle}>ANSWER (German)</label>
                <textarea style={{ ...inputStyle, resize: 'vertical' }} value={form.answerDe} rows={4}
                  onChange={(e) => setForm({ ...form, answerDe: e.target.value })}
                  placeholder="Detaillierte Antwort auf Deutsch..." />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'flex-end', marginBottom: '1.25rem' }}>
              <div>
                <label style={labelStyle}>CATEGORY (optional)</label>
                <input style={inputStyle} value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. Buying, Selling, General" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingBottom: '0.1rem' }}>
                <input type="checkbox" id="isActive" checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  style={{ width: '15px', height: '15px', cursor: 'pointer' }} />
                <label htmlFor="isActive" style={{ ...labelStyle, margin: 0, cursor: 'pointer' }}>ACTIVE</label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowForm(false)}
                style={{ padding: '0.6rem 1.1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '7px', color: '#94A3B8', cursor: 'pointer', fontSize: '0.83rem' }}>
                Cancel
              </button>
              <button type="submit" disabled={saving}
                style={{ padding: '0.6rem 1.25rem', backgroundColor: saving ? '#1A2744' : '#C9A96E', color: saving ? '#64748B' : '#0B1120', border: 'none', borderRadius: '7px', fontSize: '0.83rem', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer' }}>
                {saving ? 'Saving...' : editId ? 'Update FAQ' : 'Create FAQ'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FAQ List */}
      <div style={{ backgroundColor: '#131D33', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: '#475569' }}>Loading...</div>
        ) : faqs.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: '#475569' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>❓</div>
            <p>No FAQs yet. Click <strong style={{ color: '#C9A96E' }}>+ Add FAQ</strong> to create one.</p>
            <p style={{ fontSize: '0.82rem', marginTop: '0.5rem', color: '#334155' }}>
              Until you add FAQs here, the contact page shows the default locale questions.
            </p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['#', 'Question', 'Category', 'Status', 'Actions'].map((h) => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', color: '#475569', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq, i) => (
                <tr key={faq.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '1rem', color: '#475569', fontSize: '0.82rem', width: '40px' }}>{i + 1}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 500, color: '#E2E8F0', fontSize: '0.87rem', marginBottom: '0.2rem' }}>{faq.questionEn}</div>
                    <div style={{ color: '#475569', fontSize: '0.78rem', lineHeight: 1.5 }}>
                      {faq.answerEn.length > 100 ? faq.answerEn.slice(0, 100) + '...' : faq.answerEn}
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {faq.category ? (
                      <span style={{ padding: '0.2rem 0.5rem', backgroundColor: 'rgba(201,169,110,0.1)', color: '#C9A96E', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 600 }}>
                        {faq.category}
                      </span>
                    ) : <span style={{ color: '#334155', fontSize: '0.78rem' }}>—</span>}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button onClick={() => toggleActive(faq)} style={{
                      padding: '0.2rem 0.6rem', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 600,
                      backgroundColor: faq.isActive ? 'rgba(16,185,129,0.15)' : 'rgba(100,116,139,0.15)',
                      color: faq.isActive ? '#34D399' : '#94A3B8',
                    }}>
                      {faq.isActive ? 'ACTIVE' : 'HIDDEN'}
                    </button>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => openEdit(faq)}
                        style={{ padding: '0.35rem 0.7rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '5px', color: '#94A3B8', cursor: 'pointer', fontSize: '0.78rem' }}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(faq.id)}
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

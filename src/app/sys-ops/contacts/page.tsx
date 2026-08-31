'use client';

import React, { useState, useEffect, useCallback } from 'react';
import AdminShell from '@/components/sys-ops/AdminShell';

type Tab = 'contacts' | 'subscribers';

const STATUS_COLORS: Record<string, string> = {
  NEW: '#FCD34D',
  IN_PROGRESS: '#60A5FA',
  RESOLVED: '#34D399',
  CLOSED: '#94A3B8',
};

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message?: string;
  heardAbout?: string;
  status: string;
  createdAt: string;
}

interface Subscriber {
  id: string;
  name?: string;
  email: string;
  subscribedAt: string;
}

export default function ContactsPage() {
  const [tab, setTab] = useState<Tab>('contacts');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [totalContacts, setTotalContacts] = useState(0);
  const [totalSubs, setTotalSubs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/sys-ops/contacts?limit=50');
    const data = await res.json();
    setContacts(data.submissions || []);
    setTotalContacts(data.total || 0);
    setLoading(false);
  }, []);

  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/sys-ops/subscribers?limit=100');
    const data = await res.json();
    setSubscribers(data.subscribers || []);
    setTotalSubs(data.total || 0);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (tab === 'contacts') fetchContacts();
    else fetchSubscribers();
  }, [tab, fetchContacts, fetchSubscribers]);

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/sys-ops/contacts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  const th: React.CSSProperties = {
    padding: '0.75rem 1rem',
    textAlign: 'left',
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    color: '#475569',
    textTransform: 'uppercase',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  };

  const td: React.CSSProperties = {
    padding: '1rem',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    fontSize: '0.87rem',
    color: '#CBD5E1',
    verticalAlign: 'top',
  };

  return (
    <AdminShell breadcrumbs={[{ label: 'Contacts & Leads' }]}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#E2E8F0', letterSpacing: '-0.03em', margin: 0 }}>
            Contacts &amp; Leads
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            Manage form submissions and newsletter subscribers
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '1.5rem' }}>
        {[
          { id: 'contacts' as Tab, label: `Contact Submissions (${totalContacts})` },
          { id: 'subscribers' as Tab, label: `Newsletter Subscribers (${totalSubs})` },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '0.65rem 1.1rem',
              background: 'none',
              border: 'none',
              borderBottom: tab === t.id ? '2px solid #C9A96E' : '2px solid transparent',
              color: tab === t.id ? '#C9A96E' : '#64748B',
              fontSize: '0.83rem',
              fontWeight: tab === t.id ? 600 : 400,
              cursor: 'pointer',
              marginBottom: '-1px',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ backgroundColor: '#131D33', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: '#475569' }}>Loading...</div>
        ) : tab === 'contacts' ? (
          contacts.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: '#475569' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📬</div>
              <p>No contact submissions yet.</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={th}>Name</th>
                  <th style={th}>Subject</th>
                  <th style={th}>Status</th>
                  <th style={th}>Date</th>
                  <th style={th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <React.Fragment key={c.id}>
                    <tr
                      style={{ cursor: 'pointer' }}
                      onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
                    >
                      <td style={td}>
                        <div style={{ fontWeight: 500, color: '#E2E8F0' }}>{c.name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{c.email}</div>
                        {c.phone && <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{c.phone}</div>}
                      </td>
                      <td style={td}>{c.subject}</td>
                      <td style={td}>
                        <span style={{
                          padding: '0.25rem 0.6rem',
                          borderRadius: '4px',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          letterSpacing: '0.05em',
                          backgroundColor: `${STATUS_COLORS[c.status] || '#94A3B8'}20`,
                          color: STATUS_COLORS[c.status] || '#94A3B8',
                        }}>
                          {c.status}
                        </span>
                      </td>
                      <td style={td}>
                        {new Date(c.createdAt).toLocaleDateString('en-DE', {
                          day: '2-digit', month: 'short', year: 'numeric',
                        })}
                      </td>
                      <td style={td}>
                        <select
                          value={c.status}
                          onChange={(e) => { e.stopPropagation(); updateStatus(c.id, e.target.value); }}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            padding: '0.35rem 0.6rem',
                            backgroundColor: '#0B1120',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '4px',
                            color: '#94A3B8',
                            fontSize: '0.78rem',
                            cursor: 'pointer',
                          }}
                        >
                          <option value="NEW">NEW</option>
                          <option value="IN_PROGRESS">IN PROGRESS</option>
                          <option value="RESOLVED">RESOLVED</option>
                          <option value="CLOSED">CLOSED</option>
                        </select>
                      </td>
                    </tr>
                    {/* Expanded message row */}
                    {expandedId === c.id && (
                      <tr>
                        <td colSpan={5} style={{ ...td, backgroundColor: 'rgba(201,169,110,0.04)', borderTop: 'none' }}>
                          <div style={{ padding: '0.5rem 0.5rem 0.75rem 1.5rem', borderLeft: '2px solid #C9A96E', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {c.heardAbout && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', color: '#475569', textTransform: 'uppercase' }}>Source:</span>
                                <span style={{ padding: '0.15rem 0.5rem', backgroundColor: 'rgba(201,169,110,0.12)', color: '#C9A96E', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                                  {c.heardAbout}
                                </span>
                              </div>
                            )}
                            {c.message && (
                              <p style={{ margin: 0, color: '#94A3B8', lineHeight: 1.7, fontSize: '0.87rem' }}>{c.message}</p>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )
        ) : (
          subscribers.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: '#475569' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📧</div>
              <p>No subscribers yet.</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={th}>Name</th>
                  <th style={th}>Email</th>
                  <th style={th}>Subscribed</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((s) => (
                  <tr key={s.id}>
                    <td style={td}>{s.name || <span style={{ color: '#475569' }}>—</span>}</td>
                    <td style={td}>{s.email}</td>
                    <td style={td}>
                      {new Date(s.subscribedAt).toLocaleDateString('en-DE', {
                        day: '2-digit', month: 'short', year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
    </AdminShell>
  );
}

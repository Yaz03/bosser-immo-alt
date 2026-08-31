'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminShell from '@/components/sys-ops/AdminShell';
import ImageUpload from '@/components/sys-ops/ImageUpload';

type Tab = 'basic' | 'media' | 'details' | 'location';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  backgroundColor: '#0B1120',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '8px',
  color: '#E2E8F0',
  fontSize: '0.9rem',
  outline: 'none',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.72rem',
  fontWeight: 600,
  letterSpacing: '0.1em',
  color: '#94A3B8',
  marginBottom: '0.4rem',
};

const fieldStyle: React.CSSProperties = { marginBottom: '1.25rem' };

interface FormData {
  type: string;
  priceDisplay: string;
  priceValue: string;
  location: string;
  specs: string;
  beds: string;
  baths: string;
  areaSqm: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  featured: boolean;
  descriptionEn: string;
  videoUrl: string;
  virtualTourUrl: string;
  heroImage: string;
  galleryImages: string[];
  floorPlanImages: string[];
  amenities: string;
  lat: string;
  lng: string;
  propertyTax: string;
  hoaFees: string;
  // Schools
  schools: { name: string; distance: string }[];
  // Transport
  transport: { name: string; type: string; distance: string }[];
  // Documents
  documents: { title: string; url: string }[];
}

const defaultForm: FormData = {
  type: '', priceDisplay: '', priceValue: '', location: '', specs: '',
  beds: '', baths: '', areaSqm: '', status: 'DRAFT', featured: false,
  descriptionEn: '', videoUrl: '', virtualTourUrl: '',
  heroImage: '', galleryImages: [], floorPlanImages: [],
  amenities: '', lat: '', lng: '', propertyTax: '', hoaFees: '',
  schools: [], transport: [], documents: [],
};

interface Props {
  initialData?: Partial<FormData> & { id?: string };
  mode: 'create' | 'edit';
}

export default function PropertyForm({ initialData, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({ ...defaultForm, ...initialData });
  const [activeTab, setActiveTab] = useState<Tab>('basic');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const set = (key: keyof FormData, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    const payload = {
      type: form.type,
      priceDisplay: form.priceDisplay,
      priceValue: form.priceValue ? parseFloat(form.priceValue) : null,
      location: form.location,
      specs: form.specs || `${form.beds ? form.beds + ' Beds • ' : ''}${form.baths ? form.baths + ' Baths • ' : ''}${form.areaSqm ? form.areaSqm + ' m²' : ''}`.trim().replace(/•\s*$/, ''),
      beds: form.beds ? parseInt(form.beds) : null,
      baths: form.baths ? parseInt(form.baths) : null,
      areaSqm: form.areaSqm ? parseFloat(form.areaSqm) : null,
      status: form.status,
      featured: form.featured,
      heroImage: form.heroImage || form.galleryImages[0] || null,
      videoUrl: form.videoUrl || null,
      virtualTourUrl: form.virtualTourUrl || null,
      descriptionEn: form.descriptionEn || null,
      lat: form.lat ? parseFloat(form.lat) : null,
      lng: form.lng ? parseFloat(form.lng) : null,
      propertyTax: form.propertyTax ? parseFloat(form.propertyTax) : null,
      hoaFees: form.hoaFees ? parseFloat(form.hoaFees) : null,
    };

    const url = mode === 'create' ? '/api/sys-ops/properties' : `/api/sys-ops/properties/${initialData?.id}`;
    const method = mode === 'create' ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Save failed');
        setSaving(false);
        return;
      }

      // After create/edit, save images and amenities via additional API calls
      const propertyId = data.id;

      // Save gallery images
      if (form.galleryImages.length > 0) {
        await fetch(`/api/sys-ops/properties/${propertyId}/images`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ images: form.galleryImages }),
        });
      }

      // Save amenities
      if (form.amenities.trim()) {
        const amenityList = form.amenities.split('\n').map(a => a.trim()).filter(Boolean);
        await fetch(`/api/sys-ops/properties/${propertyId}/amenities`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amenities: amenityList }),
        });
      }

      setSuccess(mode === 'create' ? 'Property created!' : 'Property updated!');
      setTimeout(() => router.push(`/sys-ops/properties/${propertyId}/edit`), 800);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'basic', label: '1. Basic Info' },
    { id: 'media', label: '2. Images & Media' },
    { id: 'details', label: '3. Details' },
    { id: 'location', label: '4. Location & Finance' },
  ];

  return (
    <AdminShell breadcrumbs={[
      { label: 'Properties', href: '/sys-ops/properties' },
      { label: mode === 'create' ? 'New Property' : 'Edit Property' },
    ]}>
      <div style={{ maxWidth: '900px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#E2E8F0', letterSpacing: '-0.03em', margin: 0 }}>
              {mode === 'create' ? 'Add New Property' : 'Edit Property'}
            </h1>
            <p style={{ color: '#64748B', fontSize: '0.85rem', marginTop: '0.2rem' }}>
              {mode === 'create' ? 'Fill in all details and publish when ready.' : 'Update property details below.'}
            </p>
          </div>
          {/* Status badge */}
          <select
            value={form.status}
            onChange={(e) => set('status', e.target.value)}
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.1)',
              backgroundColor: form.status === 'PUBLISHED' ? 'rgba(16,185,129,0.15)' : form.status === 'DRAFT' ? 'rgba(245,158,11,0.15)' : 'rgba(100,116,139,0.15)',
              color: form.status === 'PUBLISHED' ? '#34D399' : form.status === 'DRAFT' ? '#FCD34D' : '#94A3B8',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <option value="DRAFT">DRAFT</option>
            <option value="PUBLISHED">PUBLISHED</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
        </div>

        {/* Tab nav */}
        <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.65rem 1.1rem',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid #C9A96E' : '2px solid transparent',
                color: activeTab === tab.id ? '#C9A96E' : '#64748B',
                fontSize: '0.83rem',
                fontWeight: activeTab === tab.id ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                marginBottom: '-1px',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {error && (
          <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px', padding: '0.75rem 1rem', color: '#FCA5A5', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '6px', padding: '0.75rem 1rem', color: '#34D399', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            ✓ {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ backgroundColor: '#131D33', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '1.75rem' }}>

            {/* ── Tab 1: Basic Info ── */}
            {activeTab === 'basic' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>PROPERTY TYPE *</label>
                    <input style={inputStyle} value={form.type} onChange={(e) => set('type', e.target.value)}
                      placeholder="e.g. Luxury Villa, Penthouse, Historic Estate" required />
                  </div>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>LOCATION *</label>
                    <input style={inputStyle} value={form.location} onChange={(e) => set('location', e.target.value)}
                      placeholder="e.g. Frankfurt, DE" required />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>PRICE DISPLAY *</label>
                    <input style={inputStyle} value={form.priceDisplay} onChange={(e) => set('priceDisplay', e.target.value)}
                      placeholder="e.g. € 4,250,000" required />
                  </div>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>PRICE VALUE (numeric, for sorting)</label>
                    <input style={inputStyle} type="number" value={form.priceValue} onChange={(e) => set('priceValue', e.target.value)}
                      placeholder="e.g. 4250000" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>BEDROOMS</label>
                    <input style={inputStyle} type="number" value={form.beds} onChange={(e) => set('beds', e.target.value)} placeholder="5" />
                  </div>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>BATHROOMS</label>
                    <input style={inputStyle} type="number" value={form.baths} onChange={(e) => set('baths', e.target.value)} placeholder="6" />
                  </div>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>AREA (m²)</label>
                    <input style={inputStyle} type="number" value={form.areaSqm} onChange={(e) => set('areaSqm', e.target.value)} placeholder="650" />
                  </div>
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>SPECS STRING (auto-generated if empty)</label>
                  <input style={inputStyle} value={form.specs} onChange={(e) => set('specs', e.target.value)}
                    placeholder="e.g. 5 Beds • 6 Baths • 650 m²  (leave blank to auto-fill)" />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>DESCRIPTION (English)</label>
                  <textarea
                    value={form.descriptionEn}
                    onChange={(e) => set('descriptionEn', e.target.value)}
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    placeholder="Detailed property description..."
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input
                    type="checkbox"
                    id="featured"
                    checked={form.featured}
                    onChange={(e) => set('featured', e.target.checked)}
                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <label htmlFor="featured" style={{ ...labelStyle, margin: 0, cursor: 'pointer' }}>
                    MARK AS FEATURED (appears on homepage)
                  </label>
                </div>
              </div>
            )}

            {/* ── Tab 2: Media ── */}
            {activeTab === 'media' && (
              <div>
                <ImageUpload
                  label="Hero / Cover Image"
                  folder="properties"
                  currentUrls={form.heroImage ? [form.heroImage] : []}
                  onUpload={(urls) => set('heroImage', urls[0] || '')}
                  multiple={false}
                />

                <ImageUpload
                  label="Gallery Images"
                  folder="properties"
                  currentUrls={form.galleryImages}
                  onUpload={(urls) => set('galleryImages', urls)}
                  multiple={true}
                />

                <ImageUpload
                  label="Floor Plans"
                  folder="floorplans"
                  currentUrls={form.floorPlanImages}
                  onUpload={(urls) => set('floorPlanImages', urls)}
                  multiple={true}
                />

                <div style={fieldStyle}>
                  <label style={labelStyle}>YOUTUBE / VIDEO URL</label>
                  <input style={inputStyle} value={form.videoUrl} onChange={(e) => set('videoUrl', e.target.value)}
                    placeholder="https://www.youtube.com/embed/..." />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>VIRTUAL TOUR URL (Matterport, etc.)</label>
                  <input style={inputStyle} value={form.virtualTourUrl} onChange={(e) => set('virtualTourUrl', e.target.value)}
                    placeholder="https://my.matterport.com/show/?m=..." />
                </div>
              </div>
            )}

            {/* ── Tab 3: Details ── */}
            {activeTab === 'details' && (
              <div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>AMENITIES (one per line)</label>
                  <textarea
                    value={form.amenities}
                    onChange={(e) => set('amenities', e.target.value)}
                    rows={8}
                    style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace' }}
                    placeholder={`Infinity Pool\nHome Theater\nWine Cellar\nSmart Home System\nChef's Kitchen\nSpa & Sauna`}
                  />
                </div>
              </div>
            )}

            {/* ── Tab 4: Location & Finance ── */}
            {activeTab === 'location' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>LATITUDE</label>
                    <input style={inputStyle} type="number" step="any" value={form.lat} onChange={(e) => set('lat', e.target.value)} placeholder="50.1109" />
                  </div>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>LONGITUDE</label>
                    <input style={inputStyle} type="number" step="any" value={form.lng} onChange={(e) => set('lng', e.target.value)} placeholder="8.6821" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>PROPERTY TAX (€/year)</label>
                    <input style={inputStyle} type="number" value={form.propertyTax} onChange={(e) => set('propertyTax', e.target.value)} placeholder="12000" />
                  </div>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>HOA / SERVICE FEES (€/month)</label>
                    <input style={inputStyle} type="number" value={form.hoaFees} onChange={(e) => set('hoaFees', e.target.value)} placeholder="800" />
                  </div>
                </div>

                {/* Nearby Schools */}
                <div style={fieldStyle}>
                  <label style={labelStyle}>NEARBY SCHOOLS</label>
                  {form.schools.map((s, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input style={inputStyle} value={s.name} onChange={(e) => {
                        const updated = [...form.schools]; updated[i] = { ...updated[i], name: e.target.value }; set('schools', updated);
                      }} placeholder="School name" />
                      <input style={{ ...inputStyle, width: '100px' }} value={s.distance} onChange={(e) => {
                        const updated = [...form.schools]; updated[i] = { ...updated[i], distance: e.target.value }; set('schools', updated);
                      }} placeholder="0.5 km" />
                      <button type="button" onClick={() => set('schools', form.schools.filter((_, j) => j !== i))}
                        style={{ padding: '0 0.75rem', backgroundColor: 'rgba(239,68,68,0.15)', border: 'none', borderRadius: '6px', color: '#FCA5A5', cursor: 'pointer' }}>
                        ✕
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => set('schools', [...form.schools, { name: '', distance: '' }])}
                    style={{ padding: '0.5rem 1rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '6px', color: '#94A3B8', cursor: 'pointer', fontSize: '0.82rem' }}>
                    + Add School
                  </button>
                </div>

                {/* Transport */}
                <div style={fieldStyle}>
                  <label style={labelStyle}>NEARBY TRANSPORT</label>
                  {form.transport.map((t, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input style={inputStyle} value={t.name} onChange={(e) => {
                        const updated = [...form.transport]; updated[i] = { ...updated[i], name: e.target.value }; set('transport', updated);
                      }} placeholder="Station name" />
                      <select style={{ ...inputStyle, width: '90px' }} value={t.type} onChange={(e) => {
                        const updated = [...form.transport]; updated[i] = { ...updated[i], type: e.target.value }; set('transport', updated);
                      }}>
                        <option>Bus</option><option>Metro</option><option>Train</option><option>Tram</option>
                      </select>
                      <input style={{ ...inputStyle, width: '80px' }} value={t.distance} onChange={(e) => {
                        const updated = [...form.transport]; updated[i] = { ...updated[i], distance: e.target.value }; set('transport', updated);
                      }} placeholder="0.5 km" />
                      <button type="button" onClick={() => set('transport', form.transport.filter((_, j) => j !== i))}
                        style={{ padding: '0 0.75rem', backgroundColor: 'rgba(239,68,68,0.15)', border: 'none', borderRadius: '6px', color: '#FCA5A5', cursor: 'pointer' }}>
                        ✕
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => set('transport', [...form.transport, { name: '', type: 'Bus', distance: '' }])}
                    style={{ padding: '0.5rem 1rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '6px', color: '#94A3B8', cursor: 'pointer', fontSize: '0.82rem' }}>
                    + Add Transport
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
            <a href="/sys-ops/properties" style={{ color: '#64748B', fontSize: '0.85rem', textDecoration: 'none' }}>
              ← Back to Properties
            </a>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => { set('status', 'DRAFT'); }}
                style={{ padding: '0.65rem 1.25rem', backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#94A3B8', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                Save as Draft
              </button>
              <button
                type="submit"
                disabled={saving}
                style={{
                  padding: '0.65rem 1.5rem',
                  backgroundColor: saving ? '#1A2744' : '#C9A96E',
                  color: saving ? '#64748B' : '#0B1120',
                  border: 'none', borderRadius: '8px',
                  fontSize: '0.85rem', fontWeight: 700,
                  cursor: saving ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.05em',
                }}
              >
                {saving ? 'Saving...' : mode === 'create' ? 'Create Property' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}

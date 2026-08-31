'use client';

import React, { useState, useRef } from 'react';

interface ImageUploadProps {
  label: string;
  folder: string;
  currentUrls: string[];
  onUpload: (urls: string[]) => void;
  multiple?: boolean;
}

export default function ImageUpload({ label, folder, currentUrls, onUpload, multiple = false }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList) => {
    setUploading(true);
    setError('');
    const uploaded: string[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      try {
        const res = await fetch('/api/sys-ops/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (res.ok) {
          uploaded.push(data.url);
        } else {
          setError(data.error || 'Upload failed');
        }
      } catch {
        setError('Network error during upload');
      }
    }

    if (uploaded.length > 0) {
      onUpload(multiple ? [...currentUrls, ...uploaded] : uploaded);
    }
    setUploading(false);
  };

  const removeImage = (url: string) => {
    onUpload(currentUrls.filter((u) => u !== url));
  };

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', color: '#94A3B8', marginBottom: '0.5rem' }}>
        {label.toUpperCase()}
      </label>

      {/* Preview thumbnails */}
      {currentUrls.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
          {currentUrls.map((url) => (
            <div key={url} style={{ position: 'relative', width: '80px', height: '60px' }}>
              <img
                src={url}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}
              />
              <button
                type="button"
                onClick={() => removeImage(url)}
                style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  width: '18px', height: '18px', borderRadius: '50%',
                  backgroundColor: '#EF4444', border: 'none', color: 'white',
                  fontSize: '0.6rem', cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files) handleFiles(e.dataTransfer.files); }}
        style={{
          border: '2px dashed rgba(255,255,255,0.1)',
          borderRadius: '8px',
          padding: '1.25rem',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: '#0B1120',
          transition: 'border-color 0.15s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          style={{ display: 'none' }}
          onChange={(e) => { if (e.target.files) handleFiles(e.target.files); }}
        />
        {uploading ? (
          <p style={{ color: '#C9A96E', fontSize: '0.85rem' }}>Uploading...</p>
        ) : (
          <>
            <p style={{ color: '#64748B', fontSize: '0.85rem' }}>
              {multiple ? 'Click or drag images to upload' : 'Click or drag an image to upload'}
            </p>
            <p style={{ color: '#475569', fontSize: '0.75rem', marginTop: '0.25rem' }}>JPG, PNG, WEBP — max 20MB</p>
          </>
        )}
      </div>

      {error && <p style={{ color: '#FCA5A5', fontSize: '0.78rem', marginTop: '0.4rem' }}>{error}</p>}
    </div>
  );
}

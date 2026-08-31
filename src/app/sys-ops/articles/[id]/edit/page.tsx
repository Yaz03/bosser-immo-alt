'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ArticleForm from '@/components/sys-ops/ArticleForm';

export default function EditArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/sys-ops/articles/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setArticle({
          id: data.id,
          titleEn: data.titleEn || '',
          titleDe: data.titleDe || '',
          descEn: data.descEn || '',
          descDe: data.descDe || '',
          contentEn: data.contentEn || '',
          contentDe: data.contentDe || '',
          category: data.category || '',
          heroImage: data.heroImage || '',
          status: data.status || 'DRAFT',
          featured: data.featured || false,
          author: data.author || '',
          slug: data.slug || '',
          metaTitleEn: data.metaTitleEn || '',
          metaDescEn: data.metaDescEn || '',
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0B1120', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
        Loading article...
      </div>
    );
  }

  if (!article) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0B1120', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FCA5A5' }}>
        Article not found.
      </div>
    );
  }

  return <ArticleForm initial={article as Parameters<typeof ArticleForm>[0]['initial']} />;
}

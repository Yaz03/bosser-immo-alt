import React from 'react';
import KnowledgeDetailClient from './KnowledgeDetailClient';

export default async function KnowledgeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <KnowledgeDetailClient id={id} />;
}

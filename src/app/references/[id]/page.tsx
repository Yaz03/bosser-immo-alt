import React from 'react';
import ReferenceDetailClient from './ReferenceDetailClient';

export default async function ReferenceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ReferenceDetailClient id={id} />;
}

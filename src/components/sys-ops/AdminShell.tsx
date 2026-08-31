'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/sys-ops/Sidebar';
import TopBar from '@/components/sys-ops/TopBar';
import { useSession } from 'next-auth/react';

interface AdminShellProps {
  children: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function AdminShell({ children, breadcrumbs }: AdminShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { data: session } = useSession();

  const userName = session?.user?.name || 'Admin';
  const userRole = (session?.user as { role?: string })?.role || 'VIEWER';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0B1120' }}>
      <Sidebar
        userRole={userRole}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar userName={userName} userRole={userRole} breadcrumbs={breadcrumbs} />
        <main
          style={{
            flex: 1,
            padding: '2rem',
            overflowY: 'auto',
            color: '#E2E8F0',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

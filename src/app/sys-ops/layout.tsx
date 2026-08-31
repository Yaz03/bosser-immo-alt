import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';

export const metadata = {
  title: 'Sys-ops | Bossert Admin',
};

export default async function SysOpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Middleware handles redirect, but double-check here
  if (!session) {
    redirect('/sys-ops/login');
  }

  return (
    <SessionProvider session={session}>
      <div style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        {children}
      </div>
    </SessionProvider>
  );
}

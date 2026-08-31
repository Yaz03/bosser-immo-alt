import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import type { Role } from '@prisma/client';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/sys-ops/login',
    error: '/sys-ops/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { id: string; role: Role }).role;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as { id: string; role: Role }).role = token.role as Role;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        // Find user in DB (includes super admin after seeding)
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !user.isActive) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
});

// Helper: check if the current session role can perform an action
export function canManageUsers(role: Role) {
  return role === 'SUPER_ADMIN' || role === 'ADMIN';
}

export function canEdit(role: Role) {
  return role === 'SUPER_ADMIN' || role === 'ADMIN' || role === 'EDITOR';
}

export function canDelete(role: Role) {
  return role === 'SUPER_ADMIN' || role === 'ADMIN';
}

export function isSuperAdmin(role: Role) {
  return role === 'SUPER_ADMIN';
}

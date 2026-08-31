import { prisma } from '@/lib/prisma';
import { AuditLog } from '@prisma/client';

interface WriteAuditLogArgs {
  userId: string;
  userEmail: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT';
  entityType: string;
  entityId?: string;
  detail?: string;
}

export async function writeAuditLog(args: WriteAuditLogArgs): Promise<AuditLog> {
  return prisma.auditLog.create({
    data: {
      userId: args.userId,
      userEmail: args.userEmail,
      action: args.action,
      entityType: args.entityType,
      entityId: args.entityId,
      detail: args.detail,
    },
  });
}

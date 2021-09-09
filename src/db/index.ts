import { PrismaClient } from '.prisma/client';

export const getMyPrismaClient = () => {
  const prisma = new PrismaClient({ log: ['error', 'info', 'query', 'warn'] });
  console.log('Prisma connected');
  return prisma;
};

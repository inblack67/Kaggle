import { PrismaClient } from '.prisma/client';
import { Redis } from 'ioredis';

export interface ILocals {
  redis: Redis;
  prisma: PrismaClient;
}

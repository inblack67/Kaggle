import { PrismaClient } from '.prisma/client';
import { Redis } from 'ioredis';

export interface ILocals {
  redis: Redis;
  prisma: PrismaClient;
}

export interface IData {
  country_or_area: string;
  year: number;
  value: number;
  category: string;
}

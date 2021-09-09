import Redis from 'ioredis';

export const getMyRedisClient = () => {
  const redis = new Redis();
  console.log('Redis connected');
  return redis;
};

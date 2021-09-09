import express from 'express';
import morgan from 'morgan';
import { getMyRedisClient } from './cache';
import { RootController } from './controllers/index';
import { getMyPrismaClient } from './db';
import { populateLocals } from './middlewares/populateLocals';
import countriesRoutes from './routes/countries';

const main = async () => {
  const redis = getMyRedisClient();
  const prisma = getMyPrismaClient();

  const app = express();

  app.use(populateLocals({ redis, prisma }));

  app.use(morgan('dev'));

  app.get('/', RootController);
  app.use('/countries', countriesRoutes);

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

main().catch((err) => console.error(err));

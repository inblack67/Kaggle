import express from 'express';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { getMyRedisClient } from './cache';
import { RootController } from './controllers/index';
import { getMyPrismaClient } from './db';
import { populateLocals } from './middlewares/populateLocals';
import countriesRoutes from './routes/countries';

const main = async () => {
  const specs = swaggerJSDoc({
    definition: {
      info: {
        title: 'Countries API',
        version: '3.0.0',
        description: 'REST API for international greenhouse gas emissions',
      },
      servers: [
        {
          url: 'http://localhost:5000',
        },
      ],
    },
    apis: ['./routes/*.js'],
  });

  const redis = getMyRedisClient();
  const prisma = getMyPrismaClient();

  const app = express();

  app.use(morgan('dev'));

  app.get('/ping', RootController);

  app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));
  
  app.use('/countries', populateLocals({ redis, prisma }), countriesRoutes);

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

main().catch((err) => console.error(err));

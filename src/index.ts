import express from 'express';
import morgan from 'morgan';
import { RootController } from './controllers/index';
import countriesRoutes from './routes/countries';

const main = async () => {
  const app = express();

  app.use(morgan('dev'));

  app.get('/', RootController);
  app.use('/countries', countriesRoutes);

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

main().catch((err) => console.error(err));

import express from 'express';
import morgan from 'morgan';
import { GetCountriesController } from './controllers/index';

const main = async () => {
  const app = express();

  app.use(morgan('dev'));

  app.get('/', GetCountriesController);
  // app.get('/', RootController);

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

main().catch((err) => console.error(err));

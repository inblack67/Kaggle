import { Router } from 'express';
import { GetCountriesController, GetCountryController } from '../controllers';

const router = Router();

router.get('/', GetCountriesController);
router.get('/:id', GetCountryController);

export default router;

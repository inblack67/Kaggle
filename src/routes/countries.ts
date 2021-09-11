import { Router } from 'express';
import { GetCountriesController, GetCountryController } from '../controllers';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Country:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         country_or_area:
 *           type: string
 *           description: The Country
 *         year:
 *           type: number
 *           description: The year
 *         value:
 *           type: number
 *           description: The value of greenhouse emissions
 *         category:
 *           type: string
 *           description: The category
 *       example:
 *         id: 1
 * 		   country_or_area: "Australia",
 * 		   year: 2014,
 * 		   value: 393126.946994288,
 * 		   category: "co2"
 */

/**
 * @swagger
 * tags:
 *   name: Countries
 *   description: Get All Countries
 */

/**
 * @swagger
 * /countries:
 *   get:
 *     summary: Returns the list of all the countries
 *     tags: [Country]
 *     responses:
 *       200:
 *         description: The list of the country
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Country'
 */
router.get('/', GetCountriesController);

router.get('/:id', GetCountryController);

export default router;

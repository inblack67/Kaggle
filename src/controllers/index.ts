import { Country } from '.prisma/client';
import { Request, Response, NextFunction } from 'express';
import {
  REDIS_KEY_COUNTRIES,
  REDIS_KEY_COUNTRY,
  SOMETHING_WENT_WRONG,
} from '../constants';
import { ILocals } from '../interfaces';
import {
  fetchCountriesInputValidation,
  fetchCountryInputValidation,
} from '../validations';

export const RootController = (_: Request, res: Response, __: NextFunction) => {
  res.send('API up and running');
};

export const GetCountriesController = async (
  req: Request,
  res: Response<any, ILocals>,
  __: NextFunction,
) => {
  try {
    const { category, endYear, startYear } =
      await fetchCountriesInputValidation(req.query);
    const dynamicFields = category ? { category: category } : {};

    if (startYear || endYear) {
      if (startYear && endYear) {
        const filteredCountries = await res.locals.prisma.country.findMany({
          where: {
            year: {
              gte: startYear,
              lte: endYear,
            },
            ...dynamicFields,
          },
        });
        res.status(200).json({ success: true, data: filteredCountries });
      } else if (startYear) {
        const filteredCountries = await res.locals.prisma.country.findMany({
          where: {
            year: {
              gte: startYear,
            },
            ...dynamicFields,
          },
        });
        res.status(200).json({ success: true, data: filteredCountries });
      } else if (endYear) {
        const filteredCountries = await res.locals.prisma.country.findMany({
          where: {
            year: {
              lte: endYear,
            },
            ...dynamicFields,
          },
        });
        res.status(200).json({ success: true, data: filteredCountries });
      }
      return;
    }

    const cachedCountries = await res.locals.redis.get(REDIS_KEY_COUNTRIES);

    if (cachedCountries) {
      const data: Country[] = JSON.parse(cachedCountries);
      res.status(200).json({ success: true, data });
      console.log(`Served data through cache`);
      return;
    }

    const countries = await res.locals.prisma.country.findMany({
      where: { ...dynamicFields },
    });

    res.locals.redis.set(REDIS_KEY_COUNTRIES, JSON.stringify(countries));

    console.log(`Populated cache`);

    res.status(200).json({ success: true, data: countries });
  } catch (err) {
    const caughtError: any = err;
    if (caughtError.name === 'ValidationError') {
      res.status(400).json({ success: false, errors: caughtError.errors });
    } else {
      console.error(err);
      res.status(400).json({ success: false, error: SOMETHING_WENT_WRONG });
    }
  }
};

export const GetCountryController = async (
  req: Request,
  res: Response<any, ILocals>,
  __: NextFunction,
) => {
  try {
    const { id } = await fetchCountryInputValidation(req.params);

    const cachedCountry = await res.locals.redis.get(
      `${REDIS_KEY_COUNTRY}-${id}`,
    );

    if (cachedCountry) {
      const data: Country = JSON.parse(cachedCountry);
      res.status(200).json({ success: true, data });
      console.log(`Served data through cache`);
      return;
    }

    const country = await res.locals.prisma.country.findUnique({
      where: { id },
    });

    if (!country) {
      res.status(404).json({ success: false, error: 'No such country exists' });
      return;
    }

    await res.locals.redis.set(
      `${REDIS_KEY_COUNTRY}-${country.id}`,
      JSON.stringify(country),
    );

    console.log(`Populated cache`);

    res.status(200).json({ success: true, data: country });
  } catch (err) {
    const caughtError: any = err;
    if (caughtError.name === 'ValidationError') {
      res.status(400).json({ success: false, errors: caughtError.errors });
    } else {
      console.error(err);
      res.status(400).json({ success: false, error: SOMETHING_WENT_WRONG });
    }
  }
};

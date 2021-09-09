import { Country } from '.prisma/client';
import { Request, Response, NextFunction } from 'express';
import { ILocals } from '../interfaces';

export const RootController = (_: Request, res: Response, __: NextFunction) => {
  res.send('API up and running');
};

export const GetCountriesController = async (
  req: Request,
  res: Response<any, ILocals>,
  __: NextFunction,
) => {
  let countries: Country[];
  const { startYear, endYear, category } = req.query;

  if (category) {
    countries = await res.locals.prisma.country.findMany({
      where: {
        category: { equals: category as string },
      },
    });
  }

  if (startYear || endYear) {
    if (startYear && endYear) {
      const filteredCountries = await res.locals.prisma.country.findMany({
        where: {
          year: {
            gte: +startYear,
            lte: +endYear,
          },
        },
      });
      res.status(200).json({ success: true, data: filteredCountries });
    } else if (startYear) {
      const filteredCountries = await res.locals.prisma.country.findMany({
        where: {
          year: {
            gte: +startYear,
          },
        },
      });
      res.status(200).json({ success: true, data: filteredCountries });
    } else if (endYear) {
      const filteredCountries = await res.locals.prisma.country.findMany({
        where: {
          year: {
            lte: +endYear,
          },
        },
      });
      res.status(200).json({ success: true, data: filteredCountries });
    }
    return;
  }

  res.status(200).json({ success: true, data: countries! });
};

export const GetCountryController = async (
  req: Request,
  res: Response<any, ILocals>,
  __: NextFunction,
) => {
  const { country_or_area } = req.params;

  const countries = await res.locals.prisma.country.findMany({
    where: {
      country_or_area,
    },
  });

  if (countries.length === 0) {
    res.status(404).json({ success: false, error: 'No such country exist' });
    return;
  }

  res.status(200).json({ success: true, data: countries });
};

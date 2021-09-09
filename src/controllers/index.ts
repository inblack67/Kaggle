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
  const { startYear, endYear } = req.query;

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

  const countries = await res.locals.prisma.country.findMany();
  res.status(200).json({ success: true, data: countries! });
};

export const GetCountryController = async (
  req: Request,
  res: Response<any, ILocals>,
  __: NextFunction,
) => {
  const { country_or_area } = req.params;
  const { startYear, endYear, category } = req.query;

  let countries: Country[];

  if (category) {
    countries = await res.locals.prisma.country.findMany({
      where: {
        category: { contains: category as string },
        country_or_area,
      },
    });
  }

  if (startYear || endYear) {
    if (startYear && endYear) {
      const filteredCountries = await res.locals.prisma.country.findMany({
        where: {
          country_or_area,
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
          country_or_area,
          year: {
            gte: +startYear,
          },
        },
      });
      res.status(200).json({ success: true, data: filteredCountries });
    } else if (endYear) {
      const filteredCountries = await res.locals.prisma.country.findMany({
        where: {
          country_or_area,
          year: {
            lte: +endYear,
          },
        },
      });
      res.status(200).json({ success: true, data: filteredCountries });
    }
    return;
  }

  countries = await res.locals.prisma.country.findMany({
    where: {
      country_or_area,
    },
  });

  res.status(200).json({ success: true, data: countries });
};

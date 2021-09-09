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
  const { startYear, endYear, category } = req.query;

  const dynamicFields = category ? { category: String(category) } : {};

  if (startYear || endYear) {
    if (startYear && endYear) {
      const filteredCountries = await res.locals.prisma.country.findMany({
        where: {
          year: {
            gte: +startYear,
            lte: +endYear,
          },
          ...dynamicFields,
        },
      });
      res.status(200).json({ success: true, data: filteredCountries });
    } else if (startYear) {
      const filteredCountries = await res.locals.prisma.country.findMany({
        where: {
          year: {
            gte: +startYear,
          },
          ...dynamicFields,
        },
      });
      res.status(200).json({ success: true, data: filteredCountries });
    } else if (endYear) {
      const filteredCountries = await res.locals.prisma.country.findMany({
        where: {
          year: {
            lte: +endYear,
          },
          ...dynamicFields,
        },
      });
      res.status(200).json({ success: true, data: filteredCountries });
    }
    return;
  }

  const countries = await res.locals.prisma.country.findMany({
    where: { ...dynamicFields },
  });

  res.status(200).json({ success: true, data: countries });
};

export const GetCountryController = async (
  req: Request,
  res: Response<any, ILocals>,
  __: NextFunction,
) => {
  const { id } = req.params;

  const country = await res.locals.prisma.country.findUnique({
    where: { id: +id },
  });

  if (!country) {
    res.status(404).json({ success: false, error: 'No such country exists' });
    return;
  }

  res.status(200).json({ success: true, data: country });
};

import { Request, Response, NextFunction } from 'express';
import data from '../../data.json';
import { IData } from '../interfaces';

export const RootController = (_: Request, res: Response, __: NextFunction) => {
  res.send('API up and running');
};

export const GetCountriesController = (
  req: Request,
  res: Response,
  __: NextFunction,
) => {
  let countries: IData[] = data;
  const { startYear, endYear, category } = req.query;

  if (category) {
    countries = countries.filter((el) =>
      el.category.includes(category as string),
    );
  }

  if (startYear || endYear) {
    if (startYear && endYear) {
      const filteredCountries = countries.filter(
        (el) => el.year >= +startYear && el.year <= +endYear,
      );
      res.status(200).json({ success: true, data: filteredCountries });
    } else if (startYear) {
      const filteredCountries = countries.filter((el) => el.year >= +startYear);
      res.status(200).json({ success: true, data: filteredCountries });
    } else if (endYear) {
      const filteredCountries = countries.filter((el) => el.year <= +endYear);
      res.status(200).json({ success: true, data: filteredCountries });
    }
    return;
  }

  res.status(200).json({ success: true, data: countries });
};

export const GetCountryController = (
  req: Request,
  res: Response,
  __: NextFunction,
) => {
  const countries: IData[] = data;

  const { id } = req.params;

  const country = countries.find(
    (el) => el.country_or_area.toLowerCase() === String(id).toLowerCase(),
  );

  if (!country) {
    res.status(404).json({ success: false, error: 'No such country exist' });
    return;
  }

  res.status(200).json({ success: true, data: country });
};

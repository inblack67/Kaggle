import { Request, Response, NextFunction } from 'express';
import data from '../../data.json';
import { IData } from '../interfaces';

export const RootController = (_: Request, res: Response, __: NextFunction) => {
  res.send('API up and running');
};

export const GetCountriesController = (
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  const countries: IData[] = data;
  res.status(200).json({ success: true, data: countries });
};

import { Request, Response, NextFunction } from 'express';
import { ILocals } from '../interfaces';

export const populateLocals =
  ({ redis }: ILocals) =>
  (_: Request, res: Response<any, ILocals>, next: NextFunction) => {
    res.locals['redis'] = redis;
    next();
  };

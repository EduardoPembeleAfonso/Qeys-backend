import { Request, Response, NextFunction } from 'express';
import { AppErrors } from './appErrors.helper';

export const ErrorsExceptions = (
  err: Error,
  req: Request,
  res: Response<any, Record<string, any>>,
  _: NextFunction
) => {
  if (err instanceof AppErrors) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  return res.status(500).json({
    success: false,
    message: err.message,
  });
};
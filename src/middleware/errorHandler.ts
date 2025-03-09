import { Request, Response, NextFunction } from 'express';

class ErrorHandler extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error'
  });
};

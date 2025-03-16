import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Validation middleware
export const validateNote = [
  body('title').isString().notEmpty().withMessage('Title is required'),
  body('content').isString().notEmpty().withMessage('Content is required'),
  body('category').isMongoId().withMessage('Valid category ID is required'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

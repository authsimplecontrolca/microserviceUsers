import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const allValidator = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() }); // Retorna la respuesta con los errores si es necesario
    return;
  }
  next(); // Llama a `next()` si no hay errores
};

import { Request, Response, NextFunction, RequestHandler } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

export default (request: Request, response: Response, next: NextFunction) => {
  return celebrate({
    [Segments.QUERY]: Joi.object().keys({
      skip: Joi.number().positive(),
      limit: Joi.number().positive(),
    }),
  })(request, response, next);
};

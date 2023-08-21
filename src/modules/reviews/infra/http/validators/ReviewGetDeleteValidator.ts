import { Request, Response, NextFunction, RequestHandler } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

export default (request: Request, response: Response, next: NextFunction) => {
  return celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().positive().required(),
    }),
  })(request, response, next);
};

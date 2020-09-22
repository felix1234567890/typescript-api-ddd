import { Request, Response, NextFunction, RequestHandler } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

export default (request: Request, response: Response, next: NextFunction): RequestHandler => {
  return celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().positive().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().min(6),
      newPassword: Joi.string().min(6),
    }),
  })(request, response, next);
};

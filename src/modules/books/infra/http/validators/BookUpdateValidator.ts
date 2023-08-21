import { celebrate, Joi, Segments } from 'celebrate';
import { NextFunction, RequestHandler, Request, Response } from 'express';

export default (request: Request, response: Response, next: NextFunction): void => {
  return celebrate(
    {
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().positive().required(),
      }),
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().min(2).max(50).messages({
          'string.empty': `Title cannot be empty`,
        }),
        description: Joi.string().min(10).messages({
          'string.empty': `Description cannot be empty`,
        }),
      }),
    },
    { abortEarly: false, allowUnknown: false },
  )(request, response, next);
};

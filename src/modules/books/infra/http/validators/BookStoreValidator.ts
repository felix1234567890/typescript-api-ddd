import { celebrate, Joi, Segments } from 'celebrate';
import { NextFunction, RequestHandler, Request, Response } from 'express';

export default (request: Request, response: Response, next: NextFunction): void => {
  return celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().min(2).max(50).messages({
          'any.required': 'Title is required',
          'string.empty': `Title cannot be empty`,
        }),
        description: Joi.string().required().min(10).messages({
          'any.required': `Description is required`,
          'string.empty': `Description cannot be empty`,
        }),
      }),
    },
    { abortEarly: false, allowUnknown: false },
  )(request, response, next);
};

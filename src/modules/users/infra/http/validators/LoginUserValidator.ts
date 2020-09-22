import { celebrate, Joi, Segments } from 'celebrate';
import { NextFunction, RequestHandler, Request, Response } from 'express';

export default (request: Request, response: Response, next: NextFunction): RequestHandler => {
  return celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required().messages({
          'any.required': `Email is required`,
          'string.empty': `Email cannot be empty`,
          'string.email': `This is not valid email`,
        }),
        password: Joi.string().min(6).required().messages({
          'any.required': `Password is required`,
          'string.empty': `Password cannot be empty`,
          'string.min': `Password cannot have less than {#limit} dígits`,
        }),
      }),
    },
    { abortEarly: false, allowUnknown: false },
  )(request, response, next);
};

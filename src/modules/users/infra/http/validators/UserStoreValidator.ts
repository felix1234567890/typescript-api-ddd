import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().messages({
        'any.required': 'Name is required',
        'string.empty': `Name cannot be empty`,
      }),
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
);

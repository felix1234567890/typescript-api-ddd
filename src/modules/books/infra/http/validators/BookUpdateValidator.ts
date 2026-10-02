import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate(
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
);

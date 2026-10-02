import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      text: Joi.string().required().min(2).max(50).messages({
        'any.required': 'Title is required',
        'string.empty': `Title cannot be empty`,
      }),
      bookId: Joi.number().positive().required(),
    }),
  },
  { abortEarly: false, allowUnknown: false },
);

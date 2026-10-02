import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
  [Segments.QUERY]: Joi.object().keys({
    skip: Joi.number().positive(),
    limit: Joi.number().positive(),
  }),
});

import Joi from 'joi';

export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().required(),
  role: Joi.string().valid('user', 'admin').default('user'),
});

export const funnelSchema = Joi.object({
  name: Joi.string().required(),
  steps: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      type: Joi.string().valid('landing', 'upsell', 'downsell', 'checkout').required(),
      content: Joi.object().required(),
    })
  ).required(),
});

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};
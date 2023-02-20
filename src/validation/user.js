const Joi = require('joi');

const schema = Joi.object({
  fullname: Joi.string().required(),
  username: Joi.string().required().lowercase(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
  role: Joi.string().required(),
  age: Joi.number().integer().min(18).max(99).required()
});

module.exports = schema;
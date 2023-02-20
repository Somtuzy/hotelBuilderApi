const Joi = require('joi')

const schema = Joi.object({
  name: Joi.string().lowercase().required(),
  description: Joi.string().required()
});

module.exports = schema;
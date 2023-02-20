const Joi = require('joi')

const schema = Joi.object({
  codename: Joi.string().lowercase().required(),
  roomtype: Joi.required(),
  price: Joi.number().required(),
  description: Joi.string().required()
});

module.exports = schema;
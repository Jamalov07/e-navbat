const Joi = require("joi");

const serviceSchema = Joi.object({
  service_name: Joi.string().min(5).max(40).required(),
  service_price: Joi.number().required(),
});
module.exports = serviceSchema;

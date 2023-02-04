const Joi = require("joi");

const tokenSchema = Joi.object({
  table_name: Joi.string().required(),
  user_id: Joi.number().required(),
  user_os: Joi.string(),
  user_device: Joi.string(),
  token: Joi.string().alphanum().required(),
});
module.exports = tokenSchema;

const Joi = require("joi");

const otpSchema = Joi.object({
  otp: Joi.string().alphanum().min(6).required(),
  expiration_time: Joi.date().required(),
  verified: Joi.boolean().default(false),
});
module.exports = otpSchema;

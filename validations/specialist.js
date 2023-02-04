const Joi = require("joi");

const specialistSchema = Joi.object({
  spec_position: Joi.string().required(),
  spec_last_name: Joi.string().required(),
  spec_first_name: Joi.string().required(),
  spec_middle_name: Joi.string().required(),
  spec_birth_day: Joi.date().required(),
  spec_photo: Joi.string().required(),
  spec_phone_number: Joi.string()
    .max(17)
    .pattern(/\d{2}-\d{3}-\d{2}-\d{2}/),
  spec_password: Joi.string().alphanum().required(),
  spec_is_active: Joi.boolean(),
  show_position: Joi.boolean(),
  show_last_name: Joi.boolean(),
  show_first_name: Joi.boolean(),
  show_middle_name: Joi.boolean(),
  show_photo: Joi.boolean(),
  show_social: Joi.boolean(),
  show_info: Joi.boolean(),
  show_birth_day: Joi.boolean(),
  show_phone_number: Joi.boolean(),
  otp_id: Joi.string().alphanum().required(),
});
module.exports = specialistSchema;

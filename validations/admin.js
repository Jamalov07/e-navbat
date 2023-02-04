const Joi = require("joi");

const adminSchema = Joi.object({
  admin_name: Joi.string().min(5).max(30).required(),
  admin_phone_number: Joi.string()
    .max(17)
    .pattern(/\d{2}-\d{3}-\d{2}-\d{2}/),
  admin_password: Joi.string().min(6).max(100).required(),
  admin_is_active: Joi.boolean().default(false),
  admin_is_creator: Joi.boolean().default(false),
});
module.exports = adminSchema;

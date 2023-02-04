const Joi = require("joi");

const socialSchema = Joi.object({
  social_name: Joi.string().min(5).max(40).required(),
  social_icon_file: Joi.string().min(5).required(),
});
module.exports = socialSchema;

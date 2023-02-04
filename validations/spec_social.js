const Joi = require("joi");

const spec_socialSchema = Joi.object({
  spec_id: Joi.number().required(),
  social_id: Joi.number().required(),
  social_link: Joi.string().required(),
});
module.exports = spec_socialSchema;

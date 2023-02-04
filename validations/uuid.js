const Joi = require("joi");

const uuidSchema = Joi.object({
    id: Joi.string().alphanum().min(4).required(),
});
module.exports = uuidSchema;

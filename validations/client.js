const Joi = require("joi");

const clientSchema = Joi.object({
    client_first_name: Joi.string().min(5).max(50).required(),
    client_last_name: Joi.string().min(5).max(50).required(),
    client_photo:Joi.string().min(5).max(50),
    client_info:Joi.string().min(5).max(100),
});
module.exports = clientSchema;


const Joi = require("joi");

const queueSchema = Joi.object({
  client_id: Joi.number().required(),
  spec_service_id: Joi.number().required(),
  queue_date_time: Joi.date().required(),
  queue_number: Joi.number().required(),
});
module.exports = queueSchema;

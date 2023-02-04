const Joi = require("joi");

const spec_working_daySchema = Joi.object({
  spec_id: Joi.number().required(),
  day_of_week: Joi.number().required(),
  start_time: Joi.date().required(),
  finish_time: Joi.date().required(),
  rest_start_time: Joi.date().required(),
  rest_finish_time: Joi.date().required(),
});
module.exports = spec_working_daySchema;

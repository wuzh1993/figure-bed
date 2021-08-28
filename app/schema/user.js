const Joi = require("joi");

const loginIn = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  loginIn,
};

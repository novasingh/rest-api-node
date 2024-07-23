const Joi = require('joi');

const getToken = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    accessToken: Joi.string(),
    refreshToken: Joi.string(),
    user: Joi.string(),
    type: Joi.string(),
    expires: Joi.date(),
  }),
};

const saveToken = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    accessToken: Joi.string(),
    refreshToken: Joi.string(),
    user: Joi.string(),
    type: Joi.string(),
    expires: Joi.date(),
  }),
};

module.exports = {
  getToken,
  saveToken,
};

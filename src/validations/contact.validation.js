const Joi = require('joi');

const createContact = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    message: Joi.string(),
  }),
};

const getContact = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const updateContact = {
  params: Joi.object().keys({
    companyId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    message: Joi.string(),
  }),
};

const deleteContact = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = {
  createContact,
  getContact,
  updateContact,
  deleteContact,
};

const Joi = require('joi');

const createCompany = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    logo: Joi.string().required(),
    type: Joi.string().required(),
    manager: Joi.string(),
  }),
};

const getCompany = {
  params: Joi.object().keys({
    companyId: Joi.string().required(),
  }),
};

const updateCompany = {
  params: Joi.object().keys({
    companyId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    logo: Joi.string(),
    type: Joi.string(),
    manager: Joi.string(),
  }),
};

const deleteCompany = {
  params: Joi.object().keys({
    companyId: Joi.string().required(),
  }),
};

module.exports = {
  createCompany,
  getCompany,
  updateCompany,
  deleteCompany,
};

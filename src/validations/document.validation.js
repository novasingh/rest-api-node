const Joi = require('joi');

const getDocumentsByUserId = {
  params: Joi.object({
    userId: Joi.string().hex().length(24).required(),
  }),
};

const uploadDocument = {
  params: Joi.object({
    userId: Joi.string().hex().length(24).required(),
  }),
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow(''),
    fileUrl: Joi.string().required(),
    type: Joi.string().valid('ID', 'Driver License', 'Resume', 'Vaccination Proof', 'HR Form', 'Other').required(),
    expireAt: Joi.string(),
  }),
};

const deleteDocument = {
  params: Joi.object({
    userId: Joi.string().hex().length(24).required(),
    documentId: Joi.string().hex().length(24).required(),
  }),
};

module.exports = {
  getDocumentsByUserId,
  uploadDocument,
  deleteDocument,
};

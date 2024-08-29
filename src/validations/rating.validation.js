const Joi = require('joi');

const createRating = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
    rating: Joi.number().required(),
  }),
};

const getRating = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const updateRating = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    rating: Joi.number().required(),
  }),
};

const deleteRating = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = {
  createRating,
  getRating,
  updateRating,
  deleteRating,
};

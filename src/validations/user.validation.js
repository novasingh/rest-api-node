const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string(),
    name: Joi.string().required(),
    role: Joi.string().required().valid('driver', 'manager', 'admin'),
    dob: Joi.date(),
    phone: Joi.string(),
    address: Joi.string(),
    driverN: Joi.string(),
    truckN: Joi.string(),
    licensePlate: Joi.string(),
    insuranceN: Joi.string(),
    company: Joi.string(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    dob: Joi.date(),
    email: Joi.string(),
    phone: Joi.string(),
    address: Joi.string(),
    driverN: Joi.string(),
    truckN: Joi.string(),
    licensePlate: Joi.string(),
    insuranceN: Joi.string(),
    role: Joi.string(),
    company: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string(),
      dob: Joi.date(),
      phone: Joi.string(),
      address: Joi.string(),
      driverN: Joi.string(),
      truckN: Joi.string(),
      licensePlate: Joi.string(),
      insuranceN: Joi.string(),
      company: Joi.string(),
      role: Joi.string(),
      healthData: Joi.object().optional(),
      healthScore: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};

const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string(),
    name: Joi.string().required(),
    role: Joi.string().required().valid('driver', 'manager'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    dob: Joi.date(),
    phone: Joi.string(),
    address: Joi.string(),
    driverN: Joi.string(),
    TruckN: Joi.string(),
    licensePlate: Joi.string(),
    insuranceN: Joi.string(),
    role: Joi.string(),
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
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      firstName: Joi.string(),
      lastName: Joi.string(),
      dob: Joi.date(),
      phone: Joi.string(),
      address: Joi.string(),
      driverN: Joi.string(),
      TruckN: Joi.string(),
      licensePlate: Joi.string(),
      insuranceN: Joi.string(),
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

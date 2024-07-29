const Joi = require('joi');

const getNotifications = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

const getReadNotification = {
  params: Joi.object().keys({
    notificationId: Joi.string().required(),
  }),
};

const getRequestDocuments = {
  body: Joi.object().keys({
    managerId: Joi.string(),
    driverId: Joi.string(),
    documentName: Joi.string(),
  }),
};

module.exports = {
  getNotifications,
  getReadNotification,
  getRequestDocuments,
};

const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { notificationService } = require('../services');

const getNotifications = catchAsync(async (req, res) => {
  const notifications = await notificationService.getNotifications(req.params.userId);
  if (!notifications) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Notifications not found');
  }
  res.send(notifications);
});

const getReadNotification = catchAsync(async (req, res) => {
  const notification = await notificationService.getReadNotifications(req.params.notificationId);
  if (!notification) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Notifications not found');
  }
  res.status(200).json({ message: 'Notification marked as read' });
});

const requestUploadDocuments = catchAsync(async (req, res) => {
  const { managerId, driverId, documentName } = req.body;
  const notification = await notificationService.uploadRequestDocuments(managerId, driverId, documentName);
  if (!notification) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Document upload request not successfully');
  }
  res.status(200).json({ message: 'Document upload request sent successfully' });
});

module.exports = {
  getNotifications,
  getReadNotification,
  requestUploadDocuments,
};

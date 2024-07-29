const httpStatus = require('http-status');
const { User, Notification } = require('../models');
const ApiError = require('../utils/ApiError');

async function createNotification(userId, message) {
  const notification = new Notification({
    userId,
    message,
  });
  await notification.save();
}

/**
 * Get token by id
 * @param {ObjectId} userId
 * @returns {Promise<Notification>}
 */
const getNotifications = async (userId) => {
  const notifications = await Notification.find({ userId });
  return notifications;
};

/**
 * Update Notification by notificationId
 * @param {ObjectId} notificationId
 * @returns {Promise<FitbitToken>}
 */
const getReadNotifications = async (notificationId) => {
  try {
    const result = await Notification.findByIdAndUpdate(notificationId, { isRead: true });
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Internal Server Error');
  }
};

const uploadRequestDocuments = async (managerId, driverId, documentName) => {
  try {
    // Check if manager and driver exist
    const manager = await User.findById(managerId);
    const driver = await User.findById(driverId);

    if (!manager || !driver) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Manager or Driver not found');
    }

    // Create notification
    const message = `Manager ${manager.name} has requested you to upload ${documentName}`;
    const notification = await createNotification(driverId, message);

    return notification;
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Internal Server Error');
  }
};

module.exports = {
  getNotifications,
  getReadNotifications,
  uploadRequestDocuments,
};

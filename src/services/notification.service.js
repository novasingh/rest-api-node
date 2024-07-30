const httpStatus = require('http-status');
const { User, Notification } = require('../models');
const ApiError = require('../utils/ApiError');

async function createNotification(userId, message, documentDescription, expireDate) {
  const notification = new Notification({
    userId,
    message,
    documentDescription,
    expireDate,
  });
  await notification.save();
  return notification; // Ensure to return the created notification
}

/**
 * Get notifications by userId
 * @param {ObjectId} userId
 * @returns {Promise<Array<Notification>>}
 */
const getNotifications = async (userId) => {
  const notifications = await Notification.find({ userId });
  return notifications;
};

/**
 * Update Notification by notificationId
 * @param {ObjectId} notificationId
 * @returns {Promise<Notification>}
 */
const getReadNotifications = async (notificationId) => {
  try {
    const result = await Notification.findByIdAndUpdate(notificationId, { isRead: true });
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error');
  }
};

const uploadRequestDocuments = async (managerId, driverId, documentName, documentDescription, expireDate) => {
  try {
    // Check if manager and driver exist
    const manager = await User.findById(managerId);
    const driver = await User.findById(driverId);

    if (!manager) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Manager not found');
    }

    if (!driver) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Driver not found');
    }

    // Create notification
    const message = `Manager ${manager.firstName} has requested you to upload ${documentName}`;
    const notification = await createNotification(driverId, message, documentDescription, expireDate);

    return notification;
  } catch (error) {
    console.error('Error in uploadRequestDocuments:', error); // Log the error for debugging
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error');
  }
};

module.exports = {
  getNotifications,
  getReadNotifications,
  uploadRequestDocuments,
};

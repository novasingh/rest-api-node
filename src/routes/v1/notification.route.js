const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const notificationController = require('../../controllers/notification.controller');
const notificationValidation = require('../../validations/notification.validation');

const router = express.Router();

router
  .route('/:userId')
  .get(auth('manage'), validate(notificationValidation.getNotifications), notificationController.getNotifications);

router
  .route('/:notificationId/read')
  .get(auth('manage'), validate(notificationValidation.getReadNotification), notificationController.getReadNotification);

router
  .route('/request-upload')
  .post(auth('manage'), validate(notificationValidation.getRequestDocuments), notificationController.requestUploadDocuments);

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification management and retrieval
 */

/**
 * @swagger
 * /notifications/{userId}:
 *   get:
 *     summary: Get notifications for a user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   message:
 *                     type: string
 *                   documentDescription:
 *                     type: string
 *                   expireDate:
 *                     type: string
 *                     format: date-time
 *                   isRead:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /notifications/{notificationId}/read:
 *   get:
 *     summary: Mark a notification as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         schema:
 *           type: string
 *         required: true
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification marked as read
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /notifications/request-upload:
 *   post:
 *     summary: Request document upload from a driver
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               managerId:
 *                 type: string
 *               driverId:
 *                 type: string
 *               documentName:
 *                 type: string
 *               documentDescription:
 *                 type: string
 *               expireDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Document upload request sent successfully
 *       404:
 *         description: Manager or Driver not found
 *       500:
 *         description: Internal server error
 */

module.exports = router;

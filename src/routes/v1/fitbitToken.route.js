const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const fitbitTokenValidation = require('../../validations/fitbitToken.validation');
const fitbitTokenController = require('../../controllers/fitbitToken.controller');

const router = express.Router();

router
  .route('/:userId')
  .post(auth('manage'), validate(fitbitTokenValidation.saveToken), fitbitTokenController.updateToken)
  .get(auth('get'), validate(fitbitTokenValidation.getToken), fitbitTokenController.getToken);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Fitbit Token
 *   description: Fitbit Token management
 */

/**
 * @swagger
 * /fitbit/{userId}:
 *   post:
 *     summary: Save token in database
 *     tags: [Fitbit Token]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: Fitbit token ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - accessToken
 *               - refreshToken
 *               - user
 *               - type
 *               - expires
 *             properties:
 *               accessToken:
 *                 type: string
 *               refreshToken:
 *                 type: string
 *               user:
 *                 type: string
 *               type:
 *                 type: string
 *               expires:
 *                 type: string
 *               fitbitUserId:
 *                 type: string
 *             example:
 *               accessToken: ABC
 *               refreshToken: ABC
 *               user: 669ac02f47a5543b4c7ba0d6
 *               type: Bearer
 *               expires: 3600
 *               fitbitUserId: CDS451
 *     responses:
 *       '200':
 *         description: Token saved successfully
 *       '400':
 *         description: Invalid request
 *       '401':
 *         description: Unauthorized
 */

/**
 * @swagger
 * /fitbit/{userId}:
 *   get:
 *     summary: Get fitbit tokens
 *     tags: [Fitbit Token]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: Fitbit token ID
 *     responses:
 *       '200':
 *         description: Token retrieved successfully
 *       '400':
 *         description: Invalid request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Token not found
 */
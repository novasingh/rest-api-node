const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { ratingValidation } = require('../../validations');
const { ratingController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(validate(ratingValidation.createRating), ratingController.createRating)
  .get(auth('get'), ratingController.getAllRatings);

router
  .route('/:id')
  .get(auth('get'), validate(ratingValidation.getRating), ratingController.getRatingById)
  .patch(auth('manage'), validate(ratingValidation.updateRating), ratingController.updateRatingById)
  .delete(auth('manage'), validate(ratingValidation.deleteRating), ratingController.deleteRating);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Ratings
 *   description: Rating management
 */

/**
 * @swagger
 * /rating:
 *   post:
 *     summary: Create a new rating
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               rating:
 *                 type: number
 *     responses:
 *       201:
 *         description: Rating created successfully
 *       400:
 *         description: Bad request
 *   get:
 *     summary: Get all ratings
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of ratings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rating'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /rating/{id}:
 *   get:
 *     summary: Get a rating by ID
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Rating ID
 *     responses:
 *       200:
 *         description: Rating found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rating'
 *       404:
 *         description: Rating not found
 *   patch:
 *     summary: Update a rating by ID
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Rating ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               rating:
 *                 type: number
 *     responses:
 *       200:
 *         description: Rating updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Rating not found
 *   delete:
 *     summary: Delete a rating by ID
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Rating ID
 *     responses:
 *       204:
 *         description: Rating deleted successfully
 *       404:
 *         description: Rating not found
 */

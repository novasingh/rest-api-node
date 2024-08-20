const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { documentValidation } = require('../../validations');
const { documentController } = require('../../controllers');

const router = express.Router();

router
  .route('/document/:userId/documents')
  .get(auth('manage'), validate(documentValidation.getDocument), documentController.getDocumentsByUserId);

router
  .route('/document/:userId/documents')
  .post(auth('manage'), validate(documentValidation.uploadDocument), documentController.uploadDocument);

router
  .route('/document/:userId/documents/:documentId')
  .delete(auth('manage'), validate(documentValidation.deleteDocument), documentController.deleteDocument);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Documents
 *   description: Document management
 */

/**
 * @swagger
 * /document/{userId}/documents:
 *   get:
 *     summary: Get all documents by user ID
 *     tags: [Documents]
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
 *         description: List of documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Document'
 */

/**
 * @swagger
 * /document/{userId}/documents:
 *   post:
 *     summary: Upload document
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               fileUrl:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [ID, Driver License, Resume, Vaccination Proof, HR Form, Other]
 *     responses:
 *       201:
 *         description: The uploaded document
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 */

/**
 * @swagger
 * /document/{userId}/documents/{documentId}:
 *   delete:
 *     summary: Delete document
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *       - in: path
 *         name: documentId
 *         schema:
 *           type: string
 *         required: true
 *         description: Document ID
 *     responses:
 *       204:
 *         description: Document deleted
 */
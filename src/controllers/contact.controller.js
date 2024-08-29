const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { contactService } = require('../services');
const pick = require('../utils/pick');

/**
 * Get all contacts
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getAllContacts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await contactService.queryContact(filter, options);
  res.send(result);
});

/**
 * Create a contact
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const createContact = catchAsync(async (req, res) => {
  const contact = await contactService.createContact(req.body);
  res.status(httpStatus.CREATED).send(contact);
});

/**
 * Get contact by id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getContactById = async (req, res) => {
  const contact = await contactService.getContactById(req.params.id);
  res.send(contact);
};

/**
 * Update contact by id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const updateContactById = catchAsync(async (req, res) => {
  const contact = await contactService.updateContactById(req.params.id, req.body);
  res.send(contact);
});

/**
 * Delete contact by id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const deleteContact = async (req, res) => {
  await contactService.deleteContactById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  getAllContacts,
  createContact,
  getContactById,
  updateContactById,
  deleteContact,
};

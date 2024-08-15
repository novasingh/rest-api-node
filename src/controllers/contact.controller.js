const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { contactService } = require('../services');

/**
 * Get all contacts
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getAllContacts = catchAsync(async (req, res) => {
  const contacts = await contactService.getAllContacts();
  if (!contacts) {
    throw new ApiError(httpStatus.NOT_FOUND, 'contacts not found');
  }
  res.status(httpStatus.OK).send(contacts);
});

/**
 * Create a contact
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const createContact = async (req, res) => {
  const contact = await contactService.createContact(req.body);
  res.status(httpStatus.CREATED).send(contact);
};

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
const updateContactById = async (req, res) => {
  const contact = await contactService.updateContactById(req.params.id, req.body);
  res.send(contact);
};

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

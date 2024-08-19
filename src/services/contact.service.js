const httpStatus = require('http-status');
const { Contact } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Get all contacts
 * @returns {Promise<Array>}
 */
const queryContact = async (filter, options) => {
  const contacts = await Contact.paginate(filter, options);
  return contacts;
};

/**
 * Create a contact
 * @param {Object} contactBody
 * @returns {Promise<Company>}
 */
const createContact = async (contactBody) => {
  return Contact.create(contactBody);
};

/**
 * Get contact by id
 * @param {ObjectId} id
 * @returns {Promise<Contact>}
 */
const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Contact not found');
  }
  return contact;
};

/**
 * Update contact by id
 * @param {ObjectId} companyId
 * @param {Object} updateBody
 * @returns {Promise<Company>}
 */
const updateContactById = async (companyId, updateBody) => {
  const contact = await getContactById(companyId);
  Object.assign(contact, updateBody);
  await contact.save();
  return contact;
};

/**
 * Delete contact by id
 * @param {ObjectId} contactId
 * @returns {Promise<Company>}
 */
const deleteContactById = async (contactId) => {
  const contact = await getContactById(contactId);
  await contact.remove();
  return contact;
};

module.exports = {
  createContact,
  updateContactById,
  deleteContactById,
  getContactById,
  queryContact,
};

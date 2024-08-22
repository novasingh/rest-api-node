const httpStatus = require('http-status');
const Document = require('../models/document.model');
const ApiError = require('../utils/ApiError');

const getDocumentsByUserId = async (userId) => {
  return Document.find({ userId });
};

const uploadDocument = async (userId, metadata) => {
  const { name, description, type, fileUrl, expireAt } = metadata;

  const document = new Document({ userId, name, description, fileUrl, type, expireAt });
  await document.save();
  return document;
};

const deleteDocument = async (userId, documentId) => {
  const document = await Document.findOneAndDelete({ userId, _id: documentId });
  if (!document) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Document not found');
  }
  return document;
};

module.exports = {
  getDocumentsByUserId,
  uploadDocument,
  deleteDocument,
};
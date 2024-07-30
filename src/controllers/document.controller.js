const httpStatus = require('http-status');

const catchAsync = require('../utils/catchAsync');
const { documentService } = require('../services');

const getDocumentsByUserId = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const documents = await documentService.getDocumentsByUserId(userId);
  res.status(httpStatus.OK).json(documents);
});

const uploadDocument = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const document = await documentService.uploadDocument(userId, req.body);
  res.status(httpStatus.CREATED).json(document);
});

const deleteDocument = catchAsync(async (req, res) => {
  const { userId, documentId } = req.params;
  await documentService.deleteDocument(userId, documentId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getDocumentsByUserId,
  uploadDocument,
  deleteDocument,
};

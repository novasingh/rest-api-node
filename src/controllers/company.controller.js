const httpStatus = require('http-status');
const companyService = require('../services/company.service');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { uploadService } = require('../services');
const pick = require('../utils/pick');

/**
 * Get all companies
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getAllCompanies = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const companies = await companyService.queryCompanies(filter, options);
  if (!companies) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Companies not found');
  }
  res.status(httpStatus.OK).send(companies);
});

/**
 * Create a company
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const createCompany = async (req, res) => {
  const company = await companyService.createCompany(req.body);
  res.status(httpStatus.CREATED).send(company);
};

/**
 * Get company by id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getCompanyById = async (req, res) => {
  const company = await companyService.getCompanyById(req.params.companyId);
  res.send(company);
};

/**
 * Update company by id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const updateCompanyById = async (req, res) => {
  const company = await companyService.updateCompanyById(req.params.companyId, req.body);
  res.send(company);
};

/**
 * Delete company by id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const deleteCompanyById = async (req, res) => {
  await companyService.deleteCompanyById(req.params.companyId);
  res.status(httpStatus.NO_CONTENT).send();
};

/**
 * Upload a file to S3 and return the file URL
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const uploadLogo = async (req, res) => {
  const logoPath = await uploadService.upload(req, res);
  res.status(httpStatus.CREATED).send({ logoPath });
};

module.exports = {
  getAllCompanies,
  createCompany,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
  uploadLogo,
};

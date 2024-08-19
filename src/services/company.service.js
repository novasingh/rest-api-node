const httpStatus = require('http-status');
const { Company } = require('../models');
const ApiError = require('../utils/ApiError');
const { updateUserById } = require('./user.service');

/**
 * Get all companies
 * @returns {Promise<Array>}
 */
const getAllCompanies = async () => {
  return Company.find().populate('manager');
};

/**
 * Create a company
 * @param {Object} companyBody
 * @returns {Promise<Company>}
 */
const createCompany = async (companyBody) => {
  const company = await Company.create(companyBody);
  if (companyBody.manager) {
    const data = {
      company: company.id,
    };
    await updateUserById(companyBody.manager, data);
  }
  return company;
};

/**
 * Get company by id
 * @param {ObjectId} id
 * @returns {Promise<Company>}
 */
const getCompanyById = async (id) => {
  const company = await Company.findById(id);
  if (!company) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
  }
  return company;
};

/**
 * Update company by id
 * @param {ObjectId} companyId
 * @param {Object} updateBody
 * @returns {Promise<Company>}
 */
const updateCompanyById = async (companyId, updateBody) => {
  const company = await getCompanyById(companyId);
  if (updateBody.manager) {
    const data = {
      company: companyId,
    };
    await updateUserById(updateBody.manager, data);
  }
  Object.assign(company, updateBody);
  await company.save();
  return company;
};

/**
 * Delete company by id
 * @param {ObjectId} companyId
 * @returns {Promise<Company>}
 */
const deleteCompanyById = async (companyId) => {
  const company = await getCompanyById(companyId);
  await company.remove();
  return company;
};

module.exports = {
  createCompany,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
  getAllCompanies,
};

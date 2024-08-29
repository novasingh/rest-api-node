const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { ratingService } = require('../services');

/**
 * Get all rating
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getAllRatings = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await ratingService.queryRating(filter, options);
  res.send(result);
});

/**
 * Create a rating
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const createRating = async (req, res) => {
  const rating = await ratingService.createRating(req.body);
  res.status(httpStatus.CREATED).send(rating);
};

/**
 * Get rating by id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getRatingById = async (req, res) => {
  const rating = await ratingService.getRatingById(req.params.id);
  res.send(rating);
};

/**
 * Update rating by id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const updateRatingById = async (req, res) => {
  const rating = await ratingService.updateRatingById(req.params.id, req.body);
  res.send(rating);
};

/**
 * Delete rating by id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const deleteRating = async (req, res) => {
  await ratingService.deleteRatingById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  getAllRatings,
  createRating,
  getRatingById,
  updateRatingById,
  deleteRating,
};

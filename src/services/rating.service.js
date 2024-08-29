const httpStatus = require('http-status');
const { Rating } = require('../models');
const ApiError = require('../utils/ApiError');
const { updateUserById } = require('./user.service');
const { sendRatingEmail } = require('./email.service');

/**
 * Get all rating
 * @returns {Promise<Array>}
 */
const queryRating = async (filter, options) => {
  options.populate = 'user';
  const rating = await Rating.paginate(filter, options);
  return rating;
};

/**
 * Create a rating
 * @param {Object} ratingBody
 * @returns {Promise<Company>}
 */
const createRating = async (ratingBody) => {
  const existRating = await Rating.findOne({ userId: ratingBody.userId });
  if (existRating) {
    throw new ApiError(httpStatus.ALREADY_REPORTED, 'Rating already exist.');
  }
  const rating = await Rating.create(ratingBody);
  if (ratingBody.rating) {
    const data = {
      rating: rating.userId,
      ratingBefore: true,
    };
    await updateUserById(rating.userId, data);
  }
  await sendRatingEmail(rating);
  return rating;
};

/**
 * Get rating by id
 * @param {ObjectId} id
 * @returns {Promise<Rating>}
 */
const getRatingById = async (id) => {
  const rating = await Rating.findById(id);
  if (!rating) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Rating not found');
  }
  return rating;
};

/**
 * Update rating by id
 * @param {ObjectId} ratingId
 * @param {Object} updateBody
 * @returns {Promise<Company>}
 */
const updateRatingById = async (ratingId, updateBody) => {
  const rating = await getRatingById(ratingId);
  Object.assign(rating, updateBody);
  await rating.save();
  return rating;
};

/**
 * Delete rating by id
 * @param {ObjectId} ratingId
 * @returns {Promise<Company>}
 */
const deleteRatingById = async (id) => {
  const rating = await getRatingById(id);
  await rating.remove();
  const data = {
    rating: null,
    ratingBefore: false,
  };
  await updateUserById(id, data);
  return rating;
};

module.exports = {
  createRating,
  updateRatingById,
  deleteRatingById,
  queryRating,
  getRatingById,
};

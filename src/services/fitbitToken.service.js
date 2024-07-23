const { FitbitToken } = require('../models');

/**
 * Get token by id
 * @param {ObjectId} id
 * @returns {Promise<FitbitToken>}
 */
const getTokenFitbit = async (userId) => {
  return FitbitToken.findOne({ user: userId });
};

/**
 * Update token by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<FitbitToken>}
 */
const updateFitbitTokenById = async (userId, updateBody) => {
  const token = await FitbitToken.findOne({ user: userId });
  if (!token) {
    const newToken = await FitbitToken.create(updateBody);
    return newToken;
  }

  Object.assign(token, updateBody);
  await token.save();
  return token;
};

module.exports = {
  getTokenFitbit,
  updateFitbitTokenById,
};

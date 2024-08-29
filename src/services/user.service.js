const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const name = userBody.name.split(' ');
  userBody.firstName = name[0];
  if (name[1]) {
    userBody.lastName = name[1];
  } else {
    userBody.lastName = 'user';
  }
  userBody.password = 'password1';
  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  options.populate = 'company, rating'
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id).populate('company');
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email }).populate('company');
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId, loggedUser) => {
  const userToDelete = await getUserById(userId);

  if (!userToDelete) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (loggedUser.email === 'admin@healmefit.io') {
    throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to delete this admin');
  }

  // Admin can delete any user
  if (loggedUser.role === 'admin') {
    await userToDelete.remove();
    return userToDelete;
  }

  // Manager can only delete drivers
  if (loggedUser.role === 'manager' && userToDelete.role === 'driver') {
    await userToDelete.remove();
    return userToDelete;
  }

  // If the requester is a driver or trying to delete an admin/manager
  throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to delete this user');
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};

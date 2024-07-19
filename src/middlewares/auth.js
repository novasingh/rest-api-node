const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;

  console.log(requiredRights)

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role);
    console.log('User Right:', userRights)
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    console.log('hasRequiredRights:', hasRequiredRights)
    console.log('req.params.userId', req.params.userId)
    console.log('user.id', user.id)
    if (!hasRequiredRights ) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

const auth = (...requiredRights) => async (req, res, next) => {
  console.log('req', req)
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;

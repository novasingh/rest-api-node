const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { fitbitTokenService } = require('../services');

const getToken = catchAsync(async (req, res) => {
  const user = await fitbitTokenService.getTokenFitbit(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tokens not found');
  }
  res.send(user);
});

const updateToken = catchAsync(async (req, res) => {
  const user = await fitbitTokenService.updateFitbitTokenById(req.params.userId, req.body);
  res.send(user);
});

module.exports = {
  getToken,
  updateToken,
};

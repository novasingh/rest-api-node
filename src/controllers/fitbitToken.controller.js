const catchAsync = require('../utils/catchAsync');
const { fitbitTokenService } = require('../services');

const getToken = catchAsync(async (req, res) => {
  const user = await fitbitTokenService.getTokenFitbit(req.params.userId);
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

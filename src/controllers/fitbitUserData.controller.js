const httpStatus = require('http-status');
const { fitbitUserDataService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const syncFitbitDataController = catchAsync(async (req, res) => {
  await fitbitUserDataService.syncFitbitData();
  res.status(httpStatus.OK).send(`Fitbit data synchronized successfully - ${new Date().toISOString()}`);
});

module.exports = {
  syncFitbitDataController,
};

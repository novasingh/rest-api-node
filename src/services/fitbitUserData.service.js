/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const axios = require('axios');
const { FitbitUserData, FitbitToken, Logs } = require('../models');
const { fitBitClientId, fitBitClientSecret } = require('../config/config');

// Function to refresh the Fitbit token
const refreshFitbitToken = async (token) => {
  try {
    const response = await axios.post('https://api.fitbit.com/oauth2/token', {
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
      client_id: fitBitClientId,
      client_secret: fitBitClientSecret,
    });

    token.accessToken = response.data.access_token;
    token.refreshToken = response.data.refresh_token;
    token.expires = new Date(Date.now() + response.data.expires_in * 1000);
    await token.save();
    return token;
  } catch (error) {
    await Logs.create({
      user_id: token.user_id,
      action: 'Refresh Fitbit Token',
      status: 'ERROR',
      message: error.message,
    });
    throw error;
  }
};

// Function to fetch Fitbit data
const fetchFitbitData = async (token) => {
  try {
    const headers = { Authorization: `Bearer ${token.accessToken}` };
    const [profileResponse, stepsResponse, heartResponse, activityResponse, sleepResponse] = await Promise.all([
      axios.get(`https://api.fitbit.com/1/user/${token.fitbitUserId}/profile.json`, { headers }),
      axios.get(`https://api.fitbit.com/1/user/${token.fitbitUserId}/activities/steps/date/today/1d.json`, { headers }),
      axios.get(`https://api.fitbit.com/1/user/${token.fitbitUserId}/activities/heart/date/today/1d.json`, { headers }),
      axios.get(`https://api.fitbit.com/1.2/user/${token.fitbitUserId}/sleep/date/today.json`, { headers }),
    ]);
    return {
      profile: profileResponse.data,
      steps: stepsResponse.data,
      heart: heartResponse.data,
      activity: activityResponse.data,
      sleep: sleepResponse,
    };
  } catch (error) {
    await Logs.create({
      user_id: token.user_id,
      action: 'Fetch Fitbit Data',
      status: 'ERROR',
      message: error.message,
    });
    throw error;
  }
};

// Function to synchronize Fitbit data for all users
const syncFitbitData = async () => {

  const fitbitTokens = await FitbitToken.find();

  for (const token of fitbitTokens) {
    try {
      if (new Date() >= token.expires_at) {
        await refreshFitbitToken(token);
      }

      const data = await fetchFitbitData(token);
      await FitbitUserData.create({
        user_id: token.user,
        profile: data.profile,
        steps: data.steps,
        heart: data.heart,
        activity: data.activity,
        sleep: data.sleep,
      });

      await Logs.create({
        user_id: token.user_id,
        action: 'Sync Fitbit Data',
        status: 'success',
        message: 'Data synced successfully',
      });
    } catch (error) {
      await Logs.create({
        user_id: token.user_id,
        action: 'Insert Data in DB',
        status: 'ERROR',
        message: 'Data synced failed',
      });
    }
  }
};

module.exports = {
  refreshFitbitToken,
  fetchFitbitData,
  syncFitbitData,
};

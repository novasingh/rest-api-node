const mongoose = require('mongoose');

const userFitbitDataSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    profile: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    device: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    steps: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    activity: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    sleep: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    heart: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FitbitUserData', userFitbitDataSchema);

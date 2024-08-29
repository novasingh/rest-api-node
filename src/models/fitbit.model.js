const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const fitbitTokenSchema = mongoose.Schema(
  {
    accessToken: {
      type: String,
      required: true,
      index: true,
    },
    refreshToken: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    expires: {
      type: String,
      required: true,
    },
    fitbitUserId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
fitbitTokenSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const Token = mongoose.model('FitbitToken', fitbitTokenSchema);

module.exports = Token;

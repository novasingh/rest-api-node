const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const logSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  action: { type: String, required: true },
  status: { type: String, enum: ['SUCCESS', 'ERROR'], required: true },
  message: { type: String, required: true },
});

logSchema.plugin(toJSON);

module.exports = mongoose.model('Log', logSchema);

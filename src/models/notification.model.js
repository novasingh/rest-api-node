const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const { Schema } = mongoose;

const notificationSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// add plugin that converts mongoose to json
notificationSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;

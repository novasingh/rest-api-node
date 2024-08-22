const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  expireAt: { type: String },
  type: { type: String, enum: ['ID', 'Driver License', 'Resume', 'Vaccination Proof', 'HR Form', 'Other'], required: true },
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;

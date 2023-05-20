const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  // Add any other relevant fields for the club profile
});

module.exports = mongoose.model('Club', clubSchema);
const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
  fullName: {
    type: String
  },
  emailAddress: {
    type: String
  },
  mobileNumber: {
    type: String
  },
  subject: {
    type: String
  },
  text: {
    type: String
  }
}).set('timestamps', true);

module.exports = mongoose.model('connections', connectionSchema);

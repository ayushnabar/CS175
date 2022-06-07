const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  roomID: {
      type: String,
      required: true
  },
  message: {
    type: String,
    required: true
  }
});
module.exports = Item = mongoose.model('message', MessageSchema);
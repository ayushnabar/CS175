const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    dropDups: true
  },
  age: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
module.exports = Item = mongoose.model('user', UserSchema);

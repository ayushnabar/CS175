const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MealSchema = new Schema({
  mealName: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  cuisine: {
      type: String,
      required: true
  },
  username: {
      type: String,
      required: true
  },
  date: {
    type: Date,
    required: true
  }
});
module.exports = Item = mongoose.model('meal', MealSchema);
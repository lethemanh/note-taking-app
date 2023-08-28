const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
  name: {
    type: String,
    requierd: true,
  },
  email: {
    type: String,
    requierd: true,
    unique: true,
  },
  password: {
    type: String,
    requierd: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model('user', UserSchema); // 1st arguemnt is thse name that you want the model name to be and 2nd is the schema name
//User.createIndexes();// to ensure that no same user with same login credentials register twice
module.exports = User;

const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
  user: {
    // so that the notes can be assocaited to the particular user
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
    requierd: true,
  },
  description: {
    type: String,
    require: true,
  },
  tag: {
    type: String,
    requierd: true,
    default: 'General',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('notes', NotesSchema); // 1st arguemnt is thse name that you want the model name to be and 2nd is the schema name

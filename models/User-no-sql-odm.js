const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
  ],
});

module.exports = mongoose.model('User', userSchema);

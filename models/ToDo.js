const mongoose = require('mongoose');

const ToDo = mongoose.Schema({
  title: {
    type: String,
    validate: {
      validator: (val) => /^(\w|\s|[0-9]){1,100}$/.test(val),
      message: 'Title must be 1-100 length.'
    },
    required: true
  },
  listItems: [{
    title: {
      type: String,
      required: true
    },
    isCompleted: {
      type: Boolean,
      default: false
    }
  }]
});

module.exports = mongoose.model('ToDo', ToDo);

const mongoose = require('mongoose');
const { Schema } = mongoose

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true
  },
  priority: {
    type: Boolean,
    required: false
  },
  reminder: {
    type: Boolean,
    required: false
  }
})
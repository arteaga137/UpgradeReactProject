const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);

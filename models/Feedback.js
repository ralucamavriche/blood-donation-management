const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const FeedbackSchema = new Schema({
  rating: {
    type: String,
    required: true,
  },
  typeOfFeedback: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = Feedback = mongoose.model("feedback", FeedbackSchema);

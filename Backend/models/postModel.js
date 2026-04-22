const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    savedBy: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Post", postSchema);
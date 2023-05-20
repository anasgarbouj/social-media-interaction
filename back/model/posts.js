const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userLogo: String,
  clubName: String,
  postTime: String,
  imageUrl: String,
  videoUrl: String,
  content: String,
  sharesCount: Number,
  comments: [
    {
      text: String,
      showOptions: Boolean,
      editing: Boolean,
    },
  ],
  likesCount: Number,
  liked: Boolean,
  showOptions: Boolean,
});

module.exports = mongoose.model('Post', postSchema);
const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }, 
  post: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", 
    required: true 
  },
  action: { 
    type: String, 
    enum: ['like', 'dislike'], 
    required: true 
  }
});

const Like = mongoose.model('Like', likeSchema); 
module.exports = Like;

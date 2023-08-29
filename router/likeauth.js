const express = require('express');
const Post = require('../model/postschema'); 
const Like = require('../model/likeschema');
const router = express.Router();

router.put('/posts/:postId/like', async (req, res) => {
  try {
    const postId = req.params.postId;
    const { userId, action } = req.body;

    if (action !== 'like' && action !== 'dislike') {
      return res.status(400).json({ error: 'Invalid action' });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const newLike = await Like.create({
      post: postId,
      user: userId,
      action: action
    });

    if (action === 'like') 
    {
      post.likes += 1;
    } 
    else 
    {
      post.likes -= 1;
    }

    await post.save();
    res.status(200).json({ message: 'Action successfully applied', post });
  
  } catch (error) {
    res.status(500).json({ error: 'Error performing action' });
  }
});

module.exports = router;

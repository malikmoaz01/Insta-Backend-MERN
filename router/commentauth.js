const express = require('express');
const Comment = require('../model/commentschema'); 
const Post = require('../model/postschema'); 
const router = express.Router();

router.post('/posts/:postId/comments', async (req, res) => {
  try {
    const postId = req.params.postId;
    const { content, userId } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const newComment = await Comment.create({
      content,
      user: userId,
      post: postId
    });

    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    res.status(500).json({ error: 'Error adding comment'});
  }
});

module.exports = router;

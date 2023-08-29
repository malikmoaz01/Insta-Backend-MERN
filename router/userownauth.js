const express = require('express');
const router = express.Router();
const Post = require('../model/postschema');
const User = require('../model/userschema');

router.get('/posts/user/:userId', async (req, res) => {
  try {

    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User does not exist' });
    }

    const userPosts = await Post.find({ author: userId });
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving user-owned posts' });
  }
});

module.exports = router;

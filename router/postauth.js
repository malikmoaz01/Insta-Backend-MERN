const express = require('express');
const router = express.Router();
const Post = require('../model/postschema'); 

router.post('/posts' , async (req, res) => {
    try {
        if (!req.body.title || !req.body.content || !req.body.author) {
            return res.status(400).json({ error: "Please Fill the fields properly" });
        }
        
        const userId = req.body.author;
        
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            author: userId
        });
        
        const savedPost = await newPost.save();
        res.json(savedPost);
        
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Internal Error" });
    }
});

// Get All Posts
router.get('/post' , async (req,res) => {

    
    try
    
    {

        const post = await Post.find();

        res.json(post);
    
    }
    catch(err)
    {

        res.status(501).json({error : "Error"});
    
    }
})

// Post Specific Post By id 
router.get('/posts/:id' , async (req , res ) => {

    try{

    const post = await Post.findById(req.params.id);

    if (!post) 
    
    {
        return res.status(404).json({ error: 'Post not found' });
    }
    
    res.status(200).json(post);
    
    }catch(err)
    
    {
        res.status(500).json({error : "Internal Error"})
    }

})

// Update the post
router.put('/posts/:id' , async (req,res) => {

    try {

    const post = await Post.findByIdAndUpdate(req.params.id , req.body);

    if(!post)

    {

        res.status(404).json({error : "Post Does Not Find"});

    }
    else 

    {

        const update_post = await Post.findById(req.params.id);
        res.json(update_post);
    }

    }catch(err)

    {
        res.status(500).json({error : "Internal Error"});
    }
})

// Delete The post 
router.delete('/posts/:id' , async (req,res) => {

    const post = await Post.findByIdAndDelete(req.params.id);

    try

    {
    
    if(!post)

    {
        return res.status(200).json({ message: "Post doesnt Exist" });
    }

    else {

    res.status(200).json({ message: "Post Deleted Successfully" });
    
    }

    } catch (err) {

    console.error("Error:", err);
    res.status(500).json({ error: "Internal Error" });

    }
})

module.exports = router;
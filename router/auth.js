const jwt = require('jsonwebtoken')
const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router();
const User = require('../model/userschema'); 
// const sendMail = require('../controllers/sendMail');

// CRUD OPERATIONS 1(b)


router.post('/users', async (req, res) => {

    try {

    if (!req.body.username || !req.body.email || !req.body.password || !req.body.cpassword) 
    {

        return res.status(400).json({ error: "Please Fill All Fields" });
    
    }

    if (req.body.password !== req.body.cpassword)

    {
    
        return res.status(400).json({ error: "Both Passwords should be matched " });
    
    }

    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) 

    {
    
        return res.status(422).json({ error: "User with that email already exists" });
    
    }

    const user_new = new User(req.body);
    const save_user = await user_new.save();
    res.json(save_user);

    } catch (err) {
        console.error("User creation error:", err);
        res.status(400).json({ error: "Doesnt Make New User" });
    }
});




// router.post('/users', async (req, res) => {
//     try {

//       if (!req.body.username || !req.body.email || !req.body.password || !req.body.cpassword) {
//         return res.status(400).json({ error: "Please Fill All Fields" });
//       }
  
//       if (req.body.password !== req.body.cpassword) {
//         return res.status(400).json({ error: "Both Passwords should be matched " });
//       }
  
//       const userExist = await User.findOne({ email: req.body.email });
  
//       if (userExist) 
//       {
//         return res.status(422).json({ error: "User with that email already exists" });
//       }
  
//       const user_new = new User(req.body);
//       const save_user = await user_new.save();
  
//       // Send registration email
//       console.log(save_user.email);
//       try {
//         const emailSent = await sendMail(save_user.email);
//         console.log("emailsent", emailSent);
//         if (!emailSent) {
//           return res.status(500).json({ error: "Failed to send registration email" });
//         }
//       } catch (emailError) {
//         console.error("Email sending error:", emailError);
//         return res.status(500).json({ error: "Failed to send registration email" });
//       }
  
//       res.json(save_user);
  
//     } catch (err) {
//       console.error("User creation error:", err);
//       res.status(400).json({ error: "Doesnt Make New User" });
//     }
//   });




router.get('/user' , async (req,res) => {

    try{

        const users = await User.find();
        res.json(users);
    
    }
    catch(err)
    {
        res.status(501).json({error : "Error"});
    }
})

// USER GET BY ID Number
router.post('/users/:id' , async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        
        if(!user)
        {
            res.status(404).json({error : "User Does Not Find"});
        }
        else{
            res.status(200).json({message : "User Find"});
        }
        res.json(user);
    }catch(err)
    {
        res.status(500).json({error : " Internal Error"})
    }
})

// USER UPDATE 
router.put('/users/:id' , async (req,res) => {

    try {

    const user = await User.findByIdAndUpdate(req.params.id , req.body);

    if(!user)

    {

        res.status(404).json({error : "User Does Not Find"});

    }
    else 

    {

        const update_user = await User.findById(req.params.id);
        res.json(update_user);
    
    }

    }catch(err)

    {
    
        res.status(500).json({error : "Internal Error"});
    
    }
})

router.delete('/users/:id', async (req, res) => {

    try {

    

    const user = await User.findByIdAndDelete(req.params.id);

    if(!user)

    {
        return res.status(200).json({ message: "User doesnt Exist" });
    }

    else {

    res.status(200).json({ message: "User Deleted Successfully" });
    
    }

    } catch (err) {

    console.error("Error:", err);
    res.status(500).json({ error: "Internal Error" });

}
});





// Login Api Route
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) 
    {

      return res.status(400).json({ error: "Please Fill The Data Properly" });

    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) 
    
    {
    
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (isMatch) 

      {

        const token = jwt.sign({ _id: userLogin._id }, 'yourSecretKeyHere'); 

        userLogin.tokens = userLogin.tokens.concat({ token });
        await userLogin.save();

        res.cookie("jwttoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true
        });

        return res.json({ message: "User Logged in Successfully" });
      } 
      else 
    {
        return res.status(400).json({ error: "Password doesn't Match" });
    }
    } 

    else 
    
    {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
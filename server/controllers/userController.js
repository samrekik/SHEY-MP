const User = require("../models/userModel");
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')
module.exports.userController={
    register:async(req,res)=>{
        const{name,email,password}=req.body;
        
        try {
            const existUser=await User.findOne({email})
        if(existUser)
            return res.status(401).json({message:"email already exist"})
        const salt=await bcrypt.genSalt(10)
        const hash=await bcrypt.hash(password,salt)
        req.body.password=hash
        const user=await User.create(req.body)
        return res.status(201).json({
          success: true,
          message: "User registered successfully",
          user
        });
        } catch (error) {
          res.status(401).json({ success: false, error: error.message });
        }
    },
    login:async(req,res)=>{
        const{email,password}=req.body;
        
        try {
            const user=await User.findOne({email})
        if(!user)
            return res.status(401).json({message:"email or pwd  not valid "})
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res
            .status(404)
            .json({ message: "Invalid pwd or email" });
        }
        const payload = {
          userId: user._id,
         
         
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        return res.status(200).json({
          success: true,
          message: "Logged in successfully",
          token,
          payload
        });
        } catch (error) {
          res.status(401).json({ success: false, error: error.message });
        }
    },
    currentUser:async(req,res)=>{
      try {
        const user=await User.findById(req.userId)
        res.send({success:true,message:"user fetched successfully",
          data:user
        })
      } catch (error) {
        res.status(401).json({ success: false, error: error.message });
      }
    }
}
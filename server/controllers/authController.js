
import generateToken from "../config/generatetoken.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";



export const signup = async(req,res)=>{
    try {
       const { username,email,password,role } = req.body;
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     
       if(!username  || !password || !email){
           return res.status(400).json({message:"All fields are required"});
       }

       if(!emailRegex.test(email)){
           return res.status(400).json({message:"Invalid email format"});
       }

       const alreadyExistUser = await User.findOne({email})

       if(alreadyExistUser){
           return res.status(400).json({message:"User already exists"});
       }

       if(password.length < 6){
           return res.status(400).json({message:"Password must be at least 6 characters"});
       }

       const salt = bcrypt.genSaltSync(10);
       const hashedPassword = bcrypt.hashSync(password,salt);

       const newUser = new User({
           username,
           email,
           password:hashedPassword,
           role
       })
       
       if(newUser){   
       await newUser.save();

       const token = generateToken(newUser._id);
       res.cookie("jwt",token,{maxAge:15*24*60*60*1000,
           httpOnly:true,
           sameSite:"strict",
           secure:process.env.NODE_ENV !== "development"
       }).status(201).json({message:"User created successfully"});
       }
      

    } catch (error) {
       res.status(500).json({message:"Internal Server Error"});
    }
}

export const login = async(req,res)=>{
    try {
       const {email,password} = req.body;

       if(!email || !password){
           return res.status(400).json({message:"All fields are required"});
       }

       const validuser = await User.findOne({email})

       if(!validuser){
           return res.status(400).json({message:"User does not exist"});
       }

       const passwordMatch = bcrypt.compareSync(password,validuser.password);
       
       if(!passwordMatch){
           return res.status(400).json({message:"Invalid password"});
       }

       if(passwordMatch){
           const token = generateToken(validuser._id);
           res.cookie("jwt",token,{maxAge:15*24*60*60*1000,
               httpOnly:true,
               sameSite:"strict",
               secure:process.env.NODE_ENV !== "development"
           }).status(200).json({message:"User logged in successfully"});
       }

    } catch (error) {
       res.status(500).json({message:"Internal Server Error"});
    }
}

export const logout = async(req,res)=>{
    try {
       res.cookie("jwt","",{maxAge:0}).status(200).json({message:"User logged out successfully"});
    } catch (error) {
       res.status(500).json({message:"Internal Server Error"});  
    }
}
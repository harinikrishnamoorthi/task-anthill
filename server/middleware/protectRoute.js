

import jwt from "jsonwebtoken"
import User from "../models/userModel.js";


const protectRoute = async(req,res,next) =>{
  try {
    const token = req.cookies.jwt;
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    const isvalidUser = jwt.verify(token,process.env.JWT_SECRET);
    if(!isvalidUser){
        return res.status(401).json({message:"Unauthorized"});
    }

    const userData = await User.findById(isvalidUser.id).select("-password");

    if(!userData){
        return res.status(401).json({message:"Unauthorized"});
    }

    req.user = userData;
    next();
  } catch (error) {
    return res.status(500).json({message:"internal server error"});
  }


}


export default protectRoute;
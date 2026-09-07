import {Request,Response} from "express";
import User from "../model/User.js";
import jwt  from "jsonwebtoken";
import tryCatch from "../middlewhere/trycatch.js";
import { AuthenticatedRequest } from "../middlewhere/isauth.js";
import { oauth2client } from "../config/googleConfig.js";
import axios  from "axios"
export  const  loginUser = tryCatch(async(req,res)=>{
  const { code } = req.body as { code?: string };
  if(!code){
    return res.status(400).json({message:"Authorization code is required"});

  }

  // const {tokens} = await oauth2Client.getToken(code)
  const googleRes = await oauth2client.getToken(code);
  oauth2client.setCredentials(googleRes.tokens);

  const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`);

  
  
  
  const {name,email,picture} = userRes.data;





     const user = await User.findOne({email});
     if(!user){
      let  user = await User.create({
        name,
        email,
        image: picture
       });
      
     }
     const token = jwt.sign({user},process.env.JWT_SECRET as string,{expiresIn: "1d"});
     res.status(200).json({message: "Login successfull",token,user});
     

}
);
// by this  identifiy role
 const allowedRoles =[" rider","customer","seller"];
 type Role = (typeof allowedRoles)[number];
 export const addUserRole = tryCatch(async(req:AuthenticatedRequest,res:Response)=>{
if(!req.user?._id){
  return res.status(401).json({message: "unauthorization"});



}
const {role} = req.body as {role: Role};
// check if the  role is valid
if(!allowedRoles.includes(role)){
  return res.status(400).json({message: "Invalid role"});
}
//  user  find by id and updates 
const user = await User.findByIdAndUpdate(req.user._id,{role},{new:true});
// if user not found 

if(!user){
  return res.status(404).json({message: "user not found "});

}
// token 
const token = jwt.sign({user},process.env.JWT_SECRET as string,{expiresIn: "1d"});
 res.json({user,token});


 })
       
// fetch profile 
export const fetchProfile = tryCatch(async(req:AuthenticatedRequest,res)=>{
  const user = await User.findById(req.user?._id);
  if(!user){
    return res.status(404).json({message: "user not found"});
  
  }
  res.json({user});
})

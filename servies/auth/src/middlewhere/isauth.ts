import {Request,Response,NextFunction} from "express";
import jwt ,{JwtPayload} from "jsonwebtoken"
import {IUser} from "../model/User.js"
import { remotebuildexecution } from "googleapis/build/src/apis/remotebuildexecution/index.js";

export interface AuthenticatedRequest extends  Request{
    user?:IUser  | null;
}

export const isAuth = async(
     req:AuthenticatedRequest, 
     res:Response,
    next: NextFunction):
Promise<void> =>{
    try{
        // check if the request has an authorizattion present in the  request  hearder
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        res.status(401).json({message: "Please login -no auth header "});
        return;
    }
    const token = authHeader.split(" ")[1];
    if(!token){
        res.status(401).json({message: "please login - no token "});
        return;
    }
    // verify the token 

    const decodedValue = jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload;
    if(!decodedValue || !decodedValue.user){
        res.status(401).json({message: "Please login - invalid token "});
        return;
    }
    req.user = decodedValue.user;
    next();
    



    }catch(error){
        res.status(401).json({message: "Please login - invalid token "});
    }

}
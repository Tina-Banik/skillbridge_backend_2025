const jwt = require("jsonwebtoken");
import { Request,Response,NextFunction } from "express";
import { config } from "../types/type";
// verifying the access token
export const verifyAccessToken = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const access_key = config.accessKey;
        console.log("the access key  that presents in the .env file:", access_key);
        if(access_key){
            const access_token = req.headers._accessToken || req.cookies.accessToken;
            console.log("The access token in headers file:", access_token);
            if(!access_token){
                return res.status(401).json({success:true,message:"The auth header is missing.."})
            }
            const decodedToken = jwt.verify(access_token,access_key);
            console.log("the decode token is :", decodedToken);
            (req as any).user  = decodedToken;
            console.log("The req user object is :",   (req as any).user);
        }
         next();
    } catch (error) {
        console.error("Error during the verifying the access token:", error);
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}
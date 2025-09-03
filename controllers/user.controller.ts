import { Request,Response } from "express"
import prismaClient from "../db/db.connection";
import {hashSync,compareSync} from "bcrypt"; 
import { create_accessToken, create_refreshToken } from "../middlewares/jwt.middleware";
// Here I write the code for the user admin register
export const register= async(req:Request,res:Response)=>{
    try {
        const {username,email,password,role} = req.body;
        console.log(`The username is : ${username}, email:${email}, password:${password},role:${role}`);
        
        const userExists = await prismaClient.user.findFirst({
            where:{email:email}
        });
        if(userExists){
            console.log("The user is already registered with us", userExists);
            return res.status(401).json({success: false,message:"The user is already registered with us"})
        }
        // here the code is for the hash the passwords
        const newUser = await prismaClient.user.create({
            data:{
                username,
                email,
                password: hashSync(password,10),
                role:role?.toUpperCase()==="ADMIN" ? "ADMIN": "USER"
            }
        });
        console.log("The new user is :", newUser);
        if(newUser){
            return res.status(200).json({success:true,email:newUser.email,message:`${newUser.username} is registered successfully..`})
        }else{
            return res.status(500).json({success:false,message:"The data is not valid.."})
        }
    } catch (error) {
        console.error("Error comes during the register:", error);
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}
//Here I write the code for the login register
export const login = async(req:Request,res:Response)=>{
    // return res.status(200).json({success:"User is logged in successfully.."})
    try {
        const {username,email,password} = req.body;
        console.log(`The username is : ${username} and email is: ${email} and password: ${password}`);
        if(!(username || email)){
            return res.status(401).json({success:false,message:"Username or email is required"});
        }
        // if the user is valid or not
        const validUser = await prismaClient.user.findFirst({
            where:{
                OR:[
                    {username:username},
                    {email:email},
                ]
            }
        });
        if(!validUser){
            return res.status(500).json({success:false,message:"The user is not valid."})
        }
        console.log("The valid user is :", validUser);
        console.log("The user who valid for that password is:", validUser?.password);
        if(!compareSync(password,validUser.password)){
            return res.status(500).json({success:false,message:"Invalid User Credentials!!"})
        }
        //if the user is valid we logged the user
        const loggedUser = await prismaClient.user.findUnique({
            where:{
                id:validUser.id
            }
        });
        console.log("the logged user is ", loggedUser);
        //if the user is logged in we create an access token
        const accessToken = await create_accessToken(loggedUser?.id,loggedUser?.email,loggedUser?.role);
        console.log("The access token creation for the valid user is:", accessToken);
        const refreshToken = await create_refreshToken(loggedUser?.id,loggedUser?.email);
        console.log("the refresh token creation for the valid user is:", refreshToken);
        const options = {
            httpOnly:true,
            secure:true,
            maxAge:20*1000
        }
        return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,{httpOnly:true,secure:true,maxAge:2*60*1000}).json({success:true,name:loggedUser?.username,_accessToken:accessToken,_refreshToken:refreshToken,message:`${loggedUser?.username} is logged in successfully..`})
    } catch (error) {
        console.error("Error during the login:", error);
        return res.status(500).json({success:false,message:"Internal server error"})
    }

}

// Here I show the all the users
export const showUser = async(req:Request,res:Response)=>{
    const user = (req as any).user;
     if (!user || !user.id || !user.email) {
        return res.status(400).json({ success: false, message: "User data missing from token" });
    }
    return res.status(200).json({success:true,id:user.id,message:`${user.email} is your current email id`})
}
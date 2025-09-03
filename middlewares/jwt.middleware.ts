const jwt = require("jsonwebtoken");
const crypto = require('crypto');
import { config } from "../types/type";
function generateRandomToken(length:any){
    return crypto.randomBytes(length).toString('hex');
}
/**create an access token */
const access_key = config.accessKey || generateRandomToken(64);
export const create_accessToken = async(id:any,email:any,role:any)=>{
    console.log("The access key while the valid user is logged in:", access_key);
    if(access_key){
        const access_token = jwt.sign({
            id:id,email:email,role : role?.toUpperCase()==="ADMIN" ? "ADMIN": "USER"
        },access_key,{expiresIn:config.accessKeyExpire});
        return access_token;
    }
}

/**create an refresh token */
const refresh_key = config.refreshKey || generateRandomToken(64);
export const create_refreshToken = async(id:any,email:any)=>{
    console.log("The refresh key while the valid user is logged in:", refresh_key);
    if(refresh_key){
        const refresh_token = jwt.sign({
            id:id,email:email},refresh_key,{expiresIn:config.refreshKeyExpire});
        return refresh_token;
    }
}
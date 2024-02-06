import express ,{Request,Response}from 'express'
export const signupRouter=express.Router()
import { UserData, saveUserData } from '../mongoose/model/userModel'

const checkUserAlreadyExist=async(email:string)=>{
const users=await UserData.find({email})
return users
}

const handleUserSignup=async(req:Request,res:Response)=>{
    const {email}=req.body;
    console.log(email)
    try{
 const alreadyExistedUserWithSameEmail =await checkUserAlreadyExist(email)
    console.log(alreadyExistedUserWithSameEmail)
   if(alreadyExistedUserWithSameEmail.length===0){
        const data= await saveUserData(req.body)
if(data){res.send({status:"success",message:"successfully signed up"})}
   }else{
    res.send({status:"error",message:"user with email alredy exist try login"})
   }
    } catch(err){
        res.send({status:"error",message:"something went wrong"})
    }
   

}

signupRouter.post('/',handleUserSignup)
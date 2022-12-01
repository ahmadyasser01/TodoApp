import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import {promisify} from "util"
import asyncHandler from "express-async-handler"


const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_TOKEN,{
        expiresIn:60*60
    })
}
const sendToken = (user,statusCode,res)=>{

    const token = createToken(user._id);

    return res.status(201).json({user,token})

}
export const signup = asyncHandler(async (req,res,next)=>{

    const {username,email,password} = req.body;

    const newUser = await User.create({
        username,
        email,
        password
    })
    if(!newUser) return res.status(400).json({error:"error creating user"});

    return sendToken(newUser,201,res)


})

export const login = asyncHandler(async (req,res,next)=>{

    const {email,password} = req.body;

    if(!email || !password) {
        throw new Error("Please provide email and password")
    }

     // FIND USER BY EMAIL
     const user = await User.findOne({email}).select('+password')

    // FIND USER BY EMAIL
     if(!user) throw new Error("No such user")

     if(!user || ! (await user.correctPassword(password,user.password))) {
        throw new Error("Invalid email or password")
    }

    // found a user generate token now
    return sendToken(user,201,res);

})
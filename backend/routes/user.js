const express=require("express");
const zod=require("zod");
const { User } = require("../db");
const { jwt } = require("jsonwebtoken");
import {JWT_SECRET} from "..config/"
import { authMiddleware } from "../middleware";
const router=express.Router();

const signupBody=zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

router.post("/signup", async (req,res)=>{
    
    const {success}=signupBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Email already taken / Incorrect inputs"
        })
    }
    const existingUsers=await User.findOne({
        username: req.body.username
    })
    if(existingUsers){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    //everythis is fine
    const user=await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    const userID=user._id;

    const token=jwt.sign({
        userID
    },JWT_SECRET);

    res.json({
        message: "user created successfully",
        token: token
    })
})

const signinSchema=zod.object({
    username: zod.string().email(),
    password: zod.string()
})

//-------------------------------------------------------------------------


router.post("/signin", authMiddleware, async (req,res)=>{
    
    const success=signinSchema.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message: "Error while loggin in"
        })
    }

    const user=await User.findOne({
        username: req.body.username,
        password: req.body.password
    })
    if(!user){
        res.status(411).json({
            message: "Error while logging in"
        })
    }
    const token=jwt.sign({
        userID: user._id
    }, JWT_SECRET);
    res.json({
        token: token
    })
})

module.exports=router;

//-------------------------------------------------------------------

const newDetails=zod.onject({
    username: zod.string().optional(),
    firstname: zod.string().optional(),
    lastName: zod.string().optional()

})

router.put("/", authMiddleware, async (req,res)=>{
    const {success}=newDetails.safeParse(req.body);
    if(!success){
        res.status(411).json({message: "error while updating information"})
    }
    await User.updateOne(req.body,{
        _id: req.userID
    })
    res.json({message: "Updated successfully"})
})
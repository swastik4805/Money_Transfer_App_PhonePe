const express=require("express");
const zod=require("zod");
const router=express.Router();
const { User, Account } = require("../db");
// const jwt = require('jsonwebtoken');
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config");
const { authMiddleware } =require("../middleware");


const signupBody = zod.object({
    username: zod.string(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

router.post("/signup", async (req, res) => {
    console.log(req.body)
    const { success } = signupBody.safeParse(req.body)
    console.log(success);
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1000
    })
    // console.log(JWT_SECRET)
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})

const signinSchema=zod.object({
    username: zod.string().email(),
    password: zod.string()
})

//-------------------------------------------------------------------------


router.post("/signin", async (req,res)=>{
    // console.log(req);
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
    // console.log(user);
    if(!user){
        return res.status(411).json({
            message: "Error while logging in"
        })
    }
    const token=jwt.sign({
        userId: user._id
    }, JWT_SECRET);
    res.json({
        token: token
    })
})


//-------------------------------------------------------------------

const newDetails=zod.object({
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
        _id: req.userId
    })
    res.json({message: "Updated successfully"})
})


router.get("/bulk", async (req,res)=>{
    const filter=req.query.filter || "";
    // console.log(req.query)
    const users=await User.find({
        $or:[{
            firstName:{"$regex": filter}
        },{
            lastName: {"$regex": filter}
        }]
    })

    res.json({
        user: users.map(x=>({
            firstName: x.firstName,
            username: x.username,
            password: x.password,
            lastName: x.LastName,
            _id: x._id
        })) 
    })
})

module.exports=router;
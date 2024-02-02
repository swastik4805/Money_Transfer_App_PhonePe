const express=require("express");
const {Account, User}=require("../db")
const { authMiddleware } = require("../middleware");
const { default: mongoose } = require('mongoose');

const router=express.Router();

router.get("/balance", authMiddleware , async (req,res)=>{
    // console.log(req);
    //here the middleware populates the req with the userId with the help the authorization header.
    const account=await Account.findOne({
        userId: req.userId
    })
    // console.log(account)

    if(!account){
        return res.json({message: "User not found"});
    }

    res.json({
        balance: account.balance
    })
})


router.post("/transfer", authMiddleware, async (req,res)=>{
    try{
        const session=await mongoose.startSession();
        session.startTransaction();
        const {amount, to}=req.body;
        // console.log(amount);
        // console.log(to);
        const account=await Account.findOne({
            userId: req.userId
        }).session(session);

        if(!account || account.balance<amount){
            await session.abortTransaction();
            return res.status(400).json({
                message: "insufficient balance"
            })
        }

        const toAccount=await Account.findOne({
            userId: to
        }).session(session);

        // console.log(toAccount);
        if(!toAccount){
            await session.abortTransaction();
            return res.status(400).json({
                message: "invalid account"
            })
        }

        await Account.updateOne({
            userId: req.userId
        },{
            $inc:{balance: -amount}
        }).session(session)


        await Account.updateOne({
            userId: to
        },{
            $inc:{balance: +amount}
        }).session(session);

        await session.commitTransaction();
        res.json({
            message: "Transfer successful"
        })
    }
    catch{
            
    }
})


module.exports=router;
const express=require("express");
const Account=require("../db");
const { authMiddleware } = require("../middleware");


const router=express.Router();

router.get("/balance", authMiddleware , async (req,res)=>{
    const account=await Account.findOne({
        userId: req.userId
    })

    if(!account){
        res.json({message: "User not found"});
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
const express = require("express");
const userRouter=require("./user")


const router=express.Router();

router.use("/user", userRouter); // whichever request is made to /user is redirected to the userRouter.
// this userRouter is exported from the ./user.js file. we import it from there and here naming it as the userRouter.

module.exports=router;
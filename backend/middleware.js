const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware=(req, res, next)=>{
    const authHeader=req.headers.authorization;
    // console.log(authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            
        }) 
    }

    const token=authHeader.split(' ')[1];
    // console.log(token)

    try{
        const decoded=jwt.verify(token, JWT_SECRET);
        // console.log(decoded)
        if(decoded){
            req.userId=decoded.userId;
            // console.log("next called")
            next();
        }
        else res.status(403).json
    }
    catch{
        return res.status(403).json({})
    }
    
}

module.exports={authMiddleware}
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://chatterjeeswastik7772:KhAtwlDUH2kTFm1d@cluster0.zkuypgw.mongodb.net/?retryWrites=true&w=majority")
//KhAtwlDUH2kTFm1d
const UserSchema=new mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique: true,
        trim: true,
        minLength:3,
        maxLength: 30
    },
    firstName:{
        type: String,
        require: true,
        trim: true,
        maxLength: 50
    },
    LastName:{
        type: String,
        require: true,
        trim: true,
        maxLength: 50
    },
    password:{
        type:String,
        require: true,
        minLength: 6
    }
})
const User=mongoose.model("User", UserSchema);


const accountSchema= new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})
const Account=mongoose.model("Account", accountSchema);



module.exports={
    User, Account
};

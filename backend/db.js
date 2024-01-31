const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://chatterjeeswastik7772:zdzIO93kurIUz6TR@cluster0.rxklatx.mongodb.net/?retryWrites=true&w=majority")

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
        type:string,
        require: true,
        minLength: 6
    }
})

const User=mongoose.model("User", UserSchema);

module.exports={
    User
};
//mongodb+srv://chatterjeeswastik7772:zdzIO93kurIUz6TR@cluster0.rxklatx.mongodb.net/?retryWrites=true&w=majority
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        index:true,
        trim:true,
    },
    avatar:{
        type:String,
        required:true,
    },
    coverImage:{
        type:String,
        required:true,
    },
    watchHistory:[{
        type:Schema.Types.ObjectId,
        ref:"Video",
    }],
    password:{
        type:String,
        required:[true,"password is required"],
    },
    refreshToken:{
        type:String,
    },
},{timestamps:true})
UserSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10);
    next();
})
UserSchema.methods.ispasswordcorrect=async function (password){
    return await bcrypt.compare(password,this.password);
}
UserSchema.methods.accessToken=function (){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
    })
}
UserSchema.methods.getrefreshToken=function (){
    return jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
    })
}

export const User=mongoose.model("User",UserSchema);
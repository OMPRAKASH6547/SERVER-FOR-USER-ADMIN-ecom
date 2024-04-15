const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const Jwt=require('jsonwebtoken')
const valideter=require('validater');
const crypto=require("crypto")
const userSchema= new mongoose.Schema({

    username:{
        type:String,
        require:[true,"please Enter Your Name"],
        maxLength:[30,"Name Can Not Exised by 30 charactor"],
        minLength:[4,"Name should have morethan 4 char"]

    },
    email:{
        type:String,
        required:[true,'Please Enter Your Email'],
        unique:true,
        validete:[valideter.isEmail,"Please Enter a vailde email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your Password "],
        minLength:[8,"Password should be less  than 8 character"],
        select:false

    },
    avatar:{
        public_id:{
            type:String,
            require:true

        },
        url:{
            type:String,
            require:true
        }
    },
    role:{
        type:String,
        default:'user',

    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,


})

// userSchema.pre("save",async function(next){
//     if(this.isModified("password")){
//         next()
//     }
//     this.password= await bcrypt.hash(this.password,10);

//     next()

// })

//Jwt

userSchema.methods.getJWTToken=function (){
    return Jwt.sign({id:this._id},process.env.JWT_TOKEN,{
        expiresIn:process.env.JWT_EXPIRE})
    }

//comapiring password 

userSchema.methods.compairePassword= async function(enteredPassword){
   return await bcrypt.compare(enteredPassword,this.password)
}

//genrating password reset token 
userSchema.methods.getResetPasswordToken= function(){
       //genrating token 
       const resetToken=crypto.randomBytes(20).toString("hex");
       //hashing and ading to user Schema

       this.resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest("hex");

       this .resetPasswordExpire=Date.now() +15*60*1000;
       return resetToken;
}


const User =mongoose.model('User',userSchema);
module.exports=User
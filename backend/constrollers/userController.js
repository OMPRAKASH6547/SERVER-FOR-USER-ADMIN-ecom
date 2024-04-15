const User = require('../module/userModule');
const sendToken = require('../utils/jetTokens');

const senEmail= require('../utils/sendEmail')
const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({
      username, email, password,
      avatar: {
        public_id: "this is sampe id",
        url: "prifile url"
      }
    });

    const token = user.getJWTToken()

    res.status(200).json({ sucess: true, massage: "use register  sucessfull", user, token })
  } catch (error) {
    res.status(500).send(error)
  }
}

const loginuser = async (req, res,next) => {
  try {
    const { email, password } = req.body;
  if (!email || !password) {
    return await res.status(401).jason({ massage: "please fill all the field" })
  }
  const user = await User.findOne({ email }).select("password")
  if (!user) {
    return await res.status(500).json({ massage: "user not find" })
  }
  const isPasswordMatch = user.compairePassword(password)


  if (!isPasswordMatch) {
    return await res.status(500).json({ massage: "invalid user credential" });

  }
  // const token =await  user.getJWTToken()

  // res.status(200).json({ sucess: true, massage: "use login  sucessfull", token })
    sendToken(user,200,res)

  } catch (error) {

   await  res.send(error)
    
  }
}

const logout= async (req,res,next)=>{
  res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true,
  })
  res.status(200).json({
    sucess:true,
    message:"Logged Out"
  })

}

const forgetPassword= async(req,res,next)=>{
  const user=await User.findOne({email:req.body.email});
  if(!user){
     res.status(401).send("user not found ");
  };
   const resetToken=user.getResetPasswordToken();
   await user.save({validateBeforeSave:false})
   const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
   const massage=`your password resetToken Is :-\n\n ${resetPasswordUrl}\n\n if you have 
   not required then please ignore it 
   `
   try {
    await senEmail({
      email:user.email,
      subject:"eCOMMECE WEBSITE NAME paswword recovery",
      massage:massage

    })
    res.status(200).json({sucess:true,massage:`email send to ${user.email} sucessfully`})
    
   } catch (error) {

    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save({validateBeforeSave:false});
    return next(res.status(201).json({massage:error.massage}))

    
   }
} 

module.exports = { registerUser, loginuser ,logout,forgetPassword}
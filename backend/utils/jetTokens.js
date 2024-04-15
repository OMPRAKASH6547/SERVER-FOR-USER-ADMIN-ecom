// creating token and saving cookies

const sendToken= (user,statusCode,res)=>{
    const token= user.getJWTToken();
    //option for cookies

    const options={
        expires:new Date(
            Date.now() + process.env.COOKIES_EXPIRE *24 * 60 * 60 * 1000
        ),
        httpOnly:true
        
    }
   res.status(statusCode).cookie('token',token,options).json({
    sucess:true,
    user,
    token,

   })


}
module.exports=sendToken;
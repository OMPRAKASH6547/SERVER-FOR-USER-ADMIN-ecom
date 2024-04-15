const express=require("express");
const { registerUser,loginuser,logout,forgetPassword } = require("../constrollers/userController");

const router=express.Router();

router.route('/register').post(registerUser)
router.route('/login').post(loginuser)
router.route('/forgetPassword').post(forgetPassword)
router.route('/logout').get(logout)




module.exports=router
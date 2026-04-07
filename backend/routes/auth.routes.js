const express=require('express')
const router=express.Router();
const authController=require('../controllers/auth.controller')

router.post('/signup',authController.signupUser);
router.post('/login',authController.loginUser);
router.post('/logout',authController.logoutUser);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);

module.exports=router
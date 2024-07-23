import express from "express"
import { forgotPassword, getUser, logOut, resetPassword, signIn, signUp } from "../controller/authController.js"
import { isloggedIn }  from  "../middleware/jwtAuth.js"
const  router =express.Router();

 router.post("/register",signUp)
 router.post("/signin",signIn)
 

router.get("/user",isloggedIn, getUser);
router.get("/logout",logOut)
router.post("/forgot-password",forgotPassword);
router.post("/resetpassword/:token", resetPassword)
//protected

 export default router


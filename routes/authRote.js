import express from "express"
import { forgotPassword, getLoggedInUserDetails, logOut, resetPassword, signIn, signUp } from "../controller/authController.js"
import { isloggedIn }  from  "../middleware/jwtAuth.js"
import upload from "../controller/multer.controller.js";
const  router =express.Router();

 router.post("/register",upload.single('avatar'),signUp)
 router.post("/signin",signIn)
 router.get("/me", isloggedIn, getLoggedInUserDetails);



router.get("/logout",logOut)
router.post("/forgot-password",forgotPassword);
router.post("/resetpassword/:token", resetPassword)
//protected

 export default router


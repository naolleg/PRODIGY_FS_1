import express from "express";
import userController from "../controllers/userController.js";
import loginController from "../controllers/loginController.js";
import adminController from "../controllers/adminController.js";
import { auth, isAdmin } from "../auth/auth.js";
const userRoute = express.Router();

userRoute.post("/login", loginController.loginUser);
userRoute.post("/register", userController.registerUser);
userRoute.post("/confirmOTP", userController.confirmOTP);
userRoute.put("/forget", userController.forgetPassword);
//userRoute.put("/newPassword/:id",userController.newPassword);
userRoute.put("/deactivate/:id",adminController.deactivateUser);
userRoute.get("/deleteuser", [isAdmin],adminController.deleteUser);
userRoute.get("/getAll", adminController.getalluser);

export default userRoute;

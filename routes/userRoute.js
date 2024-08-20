import express from "express";
import userController from "../controllers/userController.js";
import loginController from "../controllers/loginController.js";
import adminController from "../controllers/adminController.js";
import { auth, isAdmin } from "../auth/auth.js";
const userRoute = express.Router();

userRoute.post("/login", loginController.loginUser);
userRoute.post("/register", userController.registerUser);
userRoute.post("/confirmOTP", userController.confirmOTP);
userRoute.post("/forget",[auth], userController.forgetPassword);
userRoute.post("/newPassword", [auth],userController.newPassword);
userRoute.post("/changePassword", [auth], userController.changePassword);
userRoute.get("/logout", loginController.logout);
userRoute.put("/deactivate", [isAdmin],adminController.deactivateUser);
userRoute.get("/deleteuser", [isAdmin],adminController.deleteUser);
userRoute.post("/insertRole", [isAdmin],adminController.insertIntoRole);

export default userRoute;

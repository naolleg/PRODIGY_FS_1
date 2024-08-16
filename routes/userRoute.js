import express from "express";
import userController from "../controllers/userController.js";
import loginController from "../controllers/loginController.js";
import adminController from "../controllers/adminController.js";
import { auth, isAdmin } from "../auth/auth.js";
const userRoutes = express.Router();

userRoutes.post("/login", loginController.loginUser);
userRoutes.post("/register", userController.registerUser);
userRoutes.post("/confirmOTP", userController.confirmOTP);
userRoutes.post("/forget",[auth], userController.forgetPassword);
userRoutes.post("/newPassword", [auth],userController.newPassword);
userRoutes.post("/changePassword", [auth], userController.changePassword);
userRoutes.get("/logout", loginController.logout);
userRoutes.put("/deactivate", [isAdmin],adminController.deactivateUser);
userRoutes.get("/deleteuser", [isAdmin],adminController.deleteUser);
userRoutes.post("/insertRole", [isAdmin],adminController.insertIntoRole);

export default userRoutes;

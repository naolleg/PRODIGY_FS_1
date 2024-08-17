import express from "express";
const appRoute = express.Router();

// all routes
import userRoutes from "./user.route.js";
//import loginRoutes from "./login.route.js";

// adding middleware
appRoute.use(userRoutes);
//appRoute.use(loginRoutes);


export default appRoute;

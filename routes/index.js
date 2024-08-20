import express from "express";
import userRoute from "./userRoute.js";

const appRoute=express.Router();

appRoute.use("/user",userRoute);


export default appRoute;
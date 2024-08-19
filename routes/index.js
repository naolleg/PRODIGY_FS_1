import express from "express";
import userRoute from "./userRoute";

const appRoute=express.Router();

appRoute.use(userRoute);


export default appRoute;
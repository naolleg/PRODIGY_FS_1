import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

import userService from '../services/userService.js'

const auth = (req,res,next)=>{
   try {
      const token = req.headers['x-accesss-token'];
      if(!token){
         return res.status(404).json({
            success: false,
            message: "no token is found"
         })
      }
      else{
         const verified = jwt.verify(token, process.env.JWT_SECRET);
         if(!verified){
            return res.status(400).json({
               success: false,
               message: "invalid token"
            })
         }
         else{
            req.userId =verified.userId;
            next();
         }
      }
   } catch (error) {
      res.status(500).json({success:  false ,message: error.message });
    
   }

}


const isAdmin = async (req,res,next)=>{
  try {
   const response = await userService.getCompanyRoleNameUsingUserId(req.userId);
   if(!response && !response.length > 0 &&  !(response[0].role ==='admin')){
      return res.status(403).json({
         success: false,
         message: 'you have no privilage'
      })
   }else{
      next();
   }

  } catch (error) {
   console.log(error);
   res.status(500).json({ success: false, message: err.message });
  }

}

export { auth ,isAdmin};
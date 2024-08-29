import userService from "../services/userService.js";
import userUtility from "../utils/userUtils.js";
import bcrypt from "bcrypt"; // Import bcrypt correctly
import dotenv from "dotenv";
dotenv.config();

const userController = {
  // Register a new user
  registerUser: async (req, res) => {
    try {
      const {
        userEmail,
        userPassword,
        firstName,
        middleName,
        lastName,
      } = req.body;

      // Check all fields
      if (
        !userEmail ||
        !userPassword ||
        !firstName ||
        !middleName ||
        !lastName 
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      // Check if email is used before
      const isEmailExist = await userService.getUserByEmail(req.body);
      // If there is an account related to this email
      if (isEmailExist.length > 0) {
        // console.log(isEmailExist);
        return res.status(400).json({
          success: false,
          message: "Email is already used",
        });
      }


      // validation completed
      // prepare pasword
      // Password encryption
      const saltRounds = 10; // Specify a number of rounds
      const salt = bcrypt.genSaltSync(saltRounds);
      req.body.userPassword = bcrypt.hashSync(userPassword, salt);

      // Generate OTP
      // req.body.OTP = userUtility.generateDigitOTP();

      // insetring the data
      const isUserDataInserted = await userService.insertIntoUsers(req.body);
      // Extract userId from the result
      req.body.userId = isUserDataInserted.insertId;

      // Insert user role into the user role table
      const isUserRoleDataInserted = await userService.insertIntoUsersRole(
        req.body
      );
      // Insert user password into the user password table
      const isUserPasswordAdded = await userService.insertIntoUsersPassword(
        req.body
      );

      // // Send OTP by email
      // userUtility.sendEmail(userEmail, req.body.OTP).then(async () => {
      //   // Inserting password into the database
        if (
          isUserDataInserted &&
          isUserRoleDataInserted &&
          isUserPasswordAdded
        ) {
          res.status(200).json({
            success: true,
            message: "User created successfully",
          });
      }
      //}
    //);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  // Confirm OTP
  confirmOTP: async (req, res) => {
    try {
      const { userEmail, OTP } = req.body;

      // Validate the request values
      if (!userEmail || !OTP) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      // Check if the email exists
      const getUserByEmail = await userService.getUserByEmail(req.body);
      const userId = getUserByEmail[0].userId;
      req.body.userId = userId;

      const getOTP = await userService.getUserOTPByUserId(req.body);

      if (!getOTP.length) {
        return res.status(500).json({
          success: false,
          message: "OTP not found",
        });
      } else {
        const storedOTP = getOTP[0].OTP;
        if (OTP === storedOTP) {
          // Correct OTP, perform any necessary actions
          return res.json({
            success: true,
            message: "OTP successfully confirmed",
          });

         
          // Update contact verification table column emailStatus to 1
          
        } else {
          return res.status(500).json({
            success: false,
            message: "OTP does not match",
          });
        }

       
      }
    } catch (error) {
      console.error("Error in confirmOTP:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // Forget password
  forgetPassword: async (req, res) => {
    try {
      const { userEmail } = req.body;
  
      // Validate the request values
      if (!userEmail) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
  
      // Check if the email exists
      const isUserExist = await userService.getUserByEmail(req.body);
     console.log(isUserExist);
     
      // If there is no account related to this email
      if (!isUserExist.length) {
        return res.status(400).json({
          success: false,
          message: "There is no account related to this email",
        });
      } else {
        // Extract userId
        req.body.userId = isUserExist[0].userId;
        console.log(req.body.userId);
        
        // Generate OTP
        const OTP = await userUtility.generateDigitOTP();
        req.body.OTP = OTP;
     console.log(req.body.OTP);
     
        // Send OTP to user's email
        userUtility.sendEmail(userEmail, OTP).then(async () => {
          // Store OTP in database
          const isnewOTPAdded = await userService.newOTP({ userId: req.body.userId, OTP: req.body.OTP });
          console.log(isnewOTPAdded);
          
          if (!isnewOTPAdded) {
            return res.status(500).json({
              success: false,
              message: "Error during sending email",
            });
          } else {
            return res.status(200).json({
              success: true,
              message: "OTP sent successfully. Please check your email.",
            });
          }
        });
      }
    } catch (error) {
      console.error("Error in forgetPassword:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
  // Change password
  newPassword: async (req, res) => {
    try {
      req.body.userId = req.userId;
      const { userEmail, userPassword } = req.body;
      console.log(userId);
      // Validate the request values
      if (!userEmail || !userPassword ) {
        return res.json({
          success: false,
          message: "All fields are required",
        });
      }

      const isUserExist = await userService.getUserByEmail(req.body);
      console.log(isUserExist);

      if (!isUserExist) {
        return res.status(500).json({
          success: false,
          message: "User does not exist",
        });
      }

   // Extract userId
   req.body.userId = isUserExist[0].userId;
   console.log(req.body.userId);
   
      const salt = bcrypt.genSaltSync(10); // Specify the number of rounds
      req.body.userPassword = bcrypt.hashSync(userPassword, salt);

      const insertUserPassword = await userService.updateUsersPassword(
        userId,
        userPassword
      );

      if (!insertUserPassword) {
        return res.status(500).json({
          success: false,
          message: " error during password insertion",
        });
      }

      return res.status(200).json({
        success: true,
        message: "new Password updated successfully",
      });
    } catch (error) {
      console.error("Error in newPassword:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};

export default userController;

// const isEmailSend = await userUtility.sendEmail(userEmail, req.body.OTP);

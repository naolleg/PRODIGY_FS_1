import userService from "../services/user.service.js";
import userUtility from "../utilities/user.utility.js";
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
        userPhone,
        firstName,
        middleName,
        lastName,
        companyRoleId,
      } = req.body;

      // Check all fields
      if (
        !userEmail ||
        !userPassword ||
        !userPhone ||
        !firstName ||
        !middleName ||
        !lastName ||
        !companyRoleId
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

      // Check if the phone number is related to an account
      const isPhoneExist = await userService.getUserByPhone(req.body);
      // // If there is an account related to this phone
      if (isPhoneExist.length) {
        return res.status(400).json({
          success: false,
          message: "Phone is already used",
        });
      }

      // validation completed
      // prepare pasword
      // Password encryption
      const saltRounds = 10; // Specify a number of rounds
      const salt = bcrypt.genSaltSync(saltRounds);
      req.body.userPassword = bcrypt.hashSync(userPassword, salt);

      // Generate OTP
      req.body.OTP = userUtility.generateDigitOTP();

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
      // Insert contact verification data into the contact verification table
      const isContactVerificationInserted =
        await userService.insertIntoContactVerification(req.body);

      // Insert user profile data into the contact verification table
      const isUserProfileInserted = await userService.insertIntoUsersProfile(
        req.body
      );
      // Send OTP by email
      userUtility.sendEmail(userEmail, req.body.OTP).then(async () => {
        // Inserting password into the database
        if (
          isUserDataInserted &&
          isUserRoleDataInserted &&
          isUserPasswordAdded &&
          isContactVerificationInserted &&
          isUserProfileInserted
        ) {
          res.status(200).json({
            success: true,
            message: "User created successfully",
          });
        }
      });
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
          // Update user's OTP to null
          const updatedOTP = await userService.updateOTP(req.body);
          console.log(req.body);
          console.log(updatedOTP);

          if (!updatedOTP) {
            return res.status(500).json({
              success: false,
              message: "Error updating user's OTP",
            });
          }

          // Update contact verification table column emailStatus to 1
          const updatedEmailStatus =
            await userService.updateContactVerificationEmailStatus(req.body);

          if (!updatedEmailStatus) {
            return res.status(500).json({
              success: false,
              message:
                "Error updating email status in contact verification table",
            });
          }
        } else {
          return res.status(500).json({
            success: false,
            message: "OTP does not match",
          });
        }

        return res.json({
          success: true,
          message: "OTP successfully confirmed",
        });
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
        res.json({
          success: false,
          message: "All fields are required",
        });
      }

      // Check if the email exists
      const isUserExist = await userService.getUserByEmail(req.body);

      // If there is no account related to this email
      if (!isUserExist.length) {
        return res.status(400).json({
          success: false,
          message: "There is no account related to this email",
        });
      } else {
        // Extract userId
        req.body.userId = isUserExist[0].userId;
        // Generate OTP
        const OTP = await userUtility.generateDigitOTP();
        req.body.OTP = OTP;
        // console.log(req.body.OTP)
        userUtility.sendEmail(userEmail, OTP).then(async () => {
          const isnewOTPAdded = await userService.newOTP(req.body);
          //console.log(isnewOTPAdded);
          if (!isnewOTPAdded) {
            return res.status(500).json({
              success: false,
              message: "Error during sending email",
            });
          } else {
            return res.status(200).json({
              success: true,
              message: "OTP sent successfully",
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

  // Change new password
  newPassword: async (req, res) => {
    try {
      const { userId, userPassword } = req.body;

      // Validate the request values
      if (!userId || !userPassword) {
        res.json({
          success: false,
          message: "All fields are required",
        });
      }
      // Compare with previous passwords
      const isUserPassword = await userService.getUserPasswordByUserId(userId);
      for (let i = 0; i < isUserPassword.length; i++) {
        let dbPassword = isUserPassword[i].userPassword;
        const isMatch = bcrypt.compareSync(userPassword, dbPassword);
        if (isMatch) {
          return res.status(500).json({
            success: false,
            message: "This password is already used. Please use another",
          });
        }
      }

      // Password encryption
      let salt = bcrypt.genSaltSync(10); // Specify the number of rounds
      req.body.userPassword = bcrypt.hashSync(userPassword, salt);
      //userPassword = req.body.userPassword;
      const passwordInserted = await userService.insertIntoUsersPassword(
        userId,
        userPassword
      );

      if (!passwordInserted) {
        return res.status(404).json({
          success: false,
          message: "password not insert into userPassword",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error) {
      console.error("Error in newPassword:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // Change password
  changePassword: async (req, res) => {
    try {
      req.body.userId = req.userId;
      const { userId, oldPassword, userPassword } = req.body;
      console.log(userId);
      // Validate the request values
      if (!userId || !userPassword || !oldPassword) {
        return res.json({
          success: false,
          message: "All fields are required",
        });
      }

      // Check if the old password is correct
      const userData = await userService.getUserPasswordByUserId(req.body);
      console.log(userData);
      if (!userData) {
        return res.status(500).json({
          success: false,
          message: "User does not exist",
        });
      }

      // Compare the old password with the last one from the table
      const dbPassword = userData[userData.length - 1].userPassword;
      console.log(dbPassword);
      const isMatch = bcrypt.compareSync(oldPassword, dbPassword);
      if (!isMatch) {
        return res.status(500).json({
          success: false,
          message: "Incorrect old password",
        });
      }

      // for (let i = 0; i < userData.length; i++) {
      //   let dbPassword = userData[i].userPassword;
      //   // Compare
      //   const isMatch = bcrypt.compareSync(userPassword, dbPassword);
      //   if (isMatch) {
      //     return res.status(500).json({
      //       success: false,
      //       message: "This password is already used. Please use another",
      //     });
      //   }
      // }

      // Password encryption
      const salt = bcrypt.genSaltSync(10); // Specify the number of rounds
      req.body.userPassword = bcrypt.hashSync(userPassword, salt);

      const insertUserPassword = await userService.insertIntoUsersPassword(
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
        message: "Password inserted successfully",
      });
    } catch (error) {
      console.error("Error in changePassword:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};

export default userController;

// const isEmailSend = await userUtility.sendEmail(userEmail, req.body.OTP);

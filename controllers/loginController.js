import loginService from "../services/loginService.js";
import userService from "../services/userService.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const loginController = {
  loginUser: async (req, res) => {
    console.log(req.body);
    try {
      const { userEmail, userPassword } = req.body;
      //console.log(req.body);
      // Check if all fields are given
      if (!userEmail || !userPassword) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      // Check if email is used before
      const isEmailExist = await userService.getUserByEmail(req.body);

      // If there is no account related to this email
      if (!isEmailExist.length) {
        return res.status(404).json({
          success: false,
          message: "No account exists with this email",
        });
      }
      // if the account exist check for password
      req.body.userId = isEmailExist[0].userId;
      const isUserPasswordExist = await loginService.getUserPasswordByUserId(
        req.body
      );
      const dbPassword = isUserPasswordExist[0].userPassword;
      //compare user password with db password
      const isMatch = bcrypt.compareSync(userPassword, dbPassword);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Incorrect password",
        });
      } else {
        // extracting first name and user role
        const firstname= await loginService.getUserFirstName(req.body);
        const role = await loginService.getUserRole(req.body);
        const userId = req.body.userId;
        // prepare token
      //Prepare token
      const token = jwt.sign(
        { userId, role, firstname },
        process.env.JWT_SECRET,
        {
          // expiresIn: '1h',
        }
      );
      console.log(token);

      return res.status(200).json({
        token,
        success: true,
        message: "Login successfully",
      });
    }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },


    logout: async (req, res) => {
      try {
        // Get the token from the request headers
        const token = req.headers.authorization.split(" ")[1];
  
        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
            return res.status(401).json({
              success: false,
              message: "Invalid token",
            });
          }
  
          // If token is valid, remove it from the request headers
          delete req.headers.authorization;
  
          return res.status(200).json({
            success: true,
            message: "Logged out successfully",
          });
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    },
};

export default loginController;

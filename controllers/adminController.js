import dashboardService from "../services/adminService.js";
import dotenv from "dotenv";
dotenv.config();

const adminController = {
  deactivateUser: async (req, res) => {
    try {
      const id = req.params.id.substring(1);
    //   const { activeStatus } = req.body;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required',
        });
      }
  
      const isUserUpdated = await dashboardService.deactivateUser(id);
      if (!isUserUpdated) {
        return res.status(400).json({
          success: false,
          message: 'Failed to update user',
        });
      }
  
      return res.status(200).json({
        success: true,
        message: 'User deactivated successfully',
      });
    } catch (error) {
    //   return res.status(500).json({
    //     success: false,
    //     message: 'Server error',
    //   });
    console.log(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const id = req.params.id.substring(1);
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "all fields are required",
        });
      }
      const isDeleted = await dashboardService.deleteUser(id);

      if (!isDeleted) {
        return res.status(400).json({
          success: false,
          message: "fail to delete",
        });
      }
      res.status(200).json({
        success: true,
        message: "user deleted successfully",
      });
    } catch (error) {
      // return res.status(500).json({
      //   success: false,
      //   message: "Server error",
      // });
      console.log(error);
    }
  },
   getalluser:async (req, res) => {

    const isAllusers = await dashboardService.getalluser();
    if (!isAllusers) {
      return res.status(400).json({
        success: false,
        message: "Failed to get all user",
      });
    }




    return res.status(200).json({
      success: true,
      message: "User get all successfully",
    });

   },
  insertIntoRole: async (req, res) => {
    try {
      const { userId, companyRoleId } = req.body;
      if (!userId || !companyRoleId) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
      const isAssigned = await dashboardService.insertIntoRole(req.body);
      if (!isAssigned) {
        return res.status(400).json({
          success: false,
          message: "Failed to assign the role",
        });
      }

      return res.status(200).json({
        success: true,
        message: "User role assigned successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },

}

export default adminController;

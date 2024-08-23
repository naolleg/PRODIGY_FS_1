import query from "../config/db.js";
import dashboardQuery from "../queries/adminQuery.js";
import dotenv from "dotenv";
dotenv.config();


const adminService = {
  deleteUser: async (data) => {
    try {
      const rows = await query(dashboardQuery.deleteUser, [data.id] );
      return rows;
    } catch (error) {
      console.log(error);
      // return null;
    }
  },
  getalluser: async (data) => {
    try {
      const rows = await query(dashboardQuery.getalluser );
      return rows;
    } catch (error) {
      console.log(error);
      // return null;
    }
  },


      insertIntoRole: async (data) => {
        try {
          const isAssigned = await query(dashboardQuery.insertIntoRole[data.userId, data.companyRoleId])
          return isAssigned;
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      deactivateUser: async (userId) => {
        try {
          const queryStr = dashboardQuery.deactivateUser;
          const params = [userId];
          const rows = await query(queryStr, params);
          return rows;
        } catch (error) {
          console.log(error);
        }
      }
    }
    export default adminService;
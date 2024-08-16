import query from "../config/db.js";
import dashboardQuery from "../queries/dashboard.query.js";
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

      insertIntoRole: async (data) => {
        try {
          const isAssigned = await query(dashboardQuery.insertIntoRole[data.userId, data.companyRoleId])
          return isAssigned;
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      deactivateUser: async (data) => {
        try  {
          const rows = await query(dashboardQuery.deactivateUser[data.id])
          return rows
        } catch (error) {
          // console.error('Error deactivating user:', error);
          // return null;
          console.log(error);
          // return null;
        }
      },
    }
    export default adminService;
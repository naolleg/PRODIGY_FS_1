import query from "../config/db.js";
import loginQuery from "../queries/login.query.js";

const loginService = {
  getUserByEmail: async (data) => {
    try {
      const rows = await query(loginQuery.getUserByEmail, [data.userEmail]);
      return rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  getUserPasswordByUserId: async (data) => {
    try {
      const rows = await query(loginQuery.getUserPasswordByUserId, [data.userId]);
      return rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  getUserRoleAndFirstName:async (data) => {
    try {
      const rows = await query(loginQuery.getUserRoleAndFirstName, [data.userId]);
      return rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  },


};
export default loginService;

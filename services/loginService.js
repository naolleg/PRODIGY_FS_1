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
  getstatus :async(data) => {
    try {
      const rows = await query(loginQuery.getUserStatusByUserId, [data.userId]);
      return rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  getUserRole: async (data) => {
    try {
      const rows = await query(loginQuery.getUserRoleByUserId, [data.userId]);
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
  getUserFirstName:async (data) => {
    try {
      const rows = await query(loginQuery.getUserFirstName, [data.userId]);
      return rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  },


};
export default loginService;

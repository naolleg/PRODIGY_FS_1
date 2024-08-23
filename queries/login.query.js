export default {
    getUserPasswordByUserId: `SELECT * FROM usersPassword WHERE userId = ? ORDER BY createdAt DESC;`,
    getUserByEmail: `SELECT * FROM users WHERE userEmail = ?;`,
    getUserFirstName: `SELECT firstName from users WHERE userId = ?;`,
    getUserRoleByUserId:`SELECT role from usersRole WHERE userId = ?;`,
    getUserStatusByUserId:`SELECT activeStatus from users WHERE userId = ?;`,
  };
  
export default {
    getUserPasswordByUserId: `SELECT * FROM usersPassword WHERE userId = ? ORDER BY createdDate DESC;`,
    getUserByEmail: `SELECT * FROM users WHERE userEmail = ?;`,
    getUserFirstName: `SELECT firstName from users WHERE userId = ?;`
  };
  
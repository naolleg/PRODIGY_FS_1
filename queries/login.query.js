export default {
    getUserPasswordByUserId: `SELECT * FROM usersPassword WHERE userId = ? ORDER BY createdDate DESC;`,
    getUserByEmail: `SELECT * FROM users WHERE userEmail = ?;`,
    getUserRoleAndFirstName: `SELECT ur.userRoleId, ur.userId, ur.RoleId,  u.firstName FROM usersRole AS ur
    JOIN Roles AS cr ON ur.companyRoleId = cr.RoleId  JOIN users AS u ON ur.userId = u.userId WHERE ur.userId = ?`,
  };
  
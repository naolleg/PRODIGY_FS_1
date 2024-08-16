export default {
    getUserByEmail: `SELECT * FROM users WHERE userEmail = ?;`,
    getUserByPhone: `SELECT * FROM users WHERE userPhone = ?;`,
    getUserOTPByUserId: `SELECT OTP FROM users WHERE userId = ?; `,
    getUserPasswordByUserId: `SELECT userPassword FROM usersPassword WHERE userId = ?;`,
  
    insertIntoUsers: `INSERT INTO users (userEmail, firstName, middleName, lastName, userPhone, createdDate, OTP, activeStatus) VALUES (?, ?, ?, ?, ?, NOW(), ?, 1);`,
    insertIntoUsersRole: `INSERT INTO usersRole (userId, companyRoleId) VALUES (?, ?);`,
    insertIntoUsersPassword: `INSERT INTO usersPassword (userId, userPassword, createdDate) VALUES (?, ?, NOW() );`,
    insertIntoContactVerification: `INSERT INTO contactVerification (userId, emailStatus, phoneStatus) VALUES (?, 0, 0);`,
    insertUserPassword: `INSERT INTO usersPassword (userId, userPassword, createdDate) VALUES (?, ?, NOW());`,
  
    updateOTP: `UPDATE users SET OTP = NULL WHERE userId = ?;`,
    updateContactVerificationEmailStatus: `UPDATE contactVerification SET emailStatus = 1 WHERE userId = ?;`,
    newOTP: `UPDATE users SET OTP = ? WHERE userEmail = ?;`,
    UserPassword: `UPDATE usersPassword SET userPassword = ?, createdDate = NOW() WHERE userId = ?;`,
  };
  
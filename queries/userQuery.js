export default {
    getUserByEmail: `SELECT * FROM users WHERE userEmail = ?;`,
    getUserByPhone: `SELECT * FROM users WHERE userPhone = ?;`,
    getUserOTPByUserId: `SELECT OTP FROM users WHERE userId = ?; `,
    getUserPasswordByUserId: `SELECT userPassword FROM usersPassword WHERE userId = ?;`,
    insertIntoUsers: `INSERT INTO users (userEmail, firstName, middleName, lastName, createdAt, activeStatus) VALUES (?, ?, ?, ?, NOW(), 1);`,
    insertIntoUsersRole: `INSERT INTO usersRole (userId,role) VALUES (?,?);`,
    insertIntoUsersPassword: `INSERT INTO usersPassword (userId, userPassword, createdAt) VALUES (?, ?, NOW() );`,
    updateOTP: `UPDATE users SET OTP = NULL WHERE userId = ?;`,
    updateContactVerificationEmailStatus: `UPDATE contactVerification SET emailStatus = 1 WHERE userId = ?;`,
    newOTP: `UPDATE users SET OTP = ? WHERE userEmail = ?;`,
    updateUsersPassword: `UPDATE usersPassword SET userPassword = ?, createdAt = NOW() WHERE userId = ?;`,
  };
  
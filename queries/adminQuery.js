export default {
insertIntoRole :  `INSERT INTO usersRole (userId, companyRoleId) VALUES (?, ?);`,
deactivateUser:  `UPDATE users SET activeStatus = 0 WHERE userId = ?`,
deleteUser: `DELETE FROM users WHERE userId = ?`,
getalluser:"SELECT * FROM users"
}
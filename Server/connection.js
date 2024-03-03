const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.HOST_NAME,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD_NAME,
    database: process.env.DATABASE_NAME
}); 

module.exports = db;
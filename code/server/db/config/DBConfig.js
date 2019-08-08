//mysql 的配置
import mysql from "mysql";
//数据库连接配置
const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"myblog"
});

module.exports = pool;
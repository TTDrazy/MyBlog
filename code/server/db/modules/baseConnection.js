import pool from "../config/DBConfig";

//对数据库进行增删改查操作的基础
function query(sql, callback) {
    pool.getConnection((err, connection) => {
        connection.query(sql, (err, rows) => {
            callback(err, rows);
            connection.release(); //释放连接
        });
    });
}

module.exports = { query: query };

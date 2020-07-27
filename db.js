const mysql = require('mysql');
const config = require('./config');

const pool = mysql.createPool(config.mysql);

const query = (sql, values) => {
  // 返回一个 Promise
  return new Promise((resolve, reject) => {
    try {
      pool.getConnection(function (err, connection) {
        if (err) reject(err);
        connection.query(sql, values, (err, rows) => {
          if (err) reject(err);
          resolve(JSON.parse(JSON.stringify(rows)));
        });
        // 结束会话
        connection.release();
      });
    } catch (error) {
      console.log(error);
    }
  });
};

async function getData(sql, data) {
  return await query(sql, data);
}
module.exports = getData;

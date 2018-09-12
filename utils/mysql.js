/**
 * 数据库连接池
 */

const mysql = require('mysql')
const config = require('../config/config')

// 创建数据池
const pool  = mysql.createPool({
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
})

// 数据库操作 Promise封装
let operateDB = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log("-----Get connection from mysql pool failed-------");
                reject( err )
            } else {
                connection.query(sql, values, ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    // 关闭连接
                    connection.release()
                })
            }
        })
    })
}

module.exports = { operateDB }
  
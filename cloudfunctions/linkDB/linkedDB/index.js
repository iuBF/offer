const cloud = require('wx-server-sdk')
const mysql = require('mysql2/promise')

cloud.init()

exports.main = async (event, context) => {
  const connection = await mysql.createConnection({
    host: 'your_server_ip',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
  })

  const [rows, fields] = await connection.execute('SELECT * FROM your_table')

  return rows
}
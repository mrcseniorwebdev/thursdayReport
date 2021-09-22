// import mariadb
const mariadb = require('mariadb')

// create a new connection pool
const pool = mariadb.createPool({
    host: 'db',
    user: process.env.MARIA_DB_USER,
    password: process.env.MARIA_DB_PASS,
    database: 'thursreport_db'
})

const getConnection = () => {
    return new Promise(function (resolve, reject) {
        pool.getConnection().then(function (connection) {
            resolve(connection)
        }).catch(function (error) {
            reject(error)
        })
    })
}
// expose the ability to create new connections
module.exports = {
    getConnection
}
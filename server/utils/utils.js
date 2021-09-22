const pool = require('./db')


const getToken = async () => {
    let conn
    let token
    console.log('hello from getToken')
    try {
        conn = await pool.getConnection()
        token = await conn.query(`SELECT access_token FROM users WHERE fbid = '1731624067030754'`)
    }
    catch (err) {
        console.error(err)
    }
    finally {
        if (conn) {
            console.log('ending db conn...')
            await conn.end()
        }
        console.log('getToken toekn:', token)
    }
    return token[0].access_token
}

module.exports = { getToken }
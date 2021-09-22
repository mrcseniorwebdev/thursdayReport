const passport = require('passport')
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const pool = require('./db')

passport.serializeUser((user, cb) => {
    console.log('serialize user:', user)
    console.log(user.id)
    cb(null, user.id)
})


passport.deserializeUser(async (id, cb) => {
    let conn
    let user
    console.log('hello from deserializeUser')
    try {
        conn = await pool.getConnection()
        user = await conn.query(`SELECT * FROM users WHERE fbid = '${id}'`)
    }
    catch (err) {
        console.error(err)
    }
    finally {
        if (conn) {
            console.log('ending db conn...')
            await conn.end()
        }
        console.log('deserializeUser user:', user)
        user ? cb(null, true) : cb(null, false)

    }
})


// const localhost = process.env.NODE_ENV === 'dev' ? '' : ''

console.log(process.env.FB_APP_ID)
console.log(process.env.FB_APP_SECRET)
// console.log(`${localhost}/auth/facebook/redirect`)


// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new FacebookStrategy(
    {
        clientID: process.env.FB_APP_ID,
        clientSecret: process.env.FB_APP_SECRET,
        callbackURL: 'https://0f60-8-18-52-2.ngrok.io/auth/facebook/redirect',
        profileFields: ['id', 'emails', 'name']
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile._json)
        console.log(accessToken)

        let conn
        let allow = false
        try {
            conn = await pool.getConnection()
            const rows = await conn.query(`SELECT fbid FROM users WHERE email = '${profile._json.email}'`)
            if (rows.length) {
                if (!rows[0].fbid) {
                    // const resp = await conn.query('INSERT INTO users (email) values (?) ')
                    const resp = await conn.query('UPDATE users SET fbid = ?, name = ?, access_token = ? WHERE email = ?', [
                        profile._json.id,
                        `${profile._json.first_name} ${profile._json.last_name}`,
                        accessToken,
                        profile._json.email
                    ])
                    console.log(resp)
                }
                console.log('allow')
                allow = true
            }
        }
        catch (err) {
            console.error(err)
        }
        finally {
            if (conn) {
                console.log('ending db conn...')
                await conn.end()
            }
            console.log(allow)
            allow ? done(null, profile) : done(null, null)
        }


    }
))



const authRouter = require('express').Router()
const passport = require('passport')

const localhost = process.env.NODE_ENV === 'dev' ? 'http://localhost:3000' : ''


authRouter.get('/facebook', passport.authenticate('facebook', {
    scope: ['read_insights', 'pages_show_list', 'pages_read_engagement', 'pages_read_user_content', 'pages_manage_engagement', 'public_profile', 'email']
}))

authRouter.get('/facebook/redirect',
    function (req, res, next) {
        if (req.query && !req.query.error && req.query.error_code) {
            req.query.error = true
        }
        next()
    },
    passport.authenticate('facebook', { failureRedirect: `${localhost}/login`, successRedirect: `${localhost}/dashboard/main` })
)
// authRouter.get('/facebook/redirect', passport.authenticate('facebook', { failureRedirect: `${localhost}/login`, successRedirect:`${localhost}/dashboard/main` }), (req, res) => {
//     // res.send(req.user);
//     console.log('oh hello there..')
//     console.log(req.user)
//     res.redirect(`${localhost}/dashboard/main`)
// })

authRouter.get('/logout', (req, res) => {
    req.logout()
    res.redirect(`${localhost}/login`)
    // try {
    //     res.status(200)
    // }
    // catch (err) {
    //     console.error(err)
    //     res.status(400)
    // }
})

module.exports = authRouter

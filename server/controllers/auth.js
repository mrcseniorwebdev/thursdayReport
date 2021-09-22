const authRouter = require('express').Router()
const passport = require('passport')

const localhost = process.env.NODE_ENV === 'dev' ? 'http://localhost:3000' : ''


authRouter.get('/facebook', passport.authenticate('facebook', {
    scope: ['read_insights', 'pages_show_list', 'pages_read_engagement', 'pages_read_user_content', 'pages_manage_engagement', 'public_profile', 'email']
}))

authRouter.get('/facebook/redirect', passport.authenticate('facebook', { failureRedirect: `${localhost}/login` }), (req, res) => {
    // res.send(req.user);
    // console.log('oh hello there..')
    res.redirect(`${localhost}/dashboard`)
})

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

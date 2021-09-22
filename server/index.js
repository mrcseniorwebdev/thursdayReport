const express = require('express')
const app = express()
const cookieSession = require('cookie-session')

const passport = require('passport')
require('./utils/passport_config')
require('express-async-errors')
const authRouter = require('./controllers/auth')
const reportRouter = require('./controllers/report')
const userRouter = require('./controllers/users')

// const sectionRouter = require('./controllers/section')
// const passRouter = require('./controllers/pass')
const cors = require('cors')
const morgan = require('morgan')
app.use(cors())
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader(
//         'Access-Control-Allow-Methods',
//         'OPTIONS, GET, POST, PUT, PATCH, DELETE'
//     )
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//     next()
// })
// app.options('*', cors())
app.use(express.static('build'))
// const corsOptions = {
//     origin: '*',
//     credentials: true,            //access-control-allow-credentials:true
//     optionSuccessStatus: 200
// }

app.use(cookieSession({
    name: 'mrcfbseshion',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}))

app.use(passport.initialize())
app.use(passport.session())


app.use(express.json())
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        req.method === 'POST' ? JSON.stringify(req.body) : ''
    ].join(' ')
}))



app.use('/auth', authRouter)
app.use('/api/report', reportRouter)
app.use('/api/user', userRouter)


app.get('/', (req, res, next) => {
    res.send('<h1>herro</h1>')
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}



app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    console.error('e', error)
    if (error.name === 'SyntaxError') {
        return response.status(400).send({ error: 'malformed request' })
    }


    next(error)
}

app.use(errorHandler)






const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

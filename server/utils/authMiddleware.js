

const authCheck = (req, res, next) => {
    console.log('hellllllo from auth middleware')
    console.log(req.user)
    if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' })
    } else {
        next()
    }
}

module.exports = { authCheck }

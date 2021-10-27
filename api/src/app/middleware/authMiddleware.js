const authConfig = require('../../config/authenticate')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = async(req, res, next) => {

    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(404).json({ error: 'token not provided' })

    const [, token] = authHeader.split(' ')

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret)


        req.userId = decoded.id

        return next()

    } catch (error) {

        console.log()

        return res.status(401).json({ error: 'token invalid' })

    }

}
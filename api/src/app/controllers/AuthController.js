const jwt = require('jsonwebtoken')
const authConfig = require('../../config/authenticate')
const User = require('../models/User')
const { promisify } = require('util')

class AuthController {
    static async index(req, res) {
        const authHeader = req.headers.authorization
        const id_user = req.query.id

        if (!authHeader) return res.status(400).json({ error: 'token not provided!' })
        const [, token] = authHeader.split(' ')

        try {
            const decoded = await promisify(jwt.verify)(token, authConfig.secret)

            if (decoded.id != req.userId || decoded.id != id_user || req.userId != id_user) {

                return res.status(400).json({ error: 'token invalid' })
            }

            return res.json({ id: req.userId })

        } catch (error) {


            return res.status(401).json({ error: 'token invalid' })

        }
    }

    static async store(req, res) {

        const { email, password } = req.body

        if (!email || !password) return res.status(400).json({})

        try {

            const user = await User.findOne({ where: { email }, attributes: ['id', 'password'] })

            if (!user)
                return res.status(404).json({})

            if (!(await user.passwordCheck(password)))
                return res.status(404).json({})

            return res.json({
                user: user.id,
                token: jwt.sign({ id: user.id }, authConfig.secret, {
                    expiresIn: authConfig.expiresIn
                })
            })

        } catch (error) {
            return res.status(500).json(error)
        }

    }
}

module.exports = AuthController
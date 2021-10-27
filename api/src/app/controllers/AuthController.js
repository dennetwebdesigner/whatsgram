const jwt = require('jsonwebtoken')
const authConfig = require('../../config/authenticate')
const User = require('../models/User')
const { promisify } = require('util')

class AuthController {
    static async index(req, res) {
        const authHeader = req.headers.authorization

        if (!authHeader) return res.status(400).json({ error: 'token not provided!' })

        try {
            const decoded = await promisify(jwt.verify)(token, authConfig.secret)

            req.userId = decoded.id

            return res.json({ id: req.userId })

        } catch (error) {

            console.log()

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
const User = require('../models/User')

class UserController {

    static async index() {}

    static async show(req, res) {
        const { id } = req.params

        const user = await User.findOne({
            where: { id },
            attributes: ['id', 'name', 'img']
        })

        if (!user) return res.status(404).json({})

        try {
            return res.json(user)
        } catch (error) {
            return res.status(500).json({})
        }
    }

    static async store(req, res) {

        const { name, email, password } = req.body
        if (!name, !email, !password)
            return res.status(404).json({})

        const userExist = await User.findOne({
            where: { email },
            attributes: ['id']
        })

        if (userExist) return res.status(400).json({})

        try {

            if (await User.create({
                    name,
                    email,
                    password_input: password,
                    img: './assets/img/user-icon.png'
                })) {
                return res.status(201).json({})
            }

        } catch (error) {

            return res.status(500).json({ error })
        }

    }

    static async update() {}

    static async destroy() {}

}

module.exports = UserController
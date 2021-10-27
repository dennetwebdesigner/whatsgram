const User = require('../models/User')
const Message = require('../models/Message')

class MessageController {

    static async index() {}

    static async show() {}

    static async store(req, res) {

        const { message } = req.body
        const { user_id } = req.params

        if (!message)
            return res.status(400).json({})

        const userExist = await User.findOne({
            where: { id: user_id },
            attributes: ['id']
        })

        if (!userExist) return res.status(404).json({})

        try {

            if (await Message.create({
                    message,
                    user_id
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

module.exports = MessageController
const User = require('../models/User')
const Message = require('../models/Message')
const { Op } = require("sequelize");

class MessageController {

    static async index(req, res) {
        const to_id = req.userId
        const from_id = req.params.from
        try {
            const messages = await Message.findAll({
                where: {
                    to: {
                        [Op.or]: [to_id, from_id]
                    },
                    from: {
                        [Op.or]: [from_id, to_id]
                    }
                },
                include: [{
                    association: 'user_to',
                    attributes: ['id', 'name', 'img']
                }, {
                    association: 'user_from',
                    attributes: ['id', 'name', 'img']
                }]

            })

            if (messages.lenght < 1)
                return res.status(404).json({ error: 'not message' })

            return res.json(messages)

        } catch (error) {
            return res.status(500).json({ error })
        }
    }

    static async show(req, res) {
        const id = req.userId

        const messages = await Message.findAll({
            where: {
                [Op.or]: [{ to: id }, { from: id }]
            },
            order: [['updatedAt', 'DESC']],
            include: {
                association: 'user_to',
                attributes: ['id', 'name', 'img']
            }
        })

        let dataArray = []
        let newArray = []
        await messages.forEach(async element => {

            await dataArray.push({
                id: element.user_to.id,
                name: element.user_to.name,
                img: element.user_to.img,
                updatedAt: element.updatedAt
            })
        })



        newArray = [
            ...new Map(
                dataArray.map(item => {
                    return [item['id'], item]
                })
            ).values()
        ]

        return res.json(newArray)

        // return res.json(messages)



    }

    static async store(req, res) {

        const { message } = req.body
        const to = req.userId
        const { from } = req.params

        if (!message || !from)
            return res.status(400).json({})

        const userExist = await User.findOne({
            where: { id: to },
            attributes: ['id']
        })

        if (!userExist) return res.status(404).json({ error: 'not has used' })

        try {

            const last_insert = await Message.create({
                message,
                to,
                from: parseInt(from)
            })

            if (last_insert) {

                const messageFind = await Message.findOne({
                    where: {
                        id: last_insert.id
                    },
                    include: [{
                        association: 'user_to',
                        attributes: ['id', 'name', 'img']
                    }, {
                        association: 'user_from',
                        attributes: ['id', 'name', 'img']
                    }]
                })


                return res.status(200).json(messageFind)

            }

        } catch (error) {

            return res.status(500).json({ error })
        }

    }

    static async update() { }

    static async destroy() { }

}

module.exports = MessageController
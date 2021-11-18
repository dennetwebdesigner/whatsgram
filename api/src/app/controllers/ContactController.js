const User = require('../models/User');
const Contact = require('../models/Contact');
const { Op } = require("sequelize");



class ContactController {
    async index(req, res) { }


    static async store(req, res) {

        const to = req.userId
        const from = parseInt(req.params.id)

        if (!to || !from) {
            return res.status(400).json({ error: 'missing contact from' })
        }

        const user = await User.findOne({ where: { id: to } })

        if (!user) {
            return res.status(400).json({ error: 'user not found' })
        }

        const contactExist = await Contact.findOne({
            where: {
                to: {
                    [Op.or]: [to, from]
                },
                from: {
                    [Op.or]: [from, to]
                }
            }
        })

        if (contactExist) {
            return res.status(400).json({ error: 'contact already exists' })
        }

        try {

            const contact = await Contact.create({ from, to, status: 0 })
            return res.json(contact)

        } catch (error) {
            return res.status(500).json({ error: 'server error' })
        }


    }



}

module.exports = ContactController
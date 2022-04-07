const User = require('../models/User');
const Contact = require('../models/Contact');
const { Op } = require("sequelize");



class ContactController {
    static async index(req, res) {

        const id = req.userId

        if (!id) {
            return res.status(400).json({ error: 'missing auth or user' })
        }

        const contacts = await Contact.findAll({
            where: { to: id },
            attributes: ['status'],

            include: [{
                association: 'user-from',
                attributes: ['id', 'name', 'img'],
                order: [['name', 'ASC']],
            }]
        })

        if (!contacts) {
            return res.status(400).json({ error: 'not has contacts' })
        }

        try {
            return res.json(contacts)
        } catch (error) {
            return res.status(500).json({ error: 'server error' })
        }
    }

    static async show(req, res) {
        const id = req.userId
        const from = req.params.id

        if (!id || !from) {
            return res.status(400).json({ error: 'missing user from' })
        }

        try {
            const contacts = await Contact.findOne({
                where: { to: id, from },
                attributes: ['status'],
                include: [{
                    association: 'user-from',
                    attributes: ['id', 'name', 'img']
                }]
            })

            if (!contacts) {
                return res.status(400).json({ error: 'not has contacts' })
            }

            return res.json(contacts)
        } catch (error) {
            return res.status(500).json({ error: 'server error' })
        }
    }



    static async store(req, res) {

        const to = req.userId
        const { email } = req.body



        if (!to || !email) {
            return res.status(400).json({ error: 'missing contact from' })
        }

        const from = await User.findOne({ where: { email }, attributes: ['id'] })


        if (!from) {
            return res.status(400).json({ error: 'user not found' })
        }


        const contactExist = await Contact.findOne({
            where: {
                to,
                from: from.id
            }
        })


        if (contactExist) {
            return res.json({ error: 'contact already exists' })
        }


        try {
            const contact = await Contact.create({ from: from.id, to, status: 0 })
            return res.json(contact)

        } catch (error) {
            return res.status(500).json({ error: 'server error' })
        }


    }



}

module.exports = ContactController
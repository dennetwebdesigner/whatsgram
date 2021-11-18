const { Router } = require('express')
const UserController = require('../app/controllers/UserController')
const MessageController = require('../app/controllers/MessageController')
const authController = require('../app/controllers/AuthController')
const ContactController = require('../app/controllers/ContactController')
const authMiddleware = require('../app/middleware/authMiddleware')


const route = new Router()

route.post('/users', UserController.store)
route.post('/auth', authController.store)


// middleware atuhentication
route.use(authMiddleware)

// validation Credentials
route.get('/auth/validate', authController.index)

// USers
route.get('/users/:id', UserController.show)

// messages
route.get('/messages/:from', MessageController.index)
route.post('/messages/:from', MessageController.store)

route.get('/contacts/:id', ContactController.store)

module.exports = route
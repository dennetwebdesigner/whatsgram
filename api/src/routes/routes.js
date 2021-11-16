const { Router } = require('express')
const UserController = require('../app/controllers/UserController')
const MessageController = require('../app/controllers/MessageController')
const authController = require('../app/controllers/AuthController')
const authMiddleware = require('../app/middleware/authMiddleware')


const route = new Router()

route.post('/users', UserController.store)
route.post('/auth', authController.store)

route.use(authMiddleware)
route.get('/auth/validate', authController.index)

route.get('/messages/:from', MessageController.index)
route.post('/messages/:from', MessageController.store)
route.get('/users/:id', UserController.show)

module.exports = route
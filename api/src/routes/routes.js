const { Router } = require('express')
const UserController = require('../app/controllers/UserController')
const route = new Router()

route.post('/users', UserController.store)

module.exports = route
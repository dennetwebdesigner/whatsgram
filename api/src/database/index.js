const Sequelize = require('sequelize')
const dbconfig = require('../config/database')

const Users = require('../app/models/Users')

class DataBase {
    constructor() {
        this.init()
    }

    init() {
        this.connection = new Sequelize(dbconfig);
        Users.init(this.connection)
    }
}

module.exports = new DataBase()
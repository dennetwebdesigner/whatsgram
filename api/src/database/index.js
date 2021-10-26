const Sequelize = require('sequelize')
const dbconfig = require('../config/database')

class DataBase {
    constructor() {
        this.init()
    }

    init() {
        this.sequelize = new Sequelize(dbconfig);
    }
}

module.exports = new DataBase()
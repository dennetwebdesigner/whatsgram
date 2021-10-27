const Sequelize = require('sequelize')
const dbconfig = require('../config/database')

const Models = require('../app/models')
class DataBase {
    constructor() {
        this.init()
    }

    init() {
        this.connection = new Sequelize(dbconfig);

        Object.keys(Models).map((object, i) => {
            const model = Object.values(Models)[i];
            if (model.init)
                model.init(this.connection)

        })

        Object.keys(Models).forEach((object, i) => {
            const model = Object.values(Models)[i];
            if (model.associate)
                model.associate(this.connection.models)
        })
    }
}

module.exports = new DataBase()
const { Model, DataTypes } = require('sequelize')

class Contact extends Model {

    static init(sequelize) {
        super.init({
            to: DataTypes.INTEGER,
            from: DataTypes.INTEGER,
            status: DataTypes.INTEGER,
        }, { sequelize })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'to', as: 'user-to' })
        this.belongsTo(models.User, { foreignKey: 'from', as: 'user-from' })
    }

}

module.exports = Contact
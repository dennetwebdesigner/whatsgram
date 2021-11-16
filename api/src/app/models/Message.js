const { Model, DataTypes } = require('sequelize')

class Message extends Model {

    static init(sequelize) {
        super.init({
            message: DataTypes.STRING,
            to: DataTypes.INTEGER,
            from: DataTypes.INTEGER,
        }, { sequelize })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'to', as: 'user_to' })
        this.belongsTo(models.User, { foreignKey: 'from', as: 'user_from' })
    }

}

module.exports = Message
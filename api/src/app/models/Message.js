const { Model, DataTypes } = require('sequelize')

class Message extends Model {

    static init(sequelize) {
        super.init({
            message: DataTypes.STRING,
            user_id: DataTypes.INTEGER,
        }, { sequelize })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    }

}

module.exports = Message
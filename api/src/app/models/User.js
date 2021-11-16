const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

class User extends Model {

    static init(sequelize) {

        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            img: DataTypes.STRING,
            password_input: DataTypes.VIRTUAL,
            password: DataTypes.STRING,
        }, { sequelize })

        this.addHook('beforeSave', async user => {
            if (user.password_input) user.password = await bcrypt.hash(user.password_input, 8)
            return this
        })

    }

    async passwordCheck(password) {
        return await bcrypt.compare(password, this.password)
    }

    static associte(models) {
        this.hasMany(models.Messages, { foreignKey: 'to', as: 'messages_to' })
        this.hasMany(models.Messages, { foreignKey: 'from', as: 'messages_from' })

    }

}

module.exports = User
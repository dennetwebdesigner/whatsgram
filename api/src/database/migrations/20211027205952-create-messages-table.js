'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {

        await queryInterface.createTable('messages', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            to: {
                type: Sequelize.INTEGER,
                references: { model: 'users', key: 'id' }
            },
            from: {
                type: Sequelize.INTEGER,
                references: { model: 'users', key: 'id' }
            },
            message: {
                type: Sequelize.STRING,
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('messages');
    }
};
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('contacts', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        AllowNUll: false,
      },
      to: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        allowNull: false
      },
      from: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        allowNull: false
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('contacts');
  }
};

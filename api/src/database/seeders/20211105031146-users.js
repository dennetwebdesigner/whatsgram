'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {

        await queryInterface.bulkInsert('People', [{
                name: 'John Doe',
                email: 'test@test.com',
                password_input: '123456789',
            },
            {
                name: 'Allow Must',
                email: 'testII@test.com',
                password_input: '123456789',
            },
            {
                name: 'Ellen Deb',
                email: 'testIII@test.com',
                password_input: '123456789',
            }
        ], {});

    },

    down: async(queryInterface, Sequelize) => {

        await queryInterface.bulkDelete('People', null, {});

    }
};
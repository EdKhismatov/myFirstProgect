'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Users', [
        {
        username: 'John Doe',
        email: '123@123',
        password: '123'
      },
      {
        username: 'Doe',
        email: '143@123',
        password: '123'
      },
      {
        username: 'John',
        email: '153@123',
        password: '123'
      },
      {
        username: 'AAAA',
        email: '183@123',
        password: '123'
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Users', null, {});

  }
};

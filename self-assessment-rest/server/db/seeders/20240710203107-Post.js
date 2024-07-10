'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Posts', [
        {
          post: 'История 1',
          img: 'asd',
          user_id: 1
        },
        {
          post: 'История 2',
          img: 'asd',
          user_id: 2
        },
        {
          post: 'История 3',
          img: 'asd',
          user_id: 2
        },
        {
          post: 'История 4',
          img: 'asd',
          user_id: 1
        },
        {
          post: 'История 5',
          img: 'asd',
          user_id: 1
        },
        {
          post: 'История 6',
          img: 'asd',
          user_id: 3
        },
    ], {});

  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Posts', null, {});
  }
};

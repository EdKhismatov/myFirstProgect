'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Todos', [
        {
        todo: 'Накормить кота',
        user_id: 1,
        done: false,
      },
      {
        todo: 'Помыть посуду',
        user_id: 1,
        done: false,
      },
      {
        todo: 'Сходить в магаз',
        user_id: 2,
        done: false,
      },
      {
        todo: 'Выгулить собаку',
        user_id: 2,
        done: false,
      },
    ], {});

  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Todos', null, {});

  }
};


'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Characters', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      species: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      origin: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Characters');
  }
};

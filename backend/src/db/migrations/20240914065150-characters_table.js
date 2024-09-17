'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Characters', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
      image: {
        type: Sequelize.STRING,
      },
      favorite: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Characters');
  }
};

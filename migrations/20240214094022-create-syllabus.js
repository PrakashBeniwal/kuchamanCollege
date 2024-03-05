'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('syllabuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      courseId: {
        type: Sequelize.INTEGER
      },
      semesterI: {
        type: Sequelize.TEXT
      },
      semesterII: {
        type: Sequelize.TEXT
      },
      semesterIII: {
        type: Sequelize.TEXT
      },
      semesterIV: {
        type: Sequelize.TEXT
      },
      semesterV: {
        type: Sequelize.TEXT
      },
      semesterVI: {
        type: Sequelize.TEXT
      },
      semesterVII: {
        type: Sequelize.TEXT
      },
      semesterVIII: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('syllabuses');
  }
};
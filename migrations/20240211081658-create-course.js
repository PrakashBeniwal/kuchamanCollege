'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.ENUM('U.G', 'P.G'),
        defaultValue: 'U.G'
      },
      duration: {
        type: Sequelize.INTEGER,
        defaultValue:3
      },
      type: {
        type: Sequelize.ENUM('Semester', 'Annual'),
        defaultValue: 'Annual'
      },
      admissionProcess: {
        type: Sequelize.STRING,
        defaultValue:"Visit College"
      },
      modeOfAdmission: {
        type: Sequelize.ENUM('Online', 'Offline' ,'Online / Offline'),
        defaultValue:'Online / Offline'
      },
      medium: {
        type: Sequelize.ENUM('English', 'Hindi' ,'English/Hindi'),
        defaultValue: 'English/Hindi'
      },
      regFee: {
        type: Sequelize.INTEGER,
        defaultValue:100
      },
      fee: {
        type: Sequelize.INTEGER
      },
      boysFund: {
        type: Sequelize.INTEGER,
        defaultValue:500
      },
      totalFee: {
        type: Sequelize.INTEGER
      },
      DepartmentId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('courses');
  }
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      full_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      biography: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      avatar_url: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.ENUM('MALE', 'FEMALE')
      },
      role: {
        type: Sequelize.ENUM('USER', 'ADMIN')
      },
      token: {
        allowNull: true,
        type: Sequelize.STRING
      },
      is_active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.BIGINT,
        defaultValue: Date.now()
      },
      updated_at: {
        type: Sequelize.BIGINT
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
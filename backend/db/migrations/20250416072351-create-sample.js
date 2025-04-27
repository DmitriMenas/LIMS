'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Samples', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      sample_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // assuming each sample should have a unique identifier
      },
      orderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      sample_type: {
        type: Sequelize.ENUM('Flower', 'Concentrate', 'Injestible', 'Oil'),
        allowNull: false
      },
      test_type: {
        type: Sequelize.ENUM("R&D", "Full Compliance"),
        allowNull: false
      },
      collection_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      received_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'placed', //sample status starts as placed before in progress
      },
      result: {
        type: Sequelize.TEXT,
        allowNull: true, // sample result may not be available immediately
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Samples');
  }
};
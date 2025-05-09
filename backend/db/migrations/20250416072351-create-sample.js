'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


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
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // assumes table is called 'Users'
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      sample_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false, // assuming each sample should have a unique identifier
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
        allowNull: true,
      },
      received_date: {
        type: Sequelize.DATE,
        allowNull: true,
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
    }, options);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Samples');
  }
};
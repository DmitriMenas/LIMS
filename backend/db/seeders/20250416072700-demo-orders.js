'use strict';
const { Order } = require('../models')
const bcrypt = require("bcryptjs");

// Include schema options for production
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableName = process.env.NODE_ENV === 'production' && process.env.SCHEMA
      ? `"${process.env.SCHEMA}"."Orders"`
      : "Orders"

      const ids = [1, 2, 3]

      const [existingIds] = await queryInterface.sequelize.query(
        `SELECT id FROM ${tableName} WHERE id IN (${ids.join(",")});`
      )

      const existingOrderIds = existingIds.map(order => order.id)

      const ordersToCreate = [
        {
          id: 1,
          "userId": 3,
          status: 'placed',
          total_price: 138,
          number_of_samples: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          "userId": 3,
          status: 'in progress',
          total_price: 828,
          number_of_samples: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          "userId": 3,
          status: 'completed',
          total_price: 690,
          number_of_samples: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ].filter(order => !existingOrderIds.includes(order.id))

      if(ordersToCreate.length) {
        return Order.bulkCreate(ordersToCreate, { validate: true})
      } else {
        console.log('All orders already exist, skipping insertion.')
      }

    },

  async down(queryInterface, Sequelize){
    options.tableName = "Orders"
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3]}
    }, {})
  }
};

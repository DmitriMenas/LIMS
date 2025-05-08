/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Orders', [
      {
        userId: 3,
        status: 'placed',
        total_price: 138,
        number_of_samples: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        status: 'in progress',
        total_price: 828,
        number_of_samples: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        status: 'completed',
        total_price: 690,
        number_of_samples: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};

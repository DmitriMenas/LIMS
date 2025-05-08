'use strict';

const { User } = require('../models');
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
      ? `"${process.env.SCHEMA}"."Users"` 
      : "Users";
  
    const usernames = ['DemoUser-1', 'DemoUser-2', 'DemoUser-3'];
  
    const [existingUsers] = await queryInterface.sequelize.query(
      `SELECT username FROM ${tableName} WHERE username IN ('${usernames.join("','")}');`
    );
  
    const existingUsernames = existingUsers.map(user => user.username);
  
    const usersToCreate = [
      {
        id: 1,
        email: 'demo1@user.io',
        username: 'DemoUser-1',
        hashedPassword: bcrypt.hashSync('password1'),
        firstName: 'Demo1',
        lastName: 'User',
        role: 'employee'
      },
      {
        id: 2,
        email: 'demo2@user.io',
        username: 'DemoUser-2',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Demo2',
        lastName: 'User',
        role: 'admin'
      },
      {
        id: 3,
        email: 'demo3@user.io',
        username: 'DemoUser-3',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Demo3',
        lastName: 'User',
        role: 'client'
      },
    ].filter(user => !existingUsernames.includes(user.username));
  
    if (usersToCreate.length) {
      return User.bulkCreate(usersToCreate, { validate: true });
    } else {
      console.log('All users already exist, skipping insertion.');
      return Promise.resolve()
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['DemoUser-1', 'DemoUser-2', 'DemoUser-3'] }
    }, {});
  }
};
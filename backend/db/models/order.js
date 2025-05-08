'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: 'userId' });
      Order.hasMany(models.Sample, { foreignKey: 'orderId' });
    }
  }
  Order.init({
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: 'id'
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    number_of_samples: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
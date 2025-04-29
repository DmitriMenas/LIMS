'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sample extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sample.belongsTo(models.Order, { foreignKey: 'orderId' });
    }
  }
  Sample.init({
    userId: DataTypes.INTEGER,
    sample_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    sample_type: {
      type: DataTypes.ENUM('Flower', 'Concentrate', 'Injestible', 'Oil'),
      allowNull: false,
    },
    test_type: {
      type: DataTypes.ENUM("R&D", 'Full Compliance')
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Orders',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    collection_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    received_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'placed',
    },
    result: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Sample',
  });
  return Sample;
};
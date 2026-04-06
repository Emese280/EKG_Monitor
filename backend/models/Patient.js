const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Patient = sequelize.define(
  'Patient',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'patients',
    timestamps: false,
  }
);

module.exports = Patient;

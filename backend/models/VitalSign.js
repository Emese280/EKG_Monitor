const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Model (MVC - M réteg)
const VitalSign = sequelize.define(
  'VitalSign',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patientId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'APL-001',
    },
    heartRate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    systolic: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    diastolic: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    spo2: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ecgSnapshot: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const raw = this.getDataValue('ecgSnapshot');
        return raw ? JSON.parse(raw) : [];
      },
      set(value) {
        this.setDataValue('ecgSnapshot', JSON.stringify(value));
      },
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'vital_signs',
    timestamps: false,
  }
);

module.exports = VitalSign;

// Controller (MVC - C réteg)
const { Op } = require('sequelize');
const VitalSign = require('../models/VitalSign');

const vitalSignController = {
  // GET /api/vitals/latest
  async getLatest(req, res) {
    try {
      const record = await VitalSign.findOne({
        order: [['timestamp', 'DESC']],
      });
      if (!record) return res.status(404).json({ message: 'Nincs adat.' });
      res.json(record);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET /api/vitals/history?limit=60
  async getHistory(req, res) {
    try {
      const limit = Math.min(parseInt(req.query.limit) || 60, 500);
      const records = await VitalSign.findAll({
        order: [['timestamp', 'DESC']],
        limit,
        attributes: { exclude: ['ecgSnapshot'] },
      });
      res.json(records.reverse());
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET /api/vitals/stats
  async getStats(req, res) {
    try {
      const since = new Date(Date.now() - 5 * 60 * 1000);
      const records = await VitalSign.findAll({
        where: { timestamp: { [Op.gte]: since } },
        attributes: ['heartRate', 'systolic', 'diastolic', 'spo2', 'temperature'],
      });

      if (records.length === 0) {
        return res.json({ message: 'Nincs adat az utóbbi 5 percből.' });
      }

      const avg = (field) =>
        records.reduce((sum, r) => sum + r[field], 0) / records.length;

      res.json({
        windowMinutes: 5,
        recordCount: records.length,
        averages: {
          heartRate: Math.round(avg('heartRate') * 10) / 10,
          systolic: Math.round(avg('systolic') * 10) / 10,
          diastolic: Math.round(avg('diastolic') * 10) / 10,
          spo2: Math.round(avg('spo2') * 10) / 10,
          temperature: Math.round(avg('temperature') * 10) / 10,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = vitalSignController;

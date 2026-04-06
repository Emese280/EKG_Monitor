const Patient = require('../models/Patient');

const patientController = {
  async list(req, res) {
    try {
      const patients = await Patient.findAll({ order: [['id', 'ASC']] });
      res.json(patients);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const { code, name, isActive } = req.body;

      if (!code || !name) {
        return res.status(400).json({ message: 'A code es name kotelezo.' });
      }

      if (isActive) {
        await Patient.update({ isActive: false }, { where: {} });
      }

      const patient = await Patient.create({
        code: String(code).trim(),
        name: String(name).trim(),
        isActive: Boolean(isActive),
      });

      res.status(201).json(patient);
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ message: 'A code mar letezik.' });
      }
      res.status(500).json({ error: err.message });
    }
  },

  async activate(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const patient = await Patient.findByPk(id);

      if (!patient) {
        return res.status(404).json({ message: 'Pacienst nem talaltam.' });
      }

      await Patient.update({ isActive: false }, { where: {} });
      patient.isActive = true;
      await patient.save();

      res.json(patient);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async active(req, res) {
    try {
      const patient = await Patient.findOne({ where: { isActive: true } });
      if (!patient) {
        return res.status(404).json({ message: 'Nincs aktiv paciens.' });
      }
      res.json(patient);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = patientController;

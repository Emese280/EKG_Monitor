// Routes (MVC - router réteg)
const express = require('express');
const router = express.Router();
const vitalSignController = require('../controllers/vitalSignController');

router.get('/latest', vitalSignController.getLatest);
router.get('/history', vitalSignController.getHistory);
router.get('/stats', vitalSignController.getStats);

module.exports = router;

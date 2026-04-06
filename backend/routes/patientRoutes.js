const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.get('/', patientController.list);
router.get('/active', patientController.active);
router.post('/', patientController.create);
router.post('/:id/activate', patientController.activate);

module.exports = router;

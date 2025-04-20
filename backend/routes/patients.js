const express = require('express');
const router = express.Router();
const { createPatient, getAllPatients } = require('../controllers/patients');


router.post('/', createPatient);
router.get('/', getAllPatients);

module.exports = router; 

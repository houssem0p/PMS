const express = require('express');
const router = express.Router();
const { createPatient, getAllPatients } = require('../controllers/patients');

// Create a new patient
router.post('/', createPatient);

// Get all patients
router.get('/', getAllPatients);

module.exports = router;
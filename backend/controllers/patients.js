const Patient = require('../models/patient');

exports.createPatient = async (req, res) => {
    try {
       
        if (!req.body.first_name || !req.body.last_name || !req.body.date_of_birth || !req.body.gender) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const patientId = await Patient.create(req.body);
        res.status(201).json({ id: patientId, message: 'Patient created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create patient' });
    }
};

exports.getAllPatients = async (req, res) => {
    try {
        const { sortBy, sortOrder } = req.query;
        let patients;
        
        if (sortBy) {
            patients = await Patient.findAllSorted(sortBy, sortOrder);
        } else {
            patients = await Patient.findAll();
        }

        res.json(patients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch patients' });
    }
};
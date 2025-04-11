const pool = require('../config/db');

class Patient {
    static async create(patientData) {
        const [result] = await pool.query('INSERT INTO patients SET ?', patientData);
        return result.insertId;
    }

    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM patients ORDER BY last_name, first_name');
        return rows;
    }

    static async findAllSorted(sortBy, sortOrder = 'ASC') {
        const validColumns = ['first_name', 'last_name', 'date_of_birth', 'gender', 'created_at'];
        if (!validColumns.includes(sortBy)) {
            sortBy = 'last_name';
        }
        
        const [rows] = await pool.query(
            `SELECT * FROM patients ORDER BY ${sortBy} ${sortOrder.toUpperCase()}`
        );
        return rows;
    }
}

module.exports = Patient;
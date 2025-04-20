<template>
  <div class="add-patient full-page">
    <h2>Add New Patient</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="patient.first_name" required>
      </div>

      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="patient.last_name" required>
      </div>

      <div class="form-group">
        <label for="dob">Date of Birth:</label>
        <input type="date" id="dob" v-model="patient.date_of_birth" required>
      </div>

      <div class="form-group">
        <label>Gender:</label>
        <div class="radio-group">
          <label><input type="radio" v-model="patient.gender" value="Male" required> Male</label>
          <label><input type="radio" v-model="patient.gender" value="Female"> Female</label>
        </div>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="patient.email">
      </div>

      <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" v-model="patient.phone">
      </div>

      <div class="form-group">
        <label for="address">Address:</label>
        <textarea id="address" v-model="patient.address"></textarea>
      </div>

      <button type="submit" class="submit-btn">Add Patient</button>

      <div v-if="error" class="error-message">{{ error }}</div>
      <div v-if="success" class="success-message">Patient added successfully!</div>
    </form>
  </div>
</template>

<script>
import './AddPatient.css'
export default {
  name: 'AddPatient',
  data() {
    return {
      patient: {
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        email: '',
        phone: '',
        address: ''
      },
      error: '',
      success: false
    };
  },
  methods: {
    async submitForm() {
      this.error = '';
      this.success = false;

      try {
        const response = await fetch('http://localhost:5000/api/patients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.patient)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to add patient');
        }

        this.success = true;
        this.resetForm();
        this.$emit('patient-added');
      } catch (err) {
        this.error = err.message;
      }
    },
    resetForm() {
      this.patient = {
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        email: '',
        phone: '',
        address: ''
      };
    }
  }
};
</script>

<template>
  <div class="patient-list">
    <h2>Patient List</h2>

    <div class="sort-controls">
      <label>Sort by:</label>
      <select v-model="sortBy" @change="fetchPatients">
        <option value="last_name">Last Name</option>
        <option value="first_name">First Name</option>
        <option value="date_of_birth">Date of Birth</option>
        <option value="gender">Gender</option>
        <option value="created_at">Date Added</option>
      </select>

      <label>Order:</label>
      <select v-model="sortOrder" @change="fetchPatients">
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
    </div>

    <div v-if="loading" class="loading">Loading patients...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="patients.length === 0" class="no-patients">No patients found.</div>
    <table v-else class="patients-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date of Birth</th>
          <th>Gender</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="patient in patients" :key="patient.id">
          <td>{{ patient.id }}</td>
          <td>{{ patient.first_name }}</td>
          <td>{{ patient.last_name }}</td>
          <td>{{ formatDate(patient.date_of_birth) }}</td>
          <td>{{ patient.gender }}</td>
          <td>{{ patient.email || '-' }}</td>
          <td>{{ patient.phone || '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import './PatientList.css'
export default {
  name: 'PatientList',
  data() {
    return {
      patients: [],
      loading: true,
      error: '',
      sortBy: 'last_name',
      sortOrder: 'ASC'
    };
  },
  created() {
    this.fetchPatients();
  },
  methods: {
    async fetchPatients() {
      this.loading = true;
      this.error = '';

      try {
        const response = await fetch(
          `http://localhost:5000/api/patients?sortBy=${this.sortBy}&sortOrder=${this.sortOrder}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }

        this.patients = await response.json();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      if (!dateString) return '-';
      const date = new Date(dateString);
      return date.toLocaleDateString();
    }
  }
};
</script>

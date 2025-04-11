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

<style scoped>
.patient-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(229, 231, 235, 0.5);
}

h2 {
  color: #1e293b;
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  background: linear-gradient(90deg, #3b82f6 0%, #6366f1 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.sort-controls {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  background-color: #f8fafc;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(226, 232, 240, 0.5);
}

.sort-controls label {
  font-weight: 600;
  color: #334155;
  font-size: 0.9375rem;
  display: flex;
  align-items: center;
}

.sort-controls select {
  padding: 0.625rem 1rem;
  font-size: 0.9375rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 200px;
  background-color: #ffffff;
  cursor: pointer;
}

.sort-controls select:focus {
  border-color: #93c5fd;
  outline: none;
  box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.3);
}

.loading,
.error,
.no-patients {
  padding: 1.25rem;
  text-align: center;
  border-radius: 12px;
  background-color: #ffffff;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(226, 232, 240, 0.5);
}

.loading {
  color: #64748b;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
}

.error {
  color: #dc2626;
  background-color: #fef2f2;
  border-color: #fecaca;
}

.no-patients {
  color: #475569;
  background-color: #f8fafc;
}

.patients-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.patients-table th,
.patients-table td {
  padding: 1rem 1.25rem;
  text-align: left;
  font-size: 0.9375rem;
  border-bottom: 1px solid #f1f5f9;
}

.patients-table th {
  background-color: #f8fafc;
  color: #334155;
  font-weight: 600;
  position: sticky;
  top: 0;
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.05);
}

.patients-table tr:last-child td {
  border-bottom: none;
}

.patients-table tr:hover td {
  background-color: #f8fafc;
}

.patients-table td {
  color: #475569;
  transition: background-color 0.2s ease;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-active {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  background-color: #dcfce7;
  color: #166534;
  font-size: 0.8125rem;
  font-weight: 500;
}

.status-inactive {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  background-color: #fee2e2;
  color: #991b1b;
  font-size: 0.8125rem;
  font-weight: 500;
}

.action-btn {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  color: #334155;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
}

.action-btn:hover {
  background-color: #f1f5f9;
  transform: translateY(-1px);
}

.action-btn-primary {
  background-color: #3b82f6;
  color: #ffffff;
  border-color: #3b82f6;
}

.action-btn-primary:hover {
  background-color: #2563eb;
}

/* Responsive Design */
@media (max-width: 768px) {
  .patient-list {
    padding: 1.25rem;
  }
  
  .sort-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .sort-controls select {
    width: 100%;
  }
  
  .patients-table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
  
  .patients-table th,
  .patients-table td {
    padding: 0.75rem;
  }
}

/* Loading animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.loading-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: #94a3b8;
  animation: pulse 1.5s ease-in-out infinite;
}

.loading-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dot:nth-child(3) {
  animation-delay: 0.4s;
}
</style>
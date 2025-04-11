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
          <label><input type="radio" v-model="patient.gender" value="Other"> Other</label>
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

<style scoped>
.full-page {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f0f4f8 0%, #f8fafc 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.add-patient {
  max-width: 720px;
  margin: 0 auto;
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 
    0 10px 25px -5px rgba(0, 0, 0, 0.05),
    0 8px 16px -8px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(229, 231, 235, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.add-patient:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.08),
    0 10px 16px -8px rgba(0, 0, 0, 0.05);
}

h2 {
  color: #1e293b;
  margin-bottom: 1.75rem;
  text-align: center;
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  background: linear-gradient(90deg, #3b82f6 0%, #6366f1 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #334155;
  font-size: 0.9375rem;
}

input[type="text"],
input[type="date"],
input[type="email"],
input[type="tel"],
textarea,
select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.9375rem;
  background-color: #f8fafc;
}

input:focus, 
textarea:focus,
select:focus {
  border-color: #93c5fd;
  outline: none;
  box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.3);
  background-color: #ffffff;
}

.radio-group {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
}

.radio-group label {
  display: flex;
  align-items: center;
  font-weight: 400;
  cursor: pointer;
  transition: color 0.2s ease;
  color: #64748b;
}

.radio-group input {
  margin-right: 0.5rem;
  accent-color: #3b82f6;
}

.radio-group label:hover {
  color: #334155;
}

.submit-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  width: 100%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 0.5rem;
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.15);
  position: relative;
  overflow: hidden;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px rgba(59, 130, 246, 0.25);
}

.submit-btn:hover::before {
  opacity: 1;
}

.submit-btn:active {
  transform: translateY(0);
}

.error-message {
  color: #ef4444;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem;
  background-color: #fee2e2;
  border-radius: 6px;
}

.success-message {
  color: #10b981;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem;
  background-color: #d1fae5;
  border-radius: 6px;
}

/* Floating label animation */
.form-group.focused label {
  transform: translateY(-0.5rem);
  font-size: 0.8125rem;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .full-page {
    padding: 1.25rem;
  }
  
  .add-patient {
    padding: 1.5rem;
    border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  
  .radio-group {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
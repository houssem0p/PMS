<template>
  <div id="app">
    <header class="header">
      <div class="header-content">
        <h1>🩺 Patient Management System</h1>
        <nav>
          <button
            @click="currentView = 'add-patient'"
            :class="{ active: currentView === 'add-patient' }"
          >
            ➕ Add Patient
          </button>
          <button
            @click="currentView = 'patient-list'"
            :class="{ active: currentView === 'patient-list' }"
          >
            📋 View All Patients
          </button>
        </nav>
      </div>
    </header>

    <main>
      <div v-if="currentView === 'intro'" class="intro-text">
        <h2>Welcome to the Patient Management System</h2>
        <p>Efficiently manage patient information and keep track of all records in one place.</p>
        <p>Choose an option below to get started:</p>
      </div>

      <transition name="fade" mode="out-in">
        <component
          v-if="currentView !== 'intro'"
          :is="currentViewComponent"
          :key="listKey"
          @patient-added="handlePatientAdded"
        />
      </transition>
    </main>
  </div>
</template>

<script>
import AddPatient from './components/AddPatient.vue'
import PatientList from './components/PatientList.vue'

export default {
  name: 'App',
  components: { AddPatient, PatientList },
  data() {
    return {
      currentView: 'intro',
      listKey: 0
    }
  },
  computed: {
    currentViewComponent() {
      return this.currentView === 'add-patient' ? 'AddPatient' : 'PatientList'
    }
  },
  methods: {
    handlePatientAdded() {
      this.currentView = 'patient-list'
      this.listKey += 1
    }
  }
}
</script>

<style>
#app {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #f9fafb;
  min-height: 100vh;
}

.header {
  background: #fff;
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 32px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  color: #111827;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-content h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.2;
  transition: transform 0.3s ease;
}

.header-content h1:hover {
  transform: scale(1.02);
}

nav {
  margin-top: 24px;
  display: flex;
  gap: 16px;
}

nav button {
  background-color: #4f46e5;
  color: #fff;
  border: none;
  padding: 12px 24px;
  font-size: 0.95rem;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  font-weight: 600;
}

nav button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

nav button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

main {
  background: #fff;
  padding: 32px;
  border-radius: 24px;
  min-height: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.03);
  border: 1px solid #e5e7eb;
  animation: fadeIn 0.6s ease;
  transition: box-shadow 0.3s ease;
}

main:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.intro-text {
  text-align: center;
  margin-bottom: 40px;
}

.intro-text h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 16px;
}

.intro-text p {
  font-size: 1.1rem;
  color: #4b5563;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .header-content {
    align-items: flex-start;
  }

  nav {
    flex-direction: column;
    width: 100%;
  }

  nav button {
    width: 100%;
  }

  .intro-text h2 {
    font-size: 1.75rem;
  }

  main {
    padding: 24px;
  }
}

button:focus, input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
}
</style>

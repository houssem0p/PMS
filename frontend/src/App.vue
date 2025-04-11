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
        <p>Efficiently manage patient information, schedule appointments, and keep track of all records in one place. It's simple, fast, and secure.</p>
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
  components: {
    AddPatient,
    PatientList
  },
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
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9fafb;
  min-height: 100vh;
}

/* Header - Glass Morphism Effect */
.header {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 32px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.18);
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
  font-weight: 800;
  letter-spacing: -0.025em;
  background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

nav {
  margin-top: 24px;
  display: flex;
  gap: 16px;
}

nav button {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 0.95rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(99, 102, 241, 0.15);
  position: relative;
  overflow: hidden;
}

nav button::before {
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

nav button:hover::before {
  opacity: 1;
}

nav button.active {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  box-shadow: 0 10px 15px rgba(79, 70, 229, 0.3);
  transform: translateY(-2px);
}

nav button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px rgba(99, 102, 241, 0.3);
}

/* Main Content - Neumorphism Inspired */
main {
  background: #ffffff;
  padding: 32px;
  border-radius: 24px;
  min-height: 400px;
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.03),
    0 1px 2px rgba(0, 0, 0, 0.03);
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(229, 231, 235, 0.5);
  transition: all 0.3s ease;
}

main:hover {
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.05),
    0 5px 10px rgba(0, 0, 0, 0.03);
}

/* Intro Text */
.intro-text {
  text-align: center;
  margin-bottom: 40px;
}

.intro-text h2 {
  font-size: 2.25rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 16px;
  line-height: 1.2;
}

.intro-text p {
  font-size: 1.125rem;
  color: #4b5563;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Premium Details */
.divider {
  height: 1px;
  background: linear-gradient(90deg, rgba(229,231,235,0) 0%, rgba(156,163,175,0.5) 50%, rgba(229,231,235,0) 100%);
  margin: 32px 0;
}

/* Animations */
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

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

/* Responsive Design */
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

/* Micro-interactions */
button, a {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus states */
button:focus, input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
}
</style>

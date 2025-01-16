<!-- LoginView.vue -->
<template>
    <div class="login-container">
      <div class="login-form-container">
        <h1>Iniciar Sesión</h1>
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label>Usuario:</label>
            <input 
              v-model="formData.usuario"
              type="text"
              :class="{ 'error': errors.usuario }"
              placeholder="Ingrese su usuario"
            >
            <span v-if="errors.usuario" class="error-message">
              {{ errors.usuario }}
            </span>
          </div>
  
          <div class="form-group">
            <label>Contraseña:</label>
            <input 
              v-model="formData.password"
              type="password"
              :class="{ 'error': errors.password }"
              placeholder="Ingrese su contraseña"
            >
            <span v-if="errors.password" class="error-message">
              {{ errors.password }}
            </span>
          </div>
  
          <div v-if="loginError" class="error-message login-error">
            {{ loginError }}
          </div>
  
          <button type="submit" class="login-button" :disabled="isLoading">
            {{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/adminStore'
  
  const router = useRouter()
  const authStore = useAuthStore()
  const isLoading = ref(false)
  const loginError = ref('')
  
  const formData = reactive({
    usuario: '',
    password: ''
  })
  
  const errors = reactive({
    usuario: '',
    password: ''
  })
  
  const validateForm = () => {
    let isValid = true
    errors.usuario = ''
    errors.password = ''
  
    if (!formData.usuario) {
      errors.usuario = 'El usuario es requerido'
      isValid = false
    } else if (formData.usuario.length < 3) {
      errors.usuario = 'El usuario debe tener al menos 3 caracteres'
      isValid = false
    }
  
    if (!formData.password) {
      errors.password = 'La contraseña es requerida'
      isValid = false
    } else if (formData.password.length < 4) {
      errors.password = 'La contraseña debe tener al menos 4 caracteres'
      isValid = false
    }
  
    return isValid
  }
  
  const handleLogin = async () => {
    if (!validateForm()) return
  
    loginError.value = ''
    isLoading.value = true
  
    try {
      const success = await authStore.iniciarSesion(formData.usuario, formData.password)
      if (success) {
        router.push('/adminView')
      } else {
        loginError.value = 'Usuario o contraseña incorrectos'
      }
    } catch (error) {
      loginError.value = 'Error al iniciar sesión. Por favor, intente nuevamente.'
      console.error('Error en login:', error)
    } finally {
      isLoading.value = false
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    min-height: 100vh;
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('@/assets/img/guia-showDelfin.jpg');
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  
  .login-form-container {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 40px;
    border-radius: 10px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    color: white;
    text-align: center;
    margin-bottom: 30px;
    font-size: 2em;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  label {
    color: white;
    font-size: 1.1em;
  }
  
  input {
    padding: 12px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 1em;
  }
  
  input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  input:focus {
    outline: none;
    border-color: white;
  }
  
  .error {
    border-color: #ff4444 !important;
  }
  
  .error-message {
    color: #ff4444;
    font-size: 0.9em;
  }
  
  .login-error {
    text-align: center;
    padding: 10px;
    background: rgba(255, 68, 68, 0.1);
    border-radius: 5px;
  }
  
  .login-button {
    background: #4CAF50;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1em;
    transition: background-color 0.3s;
  }
  
  .login-button:hover {
    background: #45a049;
  }
  
  .login-button:disabled {
    background: #666;
    cursor: not-allowed;
  }
  </style>
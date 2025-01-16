<!-- FAQsManager.vue -->
<template>
    <section class="info">
      <div class="faqs-container">
        <div class="header-actions">
          <h1>Gestión de Preguntas Frecuentes</h1>
        </div>
        <div class="button-container">
          <button @click="openModal('add')" class="btn-primary">
            Añadir Pregunta
          </button>
        </div>
  
        <table class="faqs-table">
          <thead>
            <tr>
              <th>Pregunta</th>
              <th>Respuesta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pregunta in preguntas" :key="pregunta.id">
              <td>{{ pregunta.pregunta }}</td>
              <td>{{ pregunta.respuesta }}</td>
              <td class="actions">
                <button @click="openModal('edit', pregunta)" class="btn-edit">
                  Editar
                </button>
                <button @click="eliminarPregunta(pregunta.id)" class="btn-delete">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
  
        <!-- Modal para añadir/editar -->
        <div v-if="showModal" class="modal">
          <div class="modal-content">
            <h3>{{ modalMode === 'add' ? 'Añadir' : 'Editar' }} Pregunta</h3>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label>Pregunta:</label>
                <input 
                  v-model="formData.pregunta"
                  type="text"
                  :class="{ 'error': errors.pregunta }"
                >
                <span v-if="errors.pregunta" class="error-message">
                  {{ errors.pregunta }}
                </span>
              </div>
              
              <div class="form-group">
                <label>Respuesta:</label>
                <textarea 
                  v-model="formData.respuesta"
                  :class="{ 'error': errors.respuesta }"
                ></textarea>
                <span v-if="errors.respuesta" class="error-message">
                  {{ errors.respuesta }}
                </span>
              </div>
  
              <div class="modal-actions">
                <button type="submit" class="btn-primary">
                  {{ modalMode === 'add' ? 'Añadir' : 'Guardar' }}
                </button>
                <button type="button" @click="closeModal" class="btn-secondary">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, reactive, computed, onMounted } from 'vue'
  import { usePreguntasStore } from '@/stores/adminStore'
  
  const store = usePreguntasStore()

  // Función para cargar las preguntas
const cargarPreguntas = async () => {
  try {
    await store.obtenerPreguntas()
  } catch (error) {
    console.error('Error al cargar las preguntas:', error)
  }
}

// Cargar preguntas al montar el componente
onMounted(() => {
  cargarPreguntas()
})

  const preguntas = computed(() => store.preguntas)
  
  const showModal = ref(false)
  const modalMode = ref('add')
  const selectedPregunta = ref(null)
  
  const formData = reactive({
    pregunta: '',
    respuesta: ''
  })
  
  const errors = reactive({
    pregunta: '',
    respuesta: ''
  })
  
  const validateForm = () => {
    let isValid = true
    errors.pregunta = ''
    errors.respuesta = ''
  
    if (!formData.pregunta) {
      errors.pregunta = 'La pregunta es requerida'
      isValid = false
    } else if (formData.pregunta.length < 8) {
      errors.pregunta = 'La pregunta debe tener al menos 8 caracteres'
      isValid = false
    }
  
    if (!formData.respuesta) {
      errors.respuesta = 'La respuesta es requerida'
      isValid = false
    } else if (formData.respuesta.length < 8) {
      errors.respuesta = 'La respuesta debe tener al menos 8 caracteres'
      isValid = false
    }
  
    return isValid
  }
  
  const openModal = (mode, pregunta = null) => {
    modalMode.value = mode
    if (mode === 'edit' && pregunta) {
      selectedPregunta.value = pregunta
      formData.pregunta = pregunta.pregunta
      formData.respuesta = pregunta.respuesta
    } else {
      formData.pregunta = ''
      formData.respuesta = ''
    }
    showModal.value = true
  }
  
  const closeModal = () => {
    showModal.value = false
    selectedPregunta.value = null
    formData.pregunta = ''
    formData.respuesta = ''
    errors.pregunta = ''
    errors.respuesta = ''
  }
  
  const handleSubmit = async () => {
    if (!validateForm()) return
  
    try {
      if (modalMode.value === 'add') {
        await store.agregarPregunta({
          pregunta: formData.pregunta,
          respuesta: formData.respuesta
        })
      } else {
        await store.actualizarPregunta(
          selectedPregunta.value.id,
          {
            pregunta: formData.pregunta,
            respuesta: formData.respuesta
          }
        )
      }
      closeModal()
    } catch (error) {
      console.error('Error al guardar la pregunta:', error)
    }
  }
  
  const eliminarPregunta = async (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta pregunta?')) {
      try {
        await store.eliminarPregunta(id)
      } catch (error) {
        console.error('Error al eliminar la pregunta:', error)
      }
    }
  }
  </script>
  
  <style scoped>
  .info {
    background: linear-gradient(rgba(31, 31, 31, 0.7), rgba(31, 31, 31, 0.7)), url('../assets/img/fondo-info.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 50px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
  }
  
  .faqs-container {
    padding: 20px;
    width: 100%;
    max-width: 1200px;
    color: white;
  }
  
  .header-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .header-actions h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
  
  .faqs-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin-top: 20px;
  }
  
  .faqs-table th,
  .faqs-table td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    font-size: 1.1em;
    vertical-align: middle;
  }
  
  .faqs-table th {
    font-size: 1.2em;
    font-weight: bold;
  }
  
  .actions {
    display: flex;
    gap: 10px;
    justify-content: flex-start;
    width: 200px;
    min-width: 200px;
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: #2a2a2a;
    color: white;
    padding: 30px;
    border-radius: 8px;
    min-width: 500px;
    max-width: 90%;
  }
  
  .modal-content h3 {
    font-size: 1.5em;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-size: 1.1em;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #444;
    border-radius: 4px;
    background-color: #333;
    color: white;
  }
  
  .form-group textarea {
    min-height: 120px;
    resize: vertical;
  }
  
  .error {
    border-color: #ff4444 !important;
  }
  
  .error-message {
    color: #ff4444;
    font-size: 0.9em;
    margin-top: 5px;
  }
  
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 30px;
  }
  
  .btn-primary {
    background-color: #4CAF50;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.1em;
    transition: background-color 0.3s;
  }
  
  .btn-primary:hover {
    background-color: #45a049;
  }
  
  .btn-secondary {
    background-color: #666;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.1em;
    transition: background-color 0.3s;
  }
  
  .btn-secondary:hover {
    background-color: #555;
  }
  
  .btn-edit,
  .btn-delete {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s;
    min-width: 80px;
  }
  
  .btn-edit {
    background-color: #2196F3;
    color: white;
  }
  
  .btn-edit:hover {
    background-color: #1976D2;
  }
  
  .btn-delete {
    background-color: #f44336;
    color: white;
  }
  
  .btn-delete:hover {
    background-color: #d32f2f;
  }
  </style>
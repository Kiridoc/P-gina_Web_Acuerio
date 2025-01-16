<!-- EventosManager.vue -->
<template>
    <section class="info">
      <div class="eventos-container">
        <div class="header-actions">
          <h1>Gestión de Eventos</h1>
        </div>
        <div class="button-container">
          <button @click="openModal('add')" class="btn-primary" :disabled="eventos.length >= 4">
            Añadir Evento
          </button>
          <span v-if="eventos.length >= 4" class="max-events-warning">
            Máximo de eventos alcanzado (4)
          </span>
        </div>
  
        <table class="eventos-table">
          <thead>
            <tr>
              <th>Nombre Evento</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="evento in eventos" :key="evento.id">
              <td>{{ evento.nombre_evento }}</td>
              <td>{{ evento.titulo }}</td>
              <td>{{ evento.descripcion }}</td>
              <td>{{ formatDate(evento.fecha) }}</td>
              <td>
                <div class="image-preview">
                  <img v-if="isValidImageUrl(evento.imagen)" :src="evento.imagen" alt="Preview">
                  <span v-else-if="evento.imagen">NO DISPONIBLE</span>
                  <span v-else>SIN IMAGEN</span>
                </div>
              </td>
              <td class="actions">
                <button @click="openModal('edit', evento)" class="btn-edit">
                  Editar
                </button>
                <button @click="eliminarEvento(evento.id)" class="btn-delete">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
  
        <!-- Modal para añadir/editar -->
        <div v-if="showModal" class="modal">
          <div class="modal-content">
            <h3>{{ modalMode === 'add' ? 'Añadir' : 'Editar' }} Evento</h3>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label>Nombre del Evento:</label>
                <input 
                  v-model="formData.nombre_evento"
                  type="text"
                  :class="{ 'error': errors.nombre_evento }"
                >
                <span v-if="errors.nombre_evento" class="error-message">
                  {{ errors.nombre_evento }}
                </span>
              </div>
  
              <div class="form-group">
                <label>Título:</label>
                <input 
                  v-model="formData.titulo"
                  type="text"
                  :class="{ 'error': errors.titulo }"
                >
                <span v-if="errors.titulo" class="error-message">
                  {{ errors.titulo }}
                </span>
              </div>
  
              <div class="form-group">
                <label>Descripción:</label>
                <textarea 
                  v-model="formData.descripcion"
                  :class="{ 'error': errors.descripcion }"
                ></textarea>
                <span v-if="errors.descripcion" class="error-message">
                  {{ errors.descripcion }}
                </span>
              </div>
  
              <div class="form-group">
                <label>Fecha:</label>
                <input 
                  v-model="formData.fecha"
                  type="date"
                  :min="minDate"
                  :class="{ 'error': errors.fecha }"
                >
                <span v-if="errors.fecha" class="error-message">
                  {{ errors.fecha }}
                </span>
              </div>
  
              <div class="form-group">
                <label>URL de la Imagen:</label>
                <input 
                  v-model="formData.imagen"
                  type="text"
                  placeholder="URL de la imagen (opcional)"
                >
                <div v-if="formData.imagen" class="image-preview">
                  <img v-if="isValidImageUrl(formData.imagen)" :src="formData.imagen" alt="Preview">
                  <span v-else>NO DISPONIBLE</span>
                </div>
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
  import { useEventosStore } from '@/stores/adminStore'
  
  const store = useEventosStore()
  
  // Función para cargar los eventos
  const cargarEventos = async () => {
    try {
      await store.obtenerEventos()
    } catch (error) {
      console.error('Error al cargar los eventos:', error)
    }
  }
  
  // Cargar eventos al montar el componente
  onMounted(() => {
    cargarEventos()
  })
  
  const eventos = computed(() => store.eventos)
  
  const showModal = ref(false)
  const modalMode = ref('add')
  const selectedEvento = ref(null)
  
  // Obtener fecha mínima (3 días después de hoy)
  const getMinDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 3)
    return date.toISOString().split('T')[0]
  }
  
  const minDate = computed(() => getMinDate())
  
  const formData = reactive({
    nombre_evento: '',
    titulo: '',
    descripcion: '',
    fecha: getMinDate(),
    imagen: ''
  })
  
  const errors = reactive({
    nombre_evento: '',
    titulo: '',
    descripcion: '',
    fecha: ''
  })
  
  const isValidImageUrl = (url) => {
    if (!url) return false
    return url.match(/^https:\/\/raw\.githubusercontent\.com\/.*$/i)
  }
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString()
  }
  
  const validateForm = () => {
    let isValid = true
    errors.nombre_evento = ''
    errors.titulo = ''
    errors.descripcion = ''
    errors.fecha = ''
  
    if (!formData.nombre_evento.trim()) {
      errors.nombre_evento = 'El nombre del evento es requerido'
      isValid = false
    }
  
    if (!formData.titulo.trim()) {
      errors.titulo = 'El título es requerido'
      isValid = false
    }
  
    if (!formData.descripcion.trim()) {
      errors.descripcion = 'La descripción es requerida'
      isValid = false
    }
  
    if (!formData.fecha || new Date(formData.fecha) < new Date(minDate.value)) {
      errors.fecha = 'La fecha debe ser al menos 3 días después de hoy'
      isValid = false
    }
  
    return isValid
  }
  
  const openModal = (mode, evento = null) => {
    if (mode === 'add' && eventos.value.length >= 4) {
      alert('No se pueden agregar más eventos. Máximo permitido: 4')
      return
    }
  
    modalMode.value = mode
    if (mode === 'edit' && evento) {
      selectedEvento.value = evento
      formData.nombre_evento = evento.nombre_evento
      formData.titulo = evento.titulo
      formData.descripcion = evento.descripcion
      formData.fecha = evento.fecha
      formData.imagen = evento.imagen || ''
    } else {
      formData.nombre_evento = ''
      formData.titulo = ''
      formData.descripcion = ''
      formData.fecha = getMinDate()
      formData.imagen = ''
    }
    showModal.value = true
  }
  
  const closeModal = () => {
    showModal.value = false
    selectedEvento.value = null
    formData.nombre_evento = ''
    formData.titulo = ''
    formData.descripcion = ''
    formData.fecha = getMinDate()
    formData.imagen = ''
    Object.keys(errors).forEach(key => errors[key] = '')
  }
  
  const handleSubmit = async () => {
    if (!validateForm()) return
  
    try {
      if (modalMode.value === 'add') {
        await store.agregarEvento({
          nombre_evento: formData.nombre_evento,
          titulo: formData.titulo,
          descripcion: formData.descripcion,
          fecha: formData.fecha,
          imagen: formData.imagen
        })
      } else {
        await store.actualizarEvento(
          selectedEvento.value.id,
          {
            nombre_evento: formData.nombre_evento,
            titulo: formData.titulo,
            descripcion: formData.descripcion,
            fecha: formData.fecha,
            imagen: formData.imagen
          }
        )
      }
      closeModal()
    } catch (error) {
      console.error('Error al guardar el evento:', error)
    }
  }
  
  const eliminarEvento = async (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      try {
        await store.eliminarEvento(id)
      } catch (error) {
        console.error('Error al eliminar el evento:', error)
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
  
  .eventos-container {
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
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-bottom: 30px;
  }
  
  .max-events-warning {
    color: #ff4444;
    font-size: 0.9em;
  }
  
  .eventos-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin-top: 20px;
  }
  
  .eventos-table th,
  .eventos-table td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    font-size: 1.1em;
  }
  
  .image-preview {
    max-width: 100px;
    max-height: 100px;
    overflow: hidden;
  }
  
  .image-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
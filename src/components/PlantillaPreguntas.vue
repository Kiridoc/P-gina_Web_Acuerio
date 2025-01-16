<template>
  <section id="manage-pyr" class="info">
    <div class="container-fluid px-3 mx-3">
      <h1 class="text-center my-5">Administración de Preguntas Frecuentes</h1>

      <!-- Formulario para añadir preguntas -->
      <div class="form-group my-4">
        <label for="newQuestion">Nueva Pregunta</label>
        <input 
          id="newQuestion" 
          v-model="newQuestion" 
          type="text" 
          class="form-control" 
          placeholder="Ingrese la pregunta" 
          :disabled="preguntas.length >= maxQuestions"
        />
      </div>

      <div class="form-group my-4">
        <label for="newAnswer">Nueva Respuesta</label>
        <textarea 
          id="newAnswer" 
          v-model="newAnswer" 
          class="form-control" 
          placeholder="Ingrese la respuesta" 
          :disabled="preguntas.length >= maxQuestions"
        ></textarea>
      </div>

      <button 
        class="btn btn-primary my-2" 
        @click="addPregunta" 
        :disabled="!newQuestion || !newAnswer || preguntas.length >= maxQuestions"
      >
        Añadir Pregunta
      </button>

      <!-- Tabla de preguntas -->
      <div class="table-responsive">
        <table class="table table-bordered my-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Pregunta</th>
              <th>Respuesta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pregunta, index) in preguntas" :key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <input 
                  v-model="pregunta.pregunta" 
                  @input="updatePregunta(index, 'pregunta', pregunta.pregunta)"
                  type="text" 
                  class="form-control" 
                />
              </td>
              <td>
                <textarea 
                  v-model="pregunta.respuesta" 
                  @input="updatePregunta(index, 'respuesta', pregunta.respuesta)"
                  class="form-control"
                ></textarea>
              </td>
              <td>
                <button class="btn btn-danger" @click="removePregunta(index)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="text-muted registradas">
        {{ preguntas.length }}/{{ maxQuestions }} preguntas registradas.
      </div>
    </div>   
  </section>
</template>

<script>
import { usePreguntasStore } from '../stores/adminStore.js';

export default {
  data() {
    return {
      newQuestion: "",
      newAnswer: "",
      maxQuestions: 6,
    };
  },
  computed: {
    preguntas() {
      const store = usePreguntasStore();
      return store.preguntas;
    },
  },
  methods: {
    async addPregunta() {
      const store = usePreguntasStore();
      await store.agregarPregunta({ pregunta: this.newQuestion, respuesta: this.newAnswer });
      this.newQuestion = "";
      this.newAnswer = "";
    },
    async removePregunta(index) {
      const store = usePreguntasStore();
      const id = this.preguntas[index].id;
      await store.eliminarPregunta(id);
    },
    async updatePregunta(index) {
      const store = usePreguntasStore();
      const preguntaActualizada = this.preguntas[index];
      await store.actualizarPregunta(preguntaActualizada.id, preguntaActualizada);
    },
  },
  async created() {
    const store = usePreguntasStore();
    await store.obtenerPreguntas();
  }
};
</script>

<style scoped>
/* Ajustes globales para la estructura */
.container-fluid {
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrar el contenido horizontalmente */
}

.info {
  background: linear-gradient(rgba(31, 31, 31, 0.7), rgba(31, 31, 31, 0.7)), url('../assets/img/fondo-info.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 50px 15px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrar el contenido */
}

/* Títulos */
h1, label {
  color: #EBE9F6;
}

/* Estilo de los campos de entrada */
input[type="text"], 
textarea {
  background-color: white; /* Fondo blanco constante */
  border: 1px solid rgba(0, 0, 0, 0.2); /* Borde gris suave */
  margin-bottom: 10px;
  padding: 10px;
  width: 100%; /* Se asegura de que los campos ocupen todo el ancho disponible */
  max-width: 600px; /* Limitar el ancho máximo para pantallas grandes */
  color: black; /* Texto negro permanente */
}

input[type="text"]:focus, 
textarea:focus {
  outline: none;
  border-color: rgba(0, 0, 0, 0.2);
  background-color: white;
}

/* Botones */
.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-danger {
  background-color: #6c757d;
  border-color: #6c757d;
  color: white;
}

.btn-danger:hover {
  background-color: #5a6268;
  border-color: #545b62;
}

/* Tabla responsiva */
.table-responsive {
  overflow-x: auto;
  max-width: 100%;
  margin: 0 auto;
}

/* Ajustes para móviles */
@media (max-width: 768px) {
  .container-fluid {
    padding: 0 10px;
  }

  h1 {
    font-size: 1.5rem; /* Reducir el tamaño del título en móviles */
  }

  .form-group label {
    font-size: 1rem; /* Reducir tamaño de las etiquetas */
  }

  .table {
    font-size: 0.9rem; /* Reducir tamaño de la tabla */
  }

  .btn {
    font-size: 0.85rem; /* Reducir tamaño de los botones */
  }
}
</style>

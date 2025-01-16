<template>
  <div class="correo-admin-container">
    <v-container class="panel-blur">
      <h1 class="titulo">Gestor de Correos</h1>

      <!-- Tabla de correos recibidos -->
      <v-data-table
        :headers="headers"
        :items="correos"
        class="tabla-correos"
        item-value="id"
        hide-default-footer
        height="400px"
        fixed-header
        :items-per-page="-1"
      >
        <template v-slot:item.accion="{ item }">
          <v-btn small color="primary" @click="seleccionarCorreo(item)">
            Responder
          </v-btn>
        </template>
      </v-data-table>

      <!-- Sección de respuesta -->
      <v-card v-if="correoSeleccionado" class="respuesta-card">
        <v-card-title>Responder a: {{ correoSeleccionado.correo }}</v-card-title>
        <v-card-text>
          <p><strong>Pregunta:</strong> {{ correoSeleccionado.pregunta }}</p>
          <v-textarea
            label="Respuesta"
            v-model="respuesta"
            outlined
            rows="4"
            class="input"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" @click="enviarRespuesta">
            Enviar Respuesta
          </v-btn>
          <v-btn color="secondary" @click="cancelarRespuesta">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { useCorreosStore } from '../stores/adminStore.js'; // Importamos el store de Pinia
import { computed, ref, onMounted } from 'vue';

export default {
  setup() {
    // Accedemos al store
    const store = useCorreosStore();
    const correoSeleccionado = ref(null);
    const respuesta = ref('');

    // Obtenemos los correos desde el store
    const correos = computed(() => store.correos); // Obtenemos los correos de Pinia

    onMounted(() => {
      store.obtenerCorreos(); // Llamada para obtener los correos cuando se monta el componente
    });

    // Cabeceras de la tabla
    const headers = [
      { text: "Correo", value: "correo" },
      { text: "Pregunta", value: "pregunta" },
      { text: "Acción", value: "accion", sortable: false },
    ];

    // Seleccionamos un correo para responder
    const seleccionarCorreo = (correo) => {
      correoSeleccionado.value = correo;
      respuesta.value = ''; // Limpiar campo de respuesta
    };

    // Enviar la respuesta
    const enviarRespuesta = async () => {
      if (respuesta.value.trim()) {
        //await store.enviarRespuesta(correoSeleccionado.value.id, respuesta.value); // Enviamos la respuesta al backend
        alert(`Respuesta enviada a ${correoSeleccionado.value.correo} con éxito!`);
        store.eliminarCorreo(correoSeleccionado.value.id); // Elimina el correo de la lista
        cancelarRespuesta(); // Limpiar la selección
      } else {
        alert("Por favor, escriba una respuesta antes de enviar.");
      }
    };

    // Cancelar la respuesta
    const cancelarRespuesta = () => {
      correoSeleccionado.value = null;
      respuesta.value = '';
    };

    return {
      correoSeleccionado,
      respuesta,
      correos,
      headers,
      seleccionarCorreo,
      enviarRespuesta,
      cancelarRespuesta,
    };
  },
};
</script>

  
  <style scoped>
  .correo-admin-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(rgba(31, 31, 31, 0.7), rgba(31, 31, 31, 0.7)), url('../assets/img/fondo-info.jpg');
    background-size: cover;
    position: relative;
  }
  
  .panel-blur {
    background: rgba(255, 255, 255, 0.9);
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    max-width: 800px;
    width: 90%;
  }
  
  .titulo {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .tabla-correos {
    margin-bottom: 20px;
    max-height: 400px; /* Ajusta según sea necesario */
    overflow-y: auto;
  }
  
  .respuesta-card {
    margin-top: 20px;
    max-height: 200px; /* Ajusta según sea necesario */
    overflow-y: auto;
  }
  
  .input {
    margin-bottom: 10px;
  }
  </style>
  
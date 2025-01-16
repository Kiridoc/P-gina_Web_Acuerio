<template>
  <div class="pregunta-container">
    <v-container class="panel-blur">
      <h1 class="titulo">ENVÍENOS SU PREGUNTA</h1>

      <!-- Explicación sobre el correo -->
      <p class="descripcion">
        Por favor, ingrese su correo electrónico para enviarle la respuesta directamente a su bandeja de entrada.
      </p>
      <v-text-field
        label="Correo Electrónico"
        v-model="correo"
        type="email"
        outlined
        class="input"
        :error-messages="correoErrorMessages"
      />

      <!-- Explicación sobre la pregunta -->
      <p class="descripcion">
        Sea cortés y formule su pregunta de forma clara y breve:
      </p>
      <v-textarea
        label="Su Pregunta"
        v-model="pregunta"
        outlined
        rows="5"
        class="input"
      />

      <!-- Botones -->
      <div class="botones">
        <v-btn
          @click="enviarPregunta"
          color="primary"
          class="btn-enviar"
          :disabled="!esCorreoValido || !pregunta"
        >
          Enviar
        </v-btn>
        <v-btn @click="volverAtras" color="secondary" class="btn-volver">
          Volver
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import { useCorreosStore } from '../stores/adminStore.js';

export default {
  data() {
    return {
      correo: "",
      pregunta: "",
    };
  },
  computed: {
    // Validación de correo electrónico utilizando una expresión regular simple
    esCorreoValido() {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return regex.test(this.correo); // Retorna verdadero si el correo es válido
    },
    correoErrorMessages() {
      if (this.correo && !this.esCorreoValido) {
        return ["Correo electrónico no válido"];
      }
      return [];
    },
  },
  methods: {
    enviarPregunta() {
      if (this.correo && this.pregunta) {
        // Accedemos al store de Pinia
        const store = useCorreosStore();
        
        // Creamos el objeto de nuevo correo
        const nuevoCorreo = {
          correo: this.correo,
          pregunta: this.pregunta,
        };

        // Guardamos la nueva pregunta en el store
        store.agregarCorreo(nuevoCorreo);

        // Confirmamos que la pregunta fue enviada
        alert("Gracias por su pregunta. Será enviada correctamente.");
        
        // Limpiamos los campos
        this.correo = "";
        this.pregunta = "";
        
        // Redirigir al usuario después de enviar la pregunta
        this.volverAtras(); // Regresa automáticamente tras enviar
      } else {
        alert("Por favor, complete ambos campos antes de enviar.");
      }
    },
    volverAtras() {
      this.$router.push("/"); // Redirige a la página anterior (landingView)
    },
  },
};
</script>



  
  <style scoped>
  /* Contenedor principal (fondo claro, sin difuminar) */
  .pregunta-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: url("../assets/img/info1.jpg") no-repeat center center;
    background-size: cover;
    position: relative; /* Fondo fijo */
    backdrop-filter: blur(1px); /* Aplica el difuminado */
  }
  
  .pregunta-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5); /* Fondo oscuro con algo de transparencia */
    backdrop-filter: blur(5px); /* Aplica el difuminado */
    z-index: -1; /* Asegura que el filtro no cubra el contenido */
  }
  
  /* Panel con estilo limpio */
  .panel-blur {
    background: rgba(255, 255, 255, 0.80); /* Fondo blanco con algo de transparencia */
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    width: 90%;
    text-align: center;
  }
  
  /* Título principal */
  .titulo {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
  }
  
  /* Descripciones de los campos */
  .descripcion {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
    text-align: left;
  }
  
  /* Estilo de los campos de entrada */
  .input {
    margin-bottom: 20px;
  }
  
  /* Botones */
  .botones {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .btn-enviar {
    background-color: #4caf50;
    color: white;
  }
  
  .btn-volver {
    background-color: #f44336;
    color: white;
  }
  </style>
  
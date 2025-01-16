<template>
  <v-container>
    <div class="switch-label-container">
      <div class="three-state-switch" @click="nextState">
        <div :class="['switch', getClass(state)]"></div>
      </div>
      <div class="label-container">
        <v-label class="custom-label">{{ stateLabel }}</v-label>
      </div>
    </div>
  </v-container>
</template>

<script>
import { computed } from 'vue';  // Importar computed de Vue
import { useEstadoStore } from '../stores/adminStore.js';  // Importar el store de Pinia

export default {
  setup() {
    // Usar el store de Pinia
    const estadoStore = useEstadoStore();

    // Computed para obtener el estado y la etiqueta del estado
    const state = computed(() => estadoStore.estado);
    const stateLabel = computed(() => ['ABIERTO', 'AUTOMÁTICO', 'CERRADO'][state.value]);

    const nextState = () => {
      let nuevoEstado = (state.value + 1) % 3;
      estadoStore.cambiarEstado(nuevoEstado);  // Actualizar el estado en el store
    };

    const getClass = (state) => {
      switch (state) {
        case 0:
          return 'estado1';
        case 1:
          return 'estado2';
        case 2:
          return 'estado3';
      }
    };

    return {
      state,
      stateLabel,
      nextState,
      getClass,
    };
  },
};
</script>

<style scoped>
.switch-label-container {
  display: flex;
  align-items: center;
}

.three-state-switch {
  width: 60px;
  height: 30px;
  background-color: blue; /* Fondo azul */
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  display: inline-flex; /* Para alinear con el contenedor del label */
}

.switch {
  width: 20px;
  height: 20px;
  background-color: white; /* Bolita blanca */
  border-radius: 50%;
  position: absolute;
  top: 5px;
  transition: all 0.3s ease;
}

.label-container {
  width: 120px; /* Ancho fijo para el label */
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
}

.custom-label {
  color: #fff !important; /* Color por defecto del label */
  font-size: 15px !important;
  text-align: center;
  font-weight: bold;
}

.estado1 .custom-label {
  color: red; /* Personaliza el color del label para el Estado 1 */
}

.estado2 .custom-label {
  color: green; /* Personaliza el color del label para el Estado 2 */
}

.estado3 .custom-label {
  color: yellow; /* Personaliza el color del label para el Estado 3 */
}

.estado1 {
  left: 5px; /* Posición para Estado 1 */
}

.estado2 {
  left: 20px; /* Posición para Estado 2 (Centro) */
}

.estado3 {
  left: 35px; /* Posición para Estado 3 */
}
</style>

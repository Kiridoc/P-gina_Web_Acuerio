<template>
    <div class="d-flex flex-column align-items-center">
      <v-switch
        v-model="disponible"
        inset
        :class="disponible ? 'switch-disponible' : 'switch-no-disponible'"
      ></v-switch>
      <div :class="disponible ? 'label-disponible' : 'label-no-disponible'">
        {{ disponible ? 'Disponible' : 'No Disponible' }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        disponible: false // Estado inicial
      };
    }
  };
  </script>
  
  <style scoped>
  .switch-disponible .v-input__control {
    background-color: green !important;
  }
  
  .switch-no-disponible .v-input__control {
    background-color: red !important;
  }
  
  .label-disponible {
    color: green;
    margin-top: 5px; /* Reducir el margen superior */
    font-weight: bold;
  }
  
  .label-no-disponible {
    color: red;
    margin-top: 5px; /* Reducir el margen superior */
    font-weight: bold;
  }
  
  .v-input--switch .v-input__control {
    display: flex;
    align-items: center;
  }
  
  .v-input--switch .v-input__control .v-label {
    flex: 1;
    text-align: center;
  }
  </style>
  
  
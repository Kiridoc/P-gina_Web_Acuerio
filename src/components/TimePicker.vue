<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="time"
                :label="label"
                prepend-icon="mdi-clock"
                v-bind="attrs"
                v-on="on"
                @keypress="validateKeyPress"
                placeholder="HH:MM"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menu"
              v-model="time"
              @change="menu = false"
            ></v-time-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'TimePicker',
    props: {
      label: {
        type: String,
        default: 'Selecciona una hora'
      },
      defaultTime: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        menu: false,
        time: this.defaultTime // Usar el valor por defecto recibido del padre
      };
    },
    methods: {
      validateKeyPress(event) {
        const key = event.key;
        const regex = /[0-9:]/;
  
        if (!regex.test(key) || (key === ':' && event.target.value.includes(':'))) {
          event.preventDefault();
        }
      }
    }
  };
  </script>
  
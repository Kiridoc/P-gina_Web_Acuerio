<template>
    <v-text-field
      v-model="inputValue"
      :label="label"
      placeholder="$0.00"
      @keypress="validateKeyPress"
    ></v-text-field>
  </template>
  
  <script>
  export default {
    name: 'MoneyInput',
    props: {
      defaultValue: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: 'Cantidad'
      }
    },
    data() {
      return {
        inputValue: this.defaultValue
      };
    },
    methods: {
      validateKeyPress(event) {
        const key = event.key;
        const regex = /^[0-9.]$/;
  
        if (!regex.test(key) && key !== 'Backspace' && key !== 'Delete' && key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== '$') {
          event.preventDefault();
        }
      }
    },
    watch: {
      defaultValue(newVal) {
        this.inputValue = newVal;
      }
    }
  };
  </script>
  
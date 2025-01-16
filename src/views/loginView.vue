<template>
  <div class="login-container">
    <v-container class="panel-blur">
      <h1 class="titulo">INICIAR SESIÓN</h1>

      <!-- Explicación sobre el login -->
      <p class="descripcion">
        Por favor, ingrese su usuario y contraseña para acceder a su cuenta.
      </p>

      <!-- Campo para Usuario -->
      <v-text-field
        label="Usuario"
        v-model="usuario"
        type="text"
        outlined
        class="input"
        :error-messages="usuarioErrorMessages"
      />

      <!-- Campo para Contraseña -->
      <v-text-field
        label="Contraseña"
        v-model="password"
        type="password"
        outlined
        class="input"
        :error-messages="passwordErrorMessages"
      />

      <!-- Botones -->
      <div class="botones">
        <v-btn 
          @click="iniciarSesion" 
          color="primary" 
          class="btn-enviar"
          :disabled="!usuario || !password"
        >
          Iniciar sesión
        </v-btn>
        <v-btn @click="volverAtras" color="secondary" class="btn-volver">
          Volver
        </v-btn>
      </div>

      <!-- Mensaje de error -->
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </v-container>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/adminStore.js';
import { loginUser } from '../services/authService.js';

export default {
  data() {
    return {
      usuario: "",
      password: "",
      errorMessage: "",
    };
  },
  computed: {
    usuarioErrorMessages() {
      if (!this.usuario) {
        return ["El usuario no puede estar vacío"];
      }
      return [];
    },
    passwordErrorMessages() {
      if (!this.password) {
        return ["La contraseña no puede estar vacía"];
      }
      return [];
    },
  },
  methods: {
    async iniciarSesion() {
      const authStore = useAuthStore();

      const success = await authStore.iniciarSesion(this.usuario, this.password);
      
      if (success) {
        this.$router.push('/adminView');  // Redirigir a la vista de administración
      } else {
        this.errorMessage = "Usuario o contraseña incorrectos.";
      }
    },
    volverAtras() {
      this.$router.push("/");  // Redirige a la página de inicio
    },
  },
};
</script>
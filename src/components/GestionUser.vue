<template>
  <div class="row p-5" style="display: flex; align-items: center;">
    <div class="col-12 col-lg-4 d-flex justify-content-center">
      <!-- Ventana de Gestión de Usuarios -->
      <v-card class="pa-5 background" max-width="400" style="flex: 1; padding-right: 10px;">
        <v-card-title>
          <h3 style="text-align: center;">Gestión de Usuarios</h3>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <!-- Campo Nombre -->
            <v-text-field
              v-model="user.name"
              label="Nombre"
              :rules="[rules.required]"
              outlined
              required
            ></v-text-field>

            <!-- Campo Contraseña -->
            <v-text-field
              v-model="user.password"
              :type="showPassword ? 'text' : 'password'"
              label="Contraseña"
              outlined
              required
              :rules="[rules.required]"
            >
              <template #append>
                <span
                  class="iconoPassword"
                  style="cursor: pointer; color: black;"
                  @click="togglePasswordVisibility"
                >
                  {{ showPassword ? '🔎' : '🔒' }}
                </span>
              </template>
            </v-text-field>

            <!-- Campo Número Telefónico -->
            <v-text-field
              v-model="user.phone"
              label="Número Telefónico"
              outlined
              required
              :rules="[rules.required, rules.numeric]"
              type="tel"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn class="btnUserDel btnUser" :disabled="!selectedUser" @click="deleteUser">Eliminar</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="btnUserAdd btnUser" :disabled="!valid" @click="addUser">Añadir</v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <div class="col-12 col-lg-8">
      <!-- Tabla de Usuarios -->
      <v-card class="table" style="flex: 2;">
        <v-card-title>
          <h3 style="text-align: center;">Usuarios</h3>
        </v-card-title>
        <div style="max-height: 400px; overflow-y: auto;">

          <v-data-table
            :items="usuarios"
            :headers="headers"
            class="elevation-1"
            @click:row="selectUser"
            hide-default-footer
          >
            <!-- Si necesitas las plantillas personalizadas -->
            <template v-slot:item="{ item }">
              <tr @click="selectUser(item)"
                :class="{ 'selected-row': selectedUser?.name === item.name }"
              >
                <td>{{ item.name }}</td>
                <td>****</td>
                <td>{{ item.phone }}</td>
              </tr>
            </template>
          </v-data-table>

        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/adminStore.js';

export default {
  setup() {
    // Acceso al store de usuarios
    const usuariosStore = useAuthStore();

    // Usuarios reactivos desde el store
    const usuarios = computed(() => usuariosStore.usuarios);

    // Estados locales
    const user = ref({
      name: '',
      password: '',
      phone: '',
    });

    const valid = ref(false);
    const showPassword = ref(false);
    const selectedUser = ref(null); // Usuario seleccionado para eliminar

    // Reglas de validación
    const rules = {
      required: (value) => !!value || 'Campo requerido.',
      numeric: (value) => !isNaN(Number(value)) || 'Solo se permiten números.',
    };

    // Métodos
    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const clearFields = () => {
      user.value = {
        name: '',
        password: '',
        phone: '',
      };
      selectedUser.value = null; // Limpiar selección
    };

    const addUser = () => {
      if (valid.value) {
        // Verificar si el usuario ya existe
        const existingUser = usuariosStore.findUserByName(user.value.name);
        if (existingUser) {
          alert('El usuario ya existe.');
          return;
        }
        // Agregar usuario al store
        usuariosStore.addUser({ ...user.value });
        clearFields(); // Limpiar campos
        alert('Usuario añadido con éxito.');
      }
    };

    const deleteUser = () => {
  if (selectedUser.value) {
    try {
      usuariosStore.deleteUser(selectedUser.value);
      clearFields();
      // Forzar actualización de la tabla si es necesario
      usuarios.value = [...usuariosStore.usuarios];
      alert('Usuario eliminado con éxito.');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert('Error al eliminar el usuario.');
    }
  } else {
    alert('No hay ningún usuario seleccionado.');
  }
};

const selectUser = (item) => {
  // Para Vuetify 3
  const userData = item.raw || item; // Compatibilidad con ambas versiones
  selectedUser.value = { ...userData };
  console.log('Usuario seleccionado:', selectedUser.value);
};


    return {
      usuarios,
      user,
      valid,
      showPassword,
      selectedUser,
      headers: [
        { text: 'Nombre', value: 'name' },
        { text: 'Contraseña', value: 'password' },
        { text: 'Número Telefónico', value: 'phone' },
      ],
      rules,
      togglePasswordVisibility,
      clearFields,
      addUser,
      deleteUser,
      selectUser,
    };
  },
};
</script>


<style scoped>
.background {
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
}
.v-card {
  border-radius: 15px;
}
.btnUserDel {
  color: red;
  border: solid 2px;
  border-radius: 18px;
}
.btnUserAdd {
  color: #24108a;
  border: solid 2px;
  border-radius: 18px;
}
.btnUser {
  transition: 0.5s;
}
.btnUser:hover {
  font-size: 15px;
  transition: 0.5s;
}
.iconoPassword {
  transition: 0.5s;
}
.iconoPassword:hover {
  font-size: 20px;
  transition: 0.5s;
}
.table {
  min-height: 400px !important;
}
@media (max-width: 1000.72px) {
  .table {
    margin-top: 50px !important;
  }
}

.selected-row {
  background-color: rgba(var(--v-theme-primary), 0.2) !important;  /* Cambia el fondo a un color semitransparente */
  font-weight: bold;  /* Opcional: poner el texto en negrita */
  cursor: pointer;  /* Cambiar el cursor a pointer para indicar que es seleccionable */
}

/* Para mantener el color de fondo al hacer hover sobre la fila seleccionada */
.selected-row:hover {
  background-color: rgba(var(--v-theme-primary), 0.3) !important; /* Hazlo más oscuro al hacer hover */
}
</style>


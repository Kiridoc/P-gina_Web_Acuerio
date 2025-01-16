<template>
  <section id="manage-event" class="info">
    <div class="container-fluid px-4 mx-auto">
      <h1 class="text-center" style="color: #EBE9F6; margin-top: 50px;">
        Administración de Eventos
      </h1>
      <div class="row justify-content-center">
        <!-- Tabla unificada con eventos y detalles -->
        <div class="col-12 d-flex flex-column align-items-center">
          <div class="table-container table-responsive">
            <table class="table table-striped table-lg table-bordered table-blue">
              <thead>
                <tr>
                  <th>Nombre del Evento</th>
                  <th>Título</th>
                  <th style="width: 25%;">Descripción</th>
                  <th style="width: 10%;">Fecha</th>
                  <th style="width: 25%;">Imagen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(evento, index) in eventos"
                  :key="index"
                  :class="{
                    selected: selectedEvent && selectedEvent.nombre === evento.nombre,
                  }"
                  class="evento-row"
                >
                  <td>
                    <input
                      type="text"
                      v-model="evento.nombre"
                      class="form-control form-control-sm"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      v-model="evento.titulo"
                      class="form-control form-control-sm"
                    />
                  </td>
                  <td>
                    <textarea
                      v-model="evento.descripcion"
                      class="form-control form-control-sm"
                      rows="5"
                    ></textarea>
                  </td>
                  <td>
                    <input
                      type="date"
                      v-model="evento.fecha"
                      class="form-control form-control-sm"
                      :min="getTodayDate()"
                    />
                  </td>
                  <td>
                    <!-- Mostrar la imagen actual -->
                    <div v-if="evento.imagen" class="mb-2">
                      <img
                        :src="evento.imagen"
                        alt="Imagen del evento"
                        style="max-width: 100%; height: auto; border-radius: 5px;"
                      />
                    </div>
                    <!-- Input para cargar una nueva imagen -->
                    <input
                      type="file"
                      @change="onFileChange($event, index)"
                      class="form-control form-control-sm"
                    />
                  </td>
                  <td>
                    <button
                      class="btn btn-secondary btn-sm"
                      @click="deleteEvent(index)"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="eventos.length < 4" class="mt-3">
            <button class="btn btn-primary btn-sm" @click="addEvent">
              Añadir Evento
            </button>
          </div>
        </div>
      </div>

      <div v-if="eventos.length > 0" class="text-center mt-4">
        <button class="btn btn-warning btn-sm" @click="clearEvents">
          Eliminar Todos
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { useEventosStore } from "../stores/adminStore.js";
import { computed } from "vue";

export default {
  setup() {
    const eventosStore = useEventosStore();

    // Obtener y modificar los eventos desde el store
    const eventos = computed(() => eventosStore.eventos);

    // Métodos para interactuar con el store
    const addEvent = () => {
      if (eventos.value.length < 4) {
        const nuevoEvento = {
          nombre: "Nuevo Evento",
          titulo: "",
          descripcion: "",
          fecha: "",
          imagen: "",
        };
        eventosStore.agregarEvento(nuevoEvento);
      } else {
        alert("El número máximo de eventos es 4.");
      }
    };

    const deleteEvent = (index) => {
      eventosStore.eliminarEvento(index);
    };

    const clearEvents = () => {
      if (confirm("¿Estás seguro de que quieres eliminar todos los eventos?")) {
        eventosStore.eliminarTodos();
      }
    };

    const getTodayDate = () => {
      const today = new Date().toISOString().split("T")[0];
      return today;
    };

    const onFileChange = (event, index) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          eventosStore.actualizarImagen(index, e.target.result); // Actualiza la imagen en el store
        };
        reader.readAsDataURL(file);
      }
    };

    return {
      eventos,
      addEvent,
      deleteEvent,
      clearEvents,
      getTodayDate,
      onFileChange,
    };
  },
};
</script>

<style scoped>


.container-fluid {
  max-width: 1200px; /* Limitar el ancho máximo para pantallas grandes */
  margin: 0 auto; /* Centrar el contenedor */
}

h1 {
  text-align: center;
  color: #EBE9F6; /* Título en blanco */
  margin-bottom: 20px;
}

/* Estilo para la tabla de eventos con bordes curvados */
.table-container {
  width: 100%;
  margin: 0 auto;
  border-radius: 10px;
  overflow: auto; /* Para hacer la tabla desplazable en dispositivos móviles */
  padding-right: 15px; /* Ajuste en el relleno para pantallas pequeñas */
}

.table-lg {
  font-size: 1.2em; /* Tamaño de la fuente más grande */
}

table {
  width: 100%;
  border-collapse: collapse;
}

.table-blue {
  border: 2px solid blue; /* Borde azul solo en el exterior */
  border-radius: 10px; /* Bordes redondeados en la tabla */
}

table td,
table th {
  border: 1px solid transparent; /* No aplicar borde interno a las celdas */
}

.evento-row:hover {
  cursor: pointer;
  background-color: #f1f1f1;
}

.evento-row.selected {
  background-color: #d0ebff;
}

.highlighted {
  border-bottom: 2px solid darkorange;
}

.buttons button {
  margin: 5px;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
  color: white;
}

/* Ajustes responsivos */
@media (max-width: 768px) {
  .container-fluid {
    padding-left: 10px;
    padding-right: 10px;
  }

  .table-container {
    padding-right: 0; /* Sin relleno extra en pantallas móviles */
  }

  .table-responsive {
    display: block;
    width: 100%;
    overflow-x: auto; /* Permite el desplazamiento horizontal */
  }

  .table td,
  .table th {
    font-size: 0.9em; /* Reducir el tamaño de la fuente en pantallas pequeñas */
  }
}
</style>

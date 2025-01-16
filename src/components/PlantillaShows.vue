<template>
    <section id="manage-shows" class="info">
      <div class="container-fluid px-5 info" style="align-items: center;">
        <h1 style="text-align: center; color: #EBE9F6">Gestión de Shows</h1>
        <div class="row py-3">
  
          <!-- Iterar sobre los shows -->
          <div 
            v-for="show in shows" 
            :key="show.id" 
            class="col-12 col-xl-4 py-4 d-flex justify-content-center">
            <div class="card parent-card custom-card border-primary" style="width: 28rem;">
              <img :src="show.image" class="card-img-top shows-fotos" :alt="show.title">
              <div class="card-body">
                <h5 class="card-title"><strong>{{ show.title }}</strong></h5>
                <p class="card-text">{{ show.description }}</p>
                <div class="d-flex justify-content-center">
                    
                    <div class="container">
                    <div class="row">
    
                        <!-- Iterar sobre los horarios del show -->
                        <div 
                        v-for="(schedule, index) in show.schedules" 
                        :key="index" 
                        class="col-12 col-md-6 d-flex justify-content-center">
                        <div class="card custom-card border-info my-2" style="max-width: 18rem; min-width: 10rem;">
                            <div class="card-header fw-bold fs-5">
                            {{ schedule.name }}
                            <br>
                            <span :class="{'estado-show-disponible': schedule.available, 'estado-show-no-disponible': !schedule.available}">
                                ({{ schedule.available ? 'DISPONIBLE' : 'NO DISPONIBLE' }})
                            </span>
                        </div>
                            <div class="card-body">
                              <p class="card-text">
                                <strong>Horario:</strong>
                                <input type="text" v-model="schedule.time" class="form-control mb-2">
                                <strong>Ubicación:</strong>
                                <input 
                                    v-if="show.title === 'Show de Payasos y Magos'" 
                                    type="text" 
                                    v-model="schedule.location" 
                                    class="form-control mb-2">
                                <span v-else>{{ schedule.location }}</span><br>
                                <strong>Costo:</strong>
                                <input type="text" v-model="schedule.cost" class="form-control mb-2">
                                <hr v-if="show.title !== 'Show de Payasos y Magos'">
                                <div v-if="show.title !== 'Show de Payasos y Magos'">
                                    <strong>Interacción:</strong>
                                    <input 
                                    type="text" 
                                    v-model="schedule.interactionCost.child" 
                                    class="form-control mb-2" 
                                    placeholder="Por niño">
                                    <input 
                                    type="text" 
                                    v-model="schedule.interactionCost.adult" 
                                    class="form-control mb-2" 
                                    placeholder="Por adulto">
                                </div>
                              </p>
                            <button 
                                class="btn btn-secondary w-100" 
                                @click="toggleAvailability(show.id, index)">
                                Cambiar Estado
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
import { useShowsStore } from '../stores/adminStore.js'; // Asegúrate de que la ruta sea correcta

export default {
  name: 'PlantillaShows',
  setup() {
    // Acceder al store de Pinia
    const showsStore = useShowsStore();

    // Obtener los datos desde el store
    const shows = showsStore.shows;

    // Métodos del store
    const toggleAvailability = showsStore.toggleAvailability;

    // Actualización de horarios con un método genérico
    const updateSchedule = (showId, scheduleIndex, field, value) => {
      showsStore.updateSchedule(showId, scheduleIndex, { [field]: value });
    };

    return {
      shows,             // Datos desde el store
      toggleAvailability, // Método para cambiar estado
      updateSchedule      // Método para actualizar horarios
    };
  }
};
</script>



  
<style scoped>
  .estado-show-disponible {
    background-color: green;
    color: #fff;
    border-radius: 15px;
    padding: 5px;
    font-size: 10px;
  }
  
  .estado-show-no-disponible {
    background-color: red;
    color: #fff;
    border-radius: 15px;
    padding: 5px;
    font-size: 10px;
  }

  .info{
    background: linear-gradient(rgba(31, 31, 31, 0.7), rgba(31, 31, 31, 0.7)), url('../assets/img/fondo-info.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 50px 0;
  }

  @media (max-width: 768px) {
  .card-header {
    font-size: 1rem;
  }
  .estado-show-disponible, .estado-show-no-disponible {
    font-size: 10px;
    padding: 8px;
  }
}
</style>

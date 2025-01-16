<template>
    <!--MENU-->
    <section id="inicio">
      <header id="encabezado">
        <nav class="navbar navbar-expand-xl navbar-dark fixed-top custom-navbar">
            <div class="container-fluid">
              <a class="navbar-brand" href="#" style="font-weight: bold; font-size: 30px;" id="nombre">GESTIÓN: {{ perfil }}</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">

                <ul class="navbar-nav ms-auto">
                  <li class="nav-item item-inicio">
                    <a class="nav-link active" aria-current="page" href="#usuarios">USUARIOS</a>
                  </li>
                  <li class="nav-item item-inicio">
                    <a class="nav-link" href="#shows">SHOWS</a>
                  </li>
                  <li class="nav-item item-inicio">
                    <a class="nav-link" href="#eventos">EVENTOS</a>
                  </li>
                  <li class="nav-item item-inicio">
                    <a class="nav-link" href="#preguntas">PREGUNTAS</a>
                  </li>
                  <li class="nav-item item-inicio">
                    <a class="nav-link" href="#reservas" tabindex="-1" aria-disabled="true">RESERVAS</a>
                  </li>
                </ul>

                <form class="d-flex ms-auto" @updateEstado="cambiarEstado">
                    <SwitchTriple :estado="estado" />
                </form>
                

              </div>
            </div>
          </nav> 
      </header>
    </section>

    <!--USUARIOS-->
    <section class="custom-background" id="usuarios">
        <GestionUser></GestionUser> 
    </section>

    <!--SHOWS-->
    <section id="shows">
        <PlantillaShows></PlantillaShows> 
    </section>

    <!--EVENTOS-->
    <section id="eventos">
        <EventosGestion></EventosGestion> 
    </section>

    <!--PREGUNTAS-->
    <section id="preguntas">
        <PreguntasGestion></PreguntasGestion> 
    </section>

    <!--BUZÓN-->
    <section id="preguntas">
        <CorreoGestion></CorreoGestion> 
    </section>
    
    <!--FOOTER-->
    <footer class="info">
    <p class="m-2" style="text-align: center; color: #EBE9F6  ;">Todos los derechos reservados - 2024</p>
    <div class="redes" style="text-align: center;">
        <a href="#"><img src="../assets/img/icons8-facebook-50.png" alt="" height="30" class="img-redes"></a>
        <a href="#"><img src="../assets/img/icons8-instagram-52.png" alt="" height="30" class="img-redes"></a>
    </div>
    </footer>

</template>
<script setup>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap/dist/js/bootstrap.js'
    import { ref} from 'vue'
    
    import SwitchTriple from '../components/SwitchTriple.vue';
    import GestionUser from '../components/GestionUser.vue';
    import PlantillaShows from '../components/PlantillaShows.vue'
    import EventosGestion from '../components/EventosGestion.vue'
    import PreguntasGestion from '../components/PreguntasGestion.vue'
    import CorreoGestion from '../components/CorreoGestion.vue'

    const id = localStorage.getItem('userId');
    const perfil = ref('Mabel')


</script>
<style scoped>
      @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
      *{
        box-sizing: border-box;
        font-family: 'Roboto';
      }

    .custom-navbar{
        background-color: #080A77;
    }

    .custom-background {
      background: linear-gradient(rgba(31, 31, 31, 0.7), rgba(31, 31, 31, 0.7)), url('../assets/img/fondo.jpg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      padding: 50px 0;
      padding-top: 100px;

  }

  .estado-show-disponible{
    background-color: green;
    color: #fff;
    border-radius: 15px;
    padding: 5px;
    font-size: 10px;
  }

  .estado-show-no-disponible{
    background-color: red;
    color: #fff;
    border-radius: 15px;
    padding: 5px;
    font-size: 10px;
  }

  .custom-card{
    border-width: 3px;
    border-radius: 15px;
  }
  .custom-card:hover{
    box-shadow: 5px 5px 10px #565656, -5px -5px 10px #8a8a8a;
  }
  .info{
    background: linear-gradient(rgba(31, 31, 31, 0.7), rgba(31, 31, 31, 0.7)), url('../assets/img/fondo-info.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 50px 0;
  }
</style>


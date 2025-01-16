<template>
    <!--MENU-->
    <section id="inicio">
      <header id="encabezado">
        <nav class="navbar navbar-expand-xl navbar-dark fixed-top custom-navbar">
            <div class="container-fluid">
              <a class="navbar-brand" href="#" style="font-weight: bold; font-size: 30px;" id="nombre">ACUARIO NACIONAL DE CUBA</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">

                <ul class="navbar-nav ms-auto">
                  <li class="nav-item item-inicio">
                    <a class="nav-link active" aria-current="page" href="#inicio">INICIO</a>
                  </li>
                  <li class="nav-item item-inicio">
                    <a class="nav-link" href="#informacion">INFORMACIÓN</a>
                  </li>
                  <li class="nav-item item-inicio">
                    <a class="nav-link" href="#eventos">EVENTOS</a>
                  </li>
                  <li class="nav-item item-inicio">
                    <a class="nav-link" href="#guia">ACLARAR DUDA</a>
                  </li>
                  <li class="nav-item item-inicio">
                    <a class="nav-link" href="#reservas" tabindex="-1" aria-disabled="true">RESERVAS</a>
                  </li>
                </ul>

                <form class="d-flex ms-auto">
                    <h5 id="estado" style="color: #EBE9F6; font-weight: bold;">{{ mensajeDisponibilidad}}</h5>
                </form>
                

              </div>
            </div>
          </nav> 
      </header>
    </section>

    <!--Presentación-->
    <section class="custom-background" id="presentacion">
        <div class="container py-4 d-flex" style="height: 100vh;">
                <div class="row pt-5 align-items-center">

                    <!--Textos-->
                    <div class="col-12 col-lg-6">
                        <h1 class=" text-white eslogan" style="font-size: 80px;">EL MUNDO DEL MAR AL ALCANCE DE TODOS</h1>
               
                    </div>

                    <!--Carrusel-->
                    <div class="col-12 col-lg-6 p5 m1">

                        <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
                            <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div class="carousel-inner">
                            <div class="carousel-item active" data-bs-interval="10000">
                                <img src="../assets/img/home1.jpg" class="d-block w-100" alt="...">
                                <div class="carousel-caption d-none d-md-block">
                                <h5 style="color: #EBE9F6; font-size: 2rem;">¡BIENVENIDO!</h5>
                                </div>
                            </div>
                            <div class="carousel-item" data-bs-interval="2000">
                                <img src="../assets/img/home2.jpg" class="d-block w-100" alt="...">
                            </div>
                            <div class="carousel-item">
                                <img src="../assets/img/home3.jpg" class="d-block w-100" alt="...">
                            </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                        <p class="fs-4 py-2 text-white" style="font-size: 16px;">Centro científico y recreativo especializado
                          en la investigación, la educación ambiental y la divulgación del medio
                          marino, la flora, fauna y ecología. Estamos abiertos martes, jueves y 
                          fines de semana.
                          </p> 

                    </div>

                </div>
        </div>
    </section>

    <!--SHOWS-->
<section id="shows" class="info">
  <div class="container-fluid px-5  info" style="align-items: center;">
    <h1 style="text-align: center; color: #EBE9F6">SHOWS</h1>
    <div class="row py-3">
      
      <!-- Bucle para cada show -->
      <div 
        v-for="show in shows" 
        :key="show.id" 
        class="col-12 col-xl-4 py-4 d-flex justify-content-center"
      >
        <div class="card parent-card custom-card border-primary" style="width: 28rem;">
          <img :src="show.image" class="card-img-top shows-fotos" alt="Imagen del show">
          <div class="card-body">
            <h5 class="card-title"><strong>{{ show.title }}</strong></h5>
            <p class="card-text">{{ show.description }}</p>
            <div class="d-flex justify-content-center">
              <div class="container">
                <div class="row">

                  <!-- Bucle para cada horario del show -->
                  <div 
                    v-for="(schedule, index) in show.schedules" 
                    :key="index" 
                    class="col-12 col-md-6 d-flex justify-content-center"
                  >
                    <div class="card custom-card border-info my-2" style="max-width: 18rem; min-width: 10rem;">
                      <div 
                        class="card-header fw-bold fs-5">
                        {{ schedule.name }}
                        <br>
                        <span 
                          :class="{
                            'estado-show-disponible': schedule.available,
                            'estado-show-no-disponible': !schedule.available
                          }"
                        >
                          ({{ schedule.available ? 'DISPONIBLE' : 'NO DISPONIBLE' }})
                        </span>
                      </div>
                      <div class="card-body">
                        <p class="card-text">
                          <strong>Horario:</strong> {{ schedule.time }} <br>
                          <strong>Ubicación:</strong> {{ schedule.location }} <br>
                          <strong>Costo:</strong> {{ schedule.cost }} <br>
                          <hr>
                          <strong v-if="schedule.interactionCost.child || schedule.interactionCost.adult">Interacción:</strong>
                          <span v-if="schedule.interactionCost.child"> {{ schedule.interactionCost.child }} por niño <br> </span>
                          <span v-if="schedule.interactionCost.adult"> {{ schedule.interactionCost.adult }} por adulto </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <!-- Fin del bucle de horarios -->
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Fin del bucle de shows -->

    </div>
  </div>
</section>


    <!--INFORMACION-->
    <section id="informacion" class="info">
      <div class="container-fluid">
        <div class="row mb-3 border-0 align-items-center">
            <div class="col-md-4 text-center">
                <img src="../assets/img/info1.jpg" class="img-fluid img-bordeadas" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h2 class="card-title info-h2">Historia</h2>
                    <p class="card-text info-p">
                        El Acuario Nacional de Cuba fue inaugurado en 1960 como un espacio destinado a la conservación, educación y estudio de la biodiversidad marina. Ubicado en el municipio Playa, en La Habana, este emblemático lugar se ha consolidado como uno de los centros de referencia para la vida marina en el Caribe.
                        Desde sus inicios, el acuario se planteó como un proyecto ambicioso, no solo para el entretenimiento de los visitantes, sino también para promover la investigación científica y la educación ambiental. En sus primeras décadas, el acuario albergaba especies locales y organizaba actividades educativas dirigidas a estudiantes, destacando su compromiso con la enseñanza de la ecología marina.
                        Con el paso de los años, el Acuario Nacional ha ampliado sus instalaciones y diversificado sus programas. Hoy en día cuenta con áreas de exhibición de especies tropicales, tanques al aire libre y un teatro marino, famoso por sus espectáculos con delfines y lobos marinos. Además, su laboratorio de investigación ha contribuido significativamente a la protección de los arrecifes de coral y la fauna marina autóctona de Cuba.
                        Este acuario no solo es un destino turístico, sino también un centro de aprendizaje para las generaciones más jóvenes, inculcando la importancia del cuidado del medio ambiente. A lo largo de su historia, ha sabido combinar la maravilla de la vida marina con un mensaje de conservación, lo que lo convierte en un verdadero orgullo nacional.
                    </p>
                    <p class="card-text"><small class="text-body-secondary info-act-p">Última Actualización Noviembre, 2024</small></p>
                </div>
            </div>
        </div>

        <div class="row mb-3 border-0 align-items-center">
           
            <div class="col-md-8">
                <div class="card-body">
                    <h2 class="card-title info-h2">Especies Destacadas</h2>
                    <p class="card-text info-p">
                        El pez león, originario del Indo-Pacífico, es una de las especies que más llama la atención en el Acuario Nacional de Cuba. Este pez, conocido por sus colores vibrantes y aletas espinosas, tiene un papel controvertido en los ecosistemas del Caribe.
                        Aunque su belleza lo hace atractivo para los visitantes, el pez león es una especie invasora en esta región, lo que significa que no pertenece naturalmente a estos ecosistemas. Su presencia afecta gravemente a las especies locales, ya que se alimenta vorazmente de pequeños peces y crustáceos, reduciendo la biodiversidad marina.              
                        En el Acuario Nacional, los expertos no solo educan sobre su belleza y biología, sino también sobre la importancia de controlar su población para proteger los arrecifes de coral. Esta especie es un recordatorio visual del impacto humano en los océanos y la necesidad de equilibrar conservación y acción.
                    </p>
                    <p class="card-text"><small class="text-body-secondary info-act-p">Última Actualización Noviembre, 2024</small></p>
                </div>
            </div>
            <div class="col-md-4 text-center">
                <img src="../assets/img/info2.jpg" class="img-fluid img-bordeadas" alt="...">
            </div>
        </div>
    </div>
    </section>

    <!-- EVENTOS -->
  <section id="eventos">
    <div class="container px-5  info" style="background-color: #EBE9F6;">
      <h1 style="text-align: center; color: #494365; margin-bottom: 40px; color: #fff;">EVENTOS</h1>

      <div class="row">
        <!-- Renderizar cada evento dinámicamente -->
        <div
          v-for="(evento, index) in mostrarEventos"
          :key="index"
          class="col-12 col-sm-6 col-lg-3"
        >
          <div class="rotar-card mb-3">
            <!-- Tarjeta Frontal -->
            <div class="face front" :class="{ 'relleno': !evento }">
              <template v-if="evento">
                <img :src="evento.imagen || imagenDefault" :alt="evento.nombre || 'Próximamente'" />
                <h3>{{ evento.nombre || 'Próximamente' }}</h3>
              </template>
              <template v-else>
                <h3>Próximamente</h3>
              </template>
            </div>

            <!-- Tarjeta Trasera -->
            <div class="face back" :class="{ 'relleno': !evento }">
              <template v-if="evento">
                <h3>{{ evento.titulo || 'Próximamente' }}</h3>
                <p>{{ evento.descripcion || 'Más información muy pronto.' }}</p>
                <div class="fecha">
                  <p>{{ formatFecha(evento.fecha) }}</p>
                </div>
              </template>
              <template v-else>
                <h3>Próximamente</h3>
                <p>Más información muy pronto.</p>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

    <!--GUÍA-->
    <section id="guia">
  <h1 class="text-center mb-5 pb-3" style="color: #EBE9F6;">GUÍA DEL ACUARIO</h1>
  <div class="container mt-2">
    <div class="carousel">
      <!-- Contenedor del carrusel -->
      <div class="carousel__container">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="carousel__item"
          :class="getClass(index)"
          :data-name="item.name"
        >
          <div class="card img-bordeadas">
            <img :src="item.img" class="card-img-top" :alt="item.name" />
            <div class="card-body">
              <h5 class="card-title">{{ item.title }}</h5>
              <p class="card-text">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Botones de navegación -->
    <div class="container" style="position: relative;">
      <div class="carousel__nav">
        <button @click="prev" style="transform: scaleX(-1);">&rsaquo;</button>
        <button @click="next">&rsaquo;</button>
      </div>
    </div>
  </div>
</section>

<!-- PREGUNTAS Y RESPUESTAS -->
<section class="preguntas">
    <div class="container info">
      <h1 class="text-center my-5 pb-3" style="color: #EBE9F6;">PREGUNTAS FRECUENTES</h1>

      <!-- Accordion -->
      <div class="accordion accordion-dark mx-5" id="accordionPanelsStayOpenExample">
        <div 
          class="accordion-item" 
          v-for="(pregunta, index) in preguntas" 
          :key="index"
        >
          <h2 class="accordion-header">
            <button 
              class="accordion-button collapsed" 
              type="button" 
              :data-bs-toggle="'collapse'" 
              :data-bs-target="'#panelsStayOpen-collapse' + index" 
              :aria-controls="'panelsStayOpen-collapse' + index" 
              aria-expanded="false"
            >
              {{ pregunta.pregunta }}
            </button>
          </h2>
          <div 
            :id="'panelsStayOpen-collapse' + index" 
            class="accordion-collapse collapse" 
            data-bs-parent="#accordionPanelsStayOpenExample"
          >
            <div class="accordion-body">
              <strong>{{ pregunta.respuesta }}</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Extra content -->
      <div class="row mt-5 px-5">
        <div class="col-12 col-md-8 d-flex justify-content-center">
          <h2 style="color: #EBE9F6; text-align: center;">Si tu pregunta no aparece, puedes dejarla en nuestro buzón.</h2>
        </div>
        <div class="col-12 col-md-4 d-flex justify-content-center">
          <router-link to="/preguntaView" class="text-center">
            <a class="btn btn-reserva" style="min-width: 14rem; max-height: 50px;"><span>Buzón</span></a>
          </router-link>
        </div>
      </div>
    </div>
  </section>

<!--RESERVAS-->
<section id="reservas">
  <div class="container-fluid">
    <div class="row m-5 border-0 align-items-center">
        <div class="col-md-6 text-center">
            <img src="../assets/img/reserva.avif" class="img-fluid img-bordeadas" alt="..."> <!-- Añadido 'rounded' para bordes curvos -->
        </div>
        <div class="col-md-6" style="color: #EBE9F6;">
            <div class="card-body">
                <h2 class="card-title">Reserva tu Local</h2>
                <p class="card-text">
                    No pierdas la oportunidad de soñar en el Acuario Nacional de Cuba. ¡Haz tu reserva hoy mismo y disfruta de una experiencia única en el Caribe! Visita nuestras instalaciones y conoce la increíble biodiversidad marina.
                </p>

                <div class="text-center">
                  <a class="btn btn-reserva"><span>Reservar Ahora</span></a>
                </div>

            </div>
        </div>        
    </div>
  </div>
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
    import { ref, computed, onMounted } from 'vue'
    import { useShowsStore } from '../stores/adminStore.js';
    import { useEstadoStore } from '../stores/adminStore.js';
    import { useEventosStore } from '../stores/adminStore.js';
    import { usePreguntasStore } from '../stores/adminStore.js';

    import imagenDefault from "../assets/img/fondo.jpg"; // Imagen predeterminada

    const estadoStore = useEstadoStore();

    const preguntasStore = usePreguntasStore();
    const preguntas = computed(() => preguntasStore.preguntas)
    

    const eventosStore = useEventosStore();
    const eventos = computed(() => eventosStore.eventos)
    

    // Calcular siempre un arreglo de 4 elementos (rellenando con null si no hay suficientes eventos)
    const mostrarEventos = computed(() => {
      const eventosDisponibles = eventos.value.slice(0, 4); // Máximo 4 eventos reales
      const relleno = Array(4 - eventosDisponibles.length).fill(null); // Crear cartas de relleno
      return [...eventosDisponibles, ...relleno]; // Combinar eventos reales y cartas de relleno
    });

    // Método para formatear fechas
    const formatFecha = (fecha) => {
      if (!fecha) return "Sin fecha definida";
      const opciones = { year: "numeric", month: "long", day: "numeric" };
      return new Date(fecha).toLocaleDateString("es-ES", opciones);
    };

    const showStore = useShowsStore();
    const shows = showStore.shows; // Obtén los datos del store
    console.log(shows);



    // Variable reactiva para el estado de disponibilidad
const disponible = ref(false)

// Función para verificar la disponibilidad
const verificarDisponibilidad = () => {
  const ahora = new Date()
  const hora = ahora.getHours()
  const minutos = ahora.getMinutes()
  const diaSemana = ahora.getDay()

  // Definir horario de disponibilidad (por ejemplo, martes a sábado, 9:00 AM a 6:00 PM)
  const horarioLaboral = {
    diasValidos: [3, 4, 5, 6, 7], // Martes a Sábado
    horaInicio: 9,
    horaFin: 18
  }

  // Verificar si es un día válido
  const esDiaValido = horarioLaboral.diasValidos.includes(diaSemana)
  
  // Verificar si está dentro del horario laboral
  const enHorarioLaboral = 
    hora >= horarioLaboral.horaInicio && 
    hora < horarioLaboral.horaFin

  // Establecer disponibilidad
  disponible.value = esDiaValido && enHorarioLaboral
}

// Computed property para el mensaje de disponibilidad
const mensajeDisponibilidad = computed(() => {
  if (estadoStore.estado === 0) {
    return '🟢 Abierto - 9:00 AM - 6:00 PM'
  }else if (estadoStore.estado === 1){
    return disponible.value
    ? '🟢 Abierto - 9:00 AM - 6:00 PM'
    : '🔴 Cerrado - 9:00 AM - 6:00 PM'
  }else{
    return '🔴 Cerrado - 9:00 AM - 6:00 PM'
  }
})

// Al montar el componente, verificar la disponibilidad
onMounted(() => {
  verificarDisponibilidad()
  preguntasStore.obtenerPreguntas();
  eventosStore.obtenerEventos();

  // Opcional: Actualizar cada minuto
  const intervalId = setInterval(verificarDisponibilidad, 30000)

  // Limpiar intervalo cuando se desmonte el componente
  return () => clearInterval(intervalId)
})

import islaTropicalImg from '../assets/img/guia-islaTropical.jpg';
import showDelfinImg from '../assets/img/guia-showDelfin.jpg';
import showLoboImg from '../assets/img/guiaShowLobo.jpg';
import grutaImg from '../assets/img/guiaGruta.jpg';
import biodiversidadImg from '../assets/img/guiaBiodiversidad.jpg';
import granAzulImg from '../assets/img/guiaGranAzul.jpg';

// Items del carrusel
const items = ref([
  {
    name: "Isla Tropical",
    img: islaTropicalImg,
    title: "Isla Tropical",
    description:
      "Un espacio que simula una isla paradisiaca, con plantas exóticas y animales que habitan las costas tropicales. El ambiente cálido y relajante te permitirá disfrutar de la belleza de un entorno lleno de vida, aves y reptiles tropicales.",
  },
  {
    name: "Delfines",
    img: showDelfinImg,
    title: "Delfinario",
    description:
      "Un área dedicada al asombroso mundo de los delfines. Aquí podrás aprender sobre su comportamiento, inteligencia y habilidades a través de espectáculos y actividades interactivas que te conectarán con estos majestuosos animales.",
  },
  {
    name: "Lobos Marinos",
    img: showLoboImg,
    title: "Lobario",
    description:
      "Descubre la vida de los lobos marinos en su hábitad natural. En un espacio diseñado para su bienestar, observarás cómo interactúan y se alimentan, mientras disfrutas de su agilidad y simpatía.",
  },
  {
    name: "Gruta",
    img: grutaImg,
    title: "Gruta Marina",
    description:
      "Una experiencia mística y envolvente, donde te sentirás como si estuvieras dentro de una cueva submarina. Aquí podrás observar criaturas misteriosas y fascinantes, rodeado por un entorno de aguas cristalinas y formaciones rocosas.",
  },
  {
    name: "Biodiversidad",
    img: biodiversidadImg,
    title: "Exposición de Biodiversidad",
    description:
      "Un recorrido interactivo que te permitirá descubrir la rica fauna marina de diferentes partes del mundo. Con un diseño moderno y accesible, esta zona te acercará a especies de peces, corales y otros organismos marinos en sus hábitats más naturales.",
  },
  {
    name: "Restaurante",
    img: granAzulImg,
    title: "Gran Azúl",
    description:
      "Una experiencia culinaria inigualable. En este restaurante, podrás disfrutar de una comida exquisita mientras te rodean delfines nadando en un hambiente único y encantador. El vidrio del restaurante te permitirá ver a los delfines de cerca, creando una atmósfera mágica e inolvidable.",
  },
]);

// Índice del elemento activo
const activeIndex = ref(0);

// Función para avanzar al siguiente elemento
const next = () => {
  activeIndex.value = (activeIndex.value + 1) % items.value.length;
};

// Función para retroceder al elemento anterior
const prev = () => {
  activeIndex.value = (activeIndex.value - 1 + items.value.length) % items.value.length;
};

// Función para asignar clases dinámicas
const getClass = (index) => {
  if (index === activeIndex.value) {
    return "carousel__item--active";
  } else if (
    index === (activeIndex.value - 1 + items.value.length) % items.value.length
  ) {
    return "carousel__item--left";
  } else if (index === (activeIndex.value + 1) % items.value.length) {
    return "carousel__item--right";
  } else {
    return "";
  }
};

</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
*{
  box-sizing: border-box;
  font-family: 'Roboto';
}


    .item-inicio{
  font-size: 18px;
  padding-inline: 10px;
}

.custom-navbar{
  background-color: #080A77;
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
  #fila-cartas{
    justify-content: center;
  }
  .custom-background {
      background: linear-gradient(rgba(31, 31, 31, 0.7), rgba(31, 31, 31, 0.7)), url('../assets/img/fondo.jpg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      padding: 50px 0;
  }
  .carousel-item{
      max-height: 300px;
      border-radius: 15px;
      overflow: hidden;
  }
  .shows-fotos{
    border-radius: 15px;
  }

  @media (max-width: 1200px) {
    .parent-card{
        width: 150rem !important;
    }
    .rotar-card{
      height: 510px !important;
    }
  }

  @media (max-width: 992px) {
    .eslogan{
      font-size: 50px !important;
    }
    .rotar-card{
      height: 460px !important;
    }
  }

  @media (max-width: 767.98px) {
    .rotar-card{
      height: 460px !important;
    }
    .custom-background {
        background-size: cover;
        background-position: center;
    }
    .carousel-item{
      max-height: 230px;
      border-radius: 15px;
      overflow: hidden;  
    }
    #nombre{
      font-size: 20px !important;
    }
  }
  @media (max-width: 575px){
    .rotar-card{
      height: 310px !important;
    }
  }

  /*Flip Card*/
  .rotar-card{
    position: relative;
    height: 430px;
  }

  .rotar-card .face{
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 10px;
    overflow: hidden;
    transition: .5s;
    border: 5px solid #F8C51C;
  }

  .rotar-card .front{
    transform: perspective(600px) rotateY(0deg);
    box-shadow: 0 5px 10px;
  }

  .rotar-card img{
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .rotar-card .front h3{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 45px;
    line-height: 45px;
    color: #fff;
    background: rgba(0, 0, 0, .4);
    text-align: center;
  }

  .rotar-card .back{
    transform: perspective(600px) rotateY(180deg);
    background: rgb(3, 35, 54);
    padding: 15px;
    color: #f3f3f3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    box-shadow: 0 5px 10px #000;
  }

  .rotar-card .back .fecha{
    border-top: solid 1px #f3f3f3;
    height: 50px;
    line-height: 50px;
  }

  .rotar-card .back p{
    letter-spacing: 1px;
  }

  .rotar-card .back .fecha p{
    color: #f3f3f3;
  }

  .rotar-card .back h3{
    font-size: 30px;
    margin-top: 20px;
    letter-spacing: 2px;
  }

  .rotar-card:hover .front{
    transform: perspective(600px) rotateY(180deg);
  }

  .rotar-card:hover .back{
    transform: perspective(600px) rotateY(360deg);
  }

  .info{
    background: linear-gradient(rgba(31, 31, 31, 0.7), rgba(31, 31, 31, 0.7)), url('../assets/img/fondo-info.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 50px 0;
  }
  .info-h2{
    color: #fff;
    font-size: 40px;
  }
  .info-p{
    color: #fff;
    font-size: 18px;
  }
  .info-act-p{
    color: #fff !important;
  }

  /*CARRUSEL DE LENNON*/
  /* Estilos del carrusel */
  #guia {
    background: linear-gradient(rgba(31, 31, 31, 0.7), rgba(31, 31, 31, 0.7)), url('../assets/img/gift.gif');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 50px 0;
  }

  #guia .container{
    position: relative;
  }

  #guia .container .carousel {
  position: relative;
  width: 80%;
  margin: auto;
  perspective: 1000px;
  height: 500px;
  overflow: hidden;
}

#guia .container .carousel__container {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 1s;
  position: relative;
  transform-style: preserve-3d;
}

#guia .container .carousel__item {
  flex: 0 0 100%;
  backface-visibility: hidden;
  position: absolute;
  opacity: 0;
  transform: translateZ(-300px);
  transition: opacity 1s, transform 1s;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Estilo de las tarjetas */
#guia .container .carousel__item .card {
  display: flex;
  flex-direction: column;
  width: 40%; /* Hacemos las tarjetas más pequeñas (40%) */
  height: 500px; /* Altura fija para las tarjetas */
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Esto asegura que no haya overflow innecesario */
}

#guia .container .carousel__item .card-img-top {
  width: 100%;
  height: 200px; /* Altura fija para las imágenes */
  object-fit: cover; /* Asegura que la imagen se ajuste sin distorsionarse */
}

/* El cuerpo de la tarjeta, ajustado al tamaño fijo */
#guia .container .carousel__item .card-body {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Asegura que el texto comience desde arriba */
  padding: 15px;
  color: #333;
  flex-grow: 1; /* Esto hace que el cuerpo ocupe todo el espacio disponible */
  overflow-y: auto; /* Permite el desplazamiento solo en el eje Y (vertical) */
  height: 100%; /* Asegura que la tarjeta ocupe toda la altura del contenedor */
}

/* Descripción en color gris oscuro */
#guia .container .carousel__item .card-text {
  color: #555;
}

#guia .container .carousel__item--active {
  opacity: 1;
  transform: translateZ(0);
}

#guia .container .carousel__item--left,
#guia .container .carousel__item--right {
  opacity: 0.6;
  transform: translateZ(-150px);
}

#guia .container .carousel__item--left {
  transform: translateZ(-150px) translateX(-300px) rotateY(45deg);
}

#guia .container .carousel__item--right {
  transform: translateZ(-150px) translateX(300px) rotateY(-45deg);
}

/* Botón de navegación en posición fija a la derecha */
#guia .container .carousel__nav {
  position: flex  ; /* Fijamos la posición */
  width: 100%;
  transform: translateY(-50%); /* Alineación precisa */
  z-index: 10; /* Aseguramos que esté sobre otros elementos */
  display: flex;
  justify-content: space-between;
}

#guia .container .carousel__nav button {
  color: #fff;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 6em;
}

/* Responsividad */
@media (max-width: 768px) {
  #guia .container .carousel__item .card {
      width: 90%; /* Aumentamos el tamaño en pantallas pequeñas */
      height: 400px; /* Mantenemos la altura fija */
  }

  .carousel__item .card-body {
      height: auto;
  }
}

@media (min-width: 769px) {
  /* Ajustes para pantallas más grandes */
  #guia .container .carousel__item .card-body {
      height: auto; /* Mantener la altura fija */
  }
}

/* Personalización de la barra de desplazamiento */
#guia .container .carousel__item .card-body::-webkit-scrollbar {
  width: 8px;
}

#guia .container .carousel__item .card-body::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

#guia .container .carousel__item .card-body::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

/*ACORDEONES*/
/* Estilo personalizado para acordeón oscuro */
.accordion-dark .accordion-item { 
  background-color: #343a40; /* Color de fondo oscuro */ 
  color: white; /* Color de texto claro */ 
  border: 3px solid #495057; /* Sin bordes */ 
} 
.accordion-dark .accordion-button { 
  background-color: #343a40; /* Color de fondo del botón */ 
  color: white; /* Color de texto del botón */ 
} 
.accordion-dark .accordion-button:not(.collapsed) { 
  color: white; /* Color de texto del botón activo */ 
  background-color: #495057; /* Color de fondo del botón activo */ 
} 
.accordion-dark .accordion-body { 
  background-color: #495057; /* Color de fondo del cuerpo */ 
  color: white; /* Color de texto del cuerpo */ 
}

#reservas {
  background: linear-gradient(rgba(31, 31, 31, 0.7), rgba(31, 31, 31, 0.7)), url('../assets/img/reserva.avif');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 50px 0;
}

#reservas .card-title {
  font-size: 50px; /* Título grande */
}

#reservas .card-text {
  font-size: 30px; /* Texto descriptivo */
}

.btn-reserva {
  color: #f3f3f3;
  font-size: 20px;
  border: solid 1px #fff;
  border-radius: 20px;
  background-color: #F8C51C;
  position: relative;
  overflow: hidden;
}

.btn-reserva::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%; width: 100%; 
  height: 100%; 
  background-color: #FFB700; /* Segundo tono de amarillo */ 
  transition: left 0.5s ease; /* Transición suave de color */
}

.btn-reserva:hover::before { 
  left: 100%; /* Mueve el fondo desde la izquierda hasta la derecha */ 
}

.btn-reserva span { 
  position: relative; /* Asegura que el contenido del botón esté por encima */ 
  color: #fff;
}

/* Media Query para pantallas pequeñas (móviles y tablets) */
@media (max-width: 768px) {
  #reservas .row {
    margin: 20px 0; /* Ajustar márgenes para pantallas más pequeñas */
  }

  #reservas .col-md-6 {
    text-align: center; /* Centrar el contenido en pantallas pequeñas */
  }

  #reservas .card-title {
    font-size: 35px; /* Reducir tamaño de fuente en móviles */
  }

  #reservas .card-text {
    font-size: 18px; /* Reducir tamaño de fuente en móviles */
  }

  .btn-reserva {
    font-size: 18px; /* Reducir tamaño del texto del botón */
    padding: 10px 20px; /* Ajustar el tamaño del botón */
  }

  .btn-reserva span {
    font-size: 16px; /* Ajustar el tamaño del texto dentro del botón */
  }

  .img-fluid {
    max-width: 100%; /* Asegurar que la imagen no se desborde en pantallas pequeñas */
    height: auto;
  }

  #reservas {
    padding: 30px 0; /* Reducir el padding en pantallas pequeñas */
  }
}


.img-bordeadas{
  border: solid 5px #F8C51C;
  border-radius: 15px;
}

.accordion-body span{
  color: #F8C51C;
}
</style>

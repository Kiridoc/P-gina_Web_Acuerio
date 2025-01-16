import showLoboImg from '../assets/img/showLobo.jpg';
import showDelfinImg from '../assets/img/showDelfin.jpg';
import showPayasosYMagos from '../assets/img/showPayaso.jpg';

//ABIERTO_CERRADO_AUTO
export const useEstadoStore = defineStore('estado', {
  state: () => ({
    estado: 1, // Valor inicial del estado (Automático)
  }),
  actions: {
    cambiarEstado(nuevoEstado) {
      this.estado = nuevoEstado;
    },
  },
});

// stores/authStore.js
import { defineStore } from 'pinia';
import { loginUser, logoutUser, isAuthenticated, getUserRole, getUserId } from '../services/authService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    role: null,
    userId: null,
    loading: false,
    error: null
  }),

  getters: {
    isAdmin: (state) => state.role === 'admin',
    isUser: (state) => state.role === 'user',
    hasError: (state) => state.error !== null
  },

  actions: {
    async iniciarSesion(usuario, password) {
      this.loading = true;
      this.error = null;

      try {
        await loginUser(usuario, password);
        this.isAuthenticated = true;
        this.role = getUserRole();
        this.userId = getUserId();
        return true;
      } catch (error) {
        this.error = error.message || 'Error al iniciar sesión';
        this.isAuthenticated = false;
        this.role = null;
        this.userId = null;
        return false;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      logoutUser();
      this.resetState();
    },

    verificarAutenticacion() {
      this.isAuthenticated = isAuthenticated();
      if (this.isAuthenticated) {
        this.role = getUserRole();
        this.userId = getUserId();
      } else {
        this.resetState();
      }
    },

    resetState() {
      this.isAuthenticated = false;
      this.role = null;
      this.userId = null;
      this.error = null;
    },

    clearError() {
      this.error = null;
    }
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'auth',
        storage: localStorage,
        paths: ['isAuthenticated', 'role', 'userId']
      }
    ]
  }
});

//EVENTOS
import { getEventos, createEvento, deleteEvento, updateEvento, deleteAllEventos } from '../services/eventoService';

export const useEventosStore = defineStore('eventos', {
  state: () => ({
    eventos: []
  }),
  actions: {
    async obtenerEventos() {
      try {
        this.eventos = await getEventos();
      }catch (error) {
        console.error('Error al obtener eventos:', error)
      }
    },
    async agregarEvento(nuevoEvento) {
      try {
        const evento = await createEvento(nuevoEvento);
        this.eventos.push(evento);
      } catch (error) {
        console.error('Error al agregar evento:', error);
      }
    },
    async actualizarEvento(id, eventoActualizado) {
      try {
        const evento = await updateEvento(id, eventoActualizado);
        const index = this.eventos.findIndex(e => e.id === id);
        if (index !== -1) this.eventos.splice(index, 1, evento);
      } catch (error) {
        console.error('Error al actualizar evento:', error);
      }
    },
    async eliminarEvento(id) {
      try {
        await deleteEvento(id);
        this.eventos = this.eventos.filter(e => e.id !== id);
      } catch (error) {
        console.error('Error al eliminar evento:', error);
      }
    },
    async eliminarEventos() {
      try {
        await deleteAllEventos(id);
        this.eventos = [];
      } catch (error) {
        console.error('Error al eliminar eventos:', error);
      }
    }
  }
})

//BUZÓN
// stores/adminStore.js
import { getCorreos, createCorreo, updateCorreo, deleteCorreo } from '../services/correoService';

export const useCorreosStore = defineStore('correos', {
  state: () => ({
    correos: [] // Almacenamos los correos aquí
  }),
  actions: {
    async obtenerCorreos() {
      try {
        this.correos = await getCorreos();  // Obtenemos los correos desde la API
      } catch (error) {
        console.error('Error al obtener correos:', error);
      }
    },
    async agregarCorreo(nuevoCorreo) {
      try {
        const correo = await createCorreo(nuevoCorreo);  // Creamos el correo en la API
        this.correos.push(correo);  // Agregamos el correo al estado
      } catch (error) {
        console.error('Error al agregar correo:', error);
      }
    },
    async actualizarCorreo(id, correoActualizado) {
      try {
        const correo = await updateCorreo(id, correoActualizado);  // Actualizamos el correo en la API
        const index = this.correos.findIndex(c => c.id === id);
        if (index !== -1) {
          this.correos.splice(index, 1, correo);  // Actualizamos el correo en el estado
        }
      } catch (error) {
        console.error('Error al actualizar correo:', error);
      }
    },
    async eliminarCorreo(id) {
      try {
        await deleteCorreo(id);  // Eliminamos el correo de la API
        this.correos = this.correos.filter(c => c.id !== id);  // Eliminamos el correo del estado
      } catch (error) {
        console.error('Error al eliminar correo:', error);
      }
    }
  }
});




//PREGUNTAS
import { getPreguntas, createPregunta, updatePregunta, deletePregunta } from '../services/preguntaService';

export const usePreguntasStore = defineStore('preguntas', {
  state: () => ({
    preguntas: []
  }),
  actions: {
    async obtenerPreguntas() {
      try {
        this.preguntas = await getPreguntas();
      } catch (error) {
        console.error('Error al obtener preguntas:', error);
      }
    },
    async agregarPregunta(nuevaPregunta) {
      try {
        const pregunta = await createPregunta(nuevaPregunta);
        this.preguntas.push(pregunta);
      } catch (error) {
        console.error('Error al agregar pregunta:', error);
      }
    },
    async actualizarPregunta(id, preguntaActualizada) {
      try {
        const pregunta = await updatePregunta(id, preguntaActualizada);
        const index = this.preguntas.findIndex(p => p.id === id);
        if (index !== -1) this.preguntas.splice(index, 1, pregunta);
      } catch (error) {
        console.error('Error al actualizar pregunta:', error);
      }
    },
    async eliminarPregunta(id) {
      try {
        await deletePregunta(id);
        this.preguntas = this.preguntas.filter(p => p.id !== id);
      } catch (error) {
        console.error('Error al eliminar pregunta:', error);
      }
    }
  }
});


//USUARIOS
/*export const useUsuariosStore = defineStore('usuarios', {
  state: () => ({
    usuarios: [
      { name: 'Angelita', phone: '58693703', password: '1234' },
      { name: 'Santa', phone: '569911123', password: '1234' },
    ],
  }),
  actions: {
    addUser(user) {
      if (!this.usuarios.some(existingUser => existingUser.name === user.name)) {
        this.usuarios.push(user);
      } else {
        alert("El usuario ya existe.");
      }
    },
    deleteUser(userToDelete) {
      const index = this.usuarios.findIndex(user => user.name === userToDelete.name);
      if (index !== -1) {
        this.usuarios.splice(index, 1); // Usando splice para mantener reactividad
      }
    },
    findUserByName(name) {
      return this.usuarios.find(user => user.name === name);
    }
  }
});*/





//SHOWS
export const useShowsStore = defineStore('shows', {
  state: () => ({
    shows: [
      {
        id: 1,
        title: 'Show de Delfines',
        description: '¡Ven a ver a nuestros delfines hacer magia en el agua!',
        image: showDelfinImg,
        schedules: [
          {
            name: 'Show de la mañana',
            available: false,
            time: '10:30 - 11:15',
            location: 'Delfinario',
            cost: '$120',
            interactionCost: { child: '$1200', adult: '$1500' }
          },
          {
            name: 'Show de la tarde',
            available: true,
            time: '3:00 - 3:45',
            location: 'Delfinario',
            cost: '$120',
            interactionCost: { child: '$1200', adult: '$1500' }
          }
        ]
      },
      {
        id: 2,
            title: 'Show de Lobos Marinos',
            description: '¡Los lobos marinos están listos para hacerte reir y sorprenderte!',
            image: showLoboImg,
            schedules: [
              {
                name: 'Show de la mañana',
                available: true,
                time: '11:30 - 12:15',
                location: 'Lobario',
                cost: '$100',
                interactionCost: { child: '$1000', adult: '$1300' }
              },
              {
                name: 'Show de la tarde',
                available: true,
                time: '3:50 - 4:35',
                location: 'Lobario',
                cost: '$100',
                interactionCost: { child: '$1000', adult: '$1300' }
              }
            ]
      },
      {
        id: 3,
            title: 'Show de Payasos y Magos',
            description: '¡Diversión para toda la familia!',
            image: showPayasosYMagos,
            schedules: [
              {
                name: 'Show de la mañana',
                available: true,
                time: '9:30 - 10:15',
                location: 'Lobario',
                cost: '$120',
                interactionCost: { child: '', adult: '' }
              },
              {
                name: 'Show de la tarde',
                available: false,
                time: '4:00 - 4:45',
                location: 'Lobario',
                cost: '$120',
                interactionCost: { child: '', adult: '' }
              }
            ]

      }
    ],
  }),
  actions: {
    toggleAvailability(showId, scheduleIndex) {
      const show = this.shows.find((s) => s.id === showId);
      if (show) {
        show.schedules[scheduleIndex].available = !show.schedules[scheduleIndex].available;
      }
    },
    updateSchedule(showId, scheduleIndex, updatedData) {
      const show = this.shows.find((s) => s.id === showId);
      if (show) {
        Object.assign(show.schedules[scheduleIndex], updatedData);
      }
    }
  }
});

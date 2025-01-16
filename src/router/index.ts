import { createRouter, createWebHistory } from 'vue-router'
import landingView from '../views/landingView.vue'
import adminView from '../views/adminView.vue'
import preguntaView from '../views/preguntaView.vue'
import loginView2 from '../views/loginView2.vue'
import { jwtDecode } from 'jwt-decode'; // Cambiar a una importación nombrada
import type { JwtPayload } from 'jwt-decode';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',  // Ruta por defecto
      name: 'landing',
      component: landingView
    },
    {
      path: '/landingView',
      name: 'landingView',
      component: landingView
    },
    {
      path: '/adminView',
      name: 'adminView',
      component: adminView,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('accessToken'); // Obtener el token del localStorage

        if (!token || isTokenExpired(token)) {
          // Si no existe un token, redirige al login
          next({ name: 'loginView2' });
        } else {
          // Si existe el token, permite el acceso
          next();
        }
      }
    },
    {
      path: '/preguntaView',
      name: 'preguntaView',
      component: preguntaView
    },
    {
      path: '/loginView2',
      name: 'loginView2',
      component: loginView2
    }
  ],
})

const isTokenExpired = (token: string): boolean => {
  if (!token) return true;

  try {
    const decoded = jwtDecode<JwtPayload>(token);  // Decodificación del JWT
    
    const currentTime = Date.now() / 1000; // Convertimos el tiempo actual a segundos
    
    // Comprobamos si 'exp' está definido antes de compararlo
    if (decoded.exp === undefined) {
      return true; // Si 'exp' no está definido, consideramos que el token ha expirado
    }

    // Agregamos un margen de 30 segundos para prevenir problemas de timing
    return decoded.exp < currentTime + 30;
  } catch (error) {
    return true; // Si ocurre algún error (por ejemplo, JWT mal formado), consideramos que ha expirado
  }
};



export default router
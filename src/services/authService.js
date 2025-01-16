// services/authService.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:3000';

// Crear una instancia de axios con configuración base
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000
});

// Interceptor para agregar el token a todas las peticiones
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getAccessTokenSilently();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 y no hemos intentado renovar el token antes
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshTokenSilently();
        const token = localStorage.getItem('accessToken');
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        logoutUser();
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);

// Funciones principales de autenticación
export const loginUser = async (usuario, password) => {
  try {
    const response = await axiosInstance.post('/api/auten/logueo', {
      nombre: usuario,
      password
    });

    const { accessToken, refreshToken, role, userId } = response.data;

    if (!accessToken || !refreshToken) {
      throw new Error('Credenciales inválidas');
    }

    setAuthData(accessToken, refreshToken, role, userId);
    return true;
  } catch (error) {
    console.error('Error en login:', error);
    throw new Error('Error al iniciar sesión');
  }
};

export const logoutUser = () => {
  clearAuthData();
  window.location.href = '/login';
};

// Funciones auxiliares
const setAuthData = (accessToken, refreshToken, role, userId) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('role', role);
  localStorage.setItem('userId', userId);
};

const clearAuthData = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('role');
  localStorage.removeItem('userId');
};

const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    // Agregamos un margen de 30 segundos para prevenir problemas de timing
    return decoded.exp < currentTime + 30;
  } catch {
    return true;
  }
};

// Función para obtener el token de acceso, renovándolo si es necesario
const getAccessTokenSilently = async () => {
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken || isTokenExpired(accessToken)) {
    try {
      await refreshTokenSilently();
      return localStorage.getItem('accessToken');
    } catch {
      return null;
    }
  }
  
  return accessToken;
};

// Función para renovar el token
const refreshTokenSilently = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!refreshToken || isTokenExpired(refreshToken)) {
    throw new Error('No hay refresh token válido');
  }

  try {
    const response = await axios.post(`${API_URL}/api/auten/refresh-token`, {
      refreshToken
    });

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

    if (!newAccessToken || !newRefreshToken) {
      throw new Error('Tokens inválidos recibidos del servidor');
    }

    setAuthData(
      newAccessToken,
      newRefreshToken,
      localStorage.getItem('role'),
      localStorage.getItem('userId')
    );

    return true;
  } catch (error) {
    clearAuthData();
    throw new Error('Error al renovar el token');
  }
};

// Hooks y utilidades adicionales
export const isAuthenticated = () => {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken && !isTokenExpired(accessToken);
};

export const getUserRole = () => {
  return localStorage.getItem('role');
};

export const getUserId = () => {
  return localStorage.getItem('userId');
};

// Exportar la instancia de axios configurada
export const api = axiosInstance;
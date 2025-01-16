// services/eventoService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/eventos'; // Ajusta el puerto según tu configuración

export const getEventos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createEvento = async (evento) => {
    const token = localStorage.getItem('accessToken');  // Obtener el token

    try {
      const response = await axios.post(API_URL, evento, {
        headers: {
          Authorization: `Bearer ${token}`,  // Enviar el token en la cabecera
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al crear evento:', error);
      throw error;
    }
};

export const updateEvento = async (id, evento) => {
    const token = localStorage.getItem('accessToken');  // Obtener el token

    try {
      const response = await axios.put(`${API_URL}/${id}`, evento, {
        headers: {
          Authorization: `Bearer ${token}`,  // Enviar el token en la cabecera
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el evento:', error);
      throw error;
    }
};

export const deleteEvento = async (id) => {
    const token = localStorage.getItem('accessToken');  // Obtener el token

    try {
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Enviar el token en la cabecera
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
      throw error;
    }
};

export const deleteAllEventos = async () => {
    const token = localStorage.getItem('accessToken');  // Obtener el token

  try {
    const response = await axios.delete(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Enviar el token en la cabecera
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar los eventos:', error);
    throw error;
  }
  };
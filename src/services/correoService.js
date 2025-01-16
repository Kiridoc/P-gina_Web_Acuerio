import axios from 'axios';

const API_URL = 'http://localhost:3000/api/buzon'; // Ajusta el puerto según tu configuración

// Función para obtener correos
export const getCorreos = async () => {
  const token = localStorage.getItem('accessToken');  // Obtener el token del almacenamiento local

  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,  // Enviar el token en la cabecera
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener correos:', error);
    throw error;  // Propagar el error para que pueda ser manejado por el componente
  }
};

// Función para crear un correo
export const createCorreo = async (correo) => {
  const token = localStorage.getItem('accessToken');  // Obtener el token

  try {
    const response = await axios.post(API_URL, correo, {
      headers: {
        Authorization: `Bearer ${token}`,  // Enviar el token en la cabecera
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear correo:', error);
    throw error;
  }
};

// Función para actualizar un correo
export const updateCorreo = async (id, correo) => {
  const token = localStorage.getItem('accessToken');  // Obtener el token

  try {
    const response = await axios.put(`${API_URL}/${id}`, correo, {
      headers: {
        Authorization: `Bearer ${token}`,  // Enviar el token en la cabecera
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar correo:', error);
    throw error;
  }
};

// Función para eliminar un correo
export const deleteCorreo = async (id) => {
  const token = localStorage.getItem('accessToken');  // Obtener el token

  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Enviar el token en la cabecera
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar correo:', error);
    throw error;
  }
};

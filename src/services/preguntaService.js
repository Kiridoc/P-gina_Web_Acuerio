import axios from 'axios';

const API_URL = 'http://localhost:3000/api/preguntas'; // Ajusta el puerto según tu configuración

// Función para obtener preguntas
export const getPreguntas = async () => {
  const token = localStorage.getItem('accessToken');  // Obtener el token del almacenamiento local

  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,  // Enviar el token en la cabecera
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener preguntas:', error);
    throw error;  // Propagar el error para que pueda ser manejado por el componente
  }
};

// Función para crear una pregunta
export const createPregunta = async (pregunta) => {
  const token = localStorage.getItem('accessToken');  // Obtener el token

  try {
    const response = await axios.post(API_URL, pregunta, {
      headers: {
        Authorization: `Bearer ${token}`,  // Enviar el token en la cabecera
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear pregunta:', error);
    throw error;
  }
};

// Función para actualizar una pregunta
export const updatePregunta = async (id, pregunta) => {
  const token = localStorage.getItem('accessToken');  // Obtener el token

  try {
    const response = await axios.put(`${API_URL}/${id}`, pregunta, {
      headers: {
        Authorization: `Bearer ${token}`,  // Enviar el token en la cabecera
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar pregunta:', error);
    throw error;
  }
};

// Función para eliminar una pregunta
export const deletePregunta = async (id) => {
  const token = localStorage.getItem('accessToken');  // Obtener el token

  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Enviar el token en la cabecera
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar pregunta:', error);
    throw error;
  }
};

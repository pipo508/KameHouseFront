
import axios from 'axios';

// Create an Axios instance with default settings
const api = axios.create({
    //baseURL: 'http://192.168.100.5:8080', // url casa
    //baseURL: 'http://192.168.100.17:8080', // url casa papa
    baseURL: 'http://10.51.6.160:8080', //url facu alumnos
    //baseURL: 'http://10.51.6.160:8080',  //url facu invitados,
    //baseURL: 'http://10.51.6.160r:8080', //url celu
    //baseURL: 'http://192.168.18.30:8080',
    //baseUrl: 'http://192.168.4.176:8080', // gym fer
    //baseUrl: 'http://192.168.1.44:8080', //casa jose
    //baseURL: 'http://192.168.100.54:8080', //casa mati
    headers: {
        'Content-Type': 'application/json',
    },
});

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/api/users/login', credentials);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/api/users/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error en registerUser:', error);
    throw error;
  }
};

export const fetchUserRoutine = async (userId) => {
  try {
      const response = await api.get(`/api/users/${userId}/routine`);
      return response.data;
  } catch (error) {
      console.error("Error fetching user routine:", error);
      throw error;
  }
};

export const fetchExercises = async () => {
  try {
      const response = await api.get('/api/exercises');
      return response.data;
  } catch (error) {
      console.error("Error fetching exercises:", error);
      throw error;
  }
};

export const addExerciseToRoutineDay = async (userId, routineDayId, exerciseId, exerciseDetails) => {
  try {
      const response = await api.post(`/api/users/${userId}/routinedays/${routineDayId}/exercises/${exerciseId}`, exerciseDetails);
      return response.data;
  } catch (error) {
      console.error("Error adding exercise to routine day:", error);
      throw error;
  }
};

export const removeExerciseFromRoutineDay = async (userId, routineDayId, exerciseId) => {
    console.log(`Eliminando ejercicio: userId=${userId}, routineDayId=${routineDayId}, exerciseId=${exerciseId}`);
    try {
      const response = await api.delete(`/api/users/${userId}/routinedays/${routineDayId}/exercises/${exerciseId}`);
      console.log("Respuesta de eliminación:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al eliminar ejercicio de día de rutina:", error.response?.data || error.message);
      throw error;
    }
  };

export const removeAllExercisesFromRoutineDay = async (userId, routineDayId) => {
  try {
      await api.delete(`/api/users/${userId}/routinedays/${routineDayId}/exercises`);
  } catch (error) {
      console.error("Error removing all exercises from routine day:", error);
      throw error;
  }
};

export const removeAllExercisesFromAllRoutineDays = async (userId) => {
  try {
      await api.delete(`/api/users/${userId}/routine/exercises`);
  } catch (error) {
      console.error("Error removing all exercises from all routine days:", error);
      throw error;
  }
  
};;
export const getAllUsers = async () => {
    try {
      const response = await api.get('/api/users');
      return response.data;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw error;
    }
  };
  
  export const deleteUser = async (userId) => {
    try {
      await api.delete(`/api/users/${userId}`);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };
  
  export const getUserDetails = async (userId) => {
    try {
      const response = await api.get(`/api/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  };
  
  export const updateUser = async (userId, userData) => {
    try {
      const response = await api.put(`/api/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };
  
  export const getUserRoutine = async (userId) => {
    try {
      const response = await api.get(`/api/users/${userId}/routine`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user routine:", error);
      throw error;
    }
  };
  
  export const getExercisesByMuscleGroup = async (muscleGroup) => {
    try {
      const response = await api.get(`/api/exercises/by-muscle-group/${muscleGroup}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching exercises by muscle group:", error);
      throw error;
    }
    
  };
  export const getPlanPrices = async () => {
    try {
      const response = await api.get('/api/payments/plan-prices');
      return response.data;
    } catch (error) {
      console.error("Error fetching plan prices:", error);
      throw error;
    }
  };
  
  export const updatePlanPrices = async (prices) => {
    try {
      console.log("Sending updated prices to server:", prices);
      const response = await api.put('/api/payments/plan-prices', prices);
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating plan prices:", error.response?.data || error.message);
      throw error;
    }
  };
  
  export const sendPaymentConfirmation = async (userId, paymentDetails) => {
    try {
      const response = await api.post(`/api/payments/${userId}/send-confirmation`, paymentDetails);
      return response.data;
    } catch (error) {
      console.error("Error sending payment confirmation:", error);
      throw error;
    }
  };
  export const getUserPayments = async (userId) => {
    try {
      const response = await api.get(`/api/payments/users/${userId}`);
      
      // Mostrar los datos de los pagos por consola
      console.log("Datos del historial de pagos:", response.data);
      
      return response.data; // Devuelve los pagos obtenidos
    } catch (error) {
      console.error("Error fetching user payments:", error);
      throw error;
    }
};

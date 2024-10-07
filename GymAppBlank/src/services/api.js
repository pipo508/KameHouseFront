import axios from 'axios';

// Create an Axios instance with default settings
const api = axios.create({
    baseURL: 'http://192.168.100.5:8080', // url casa
    //baseURL: 'http://192.168.100.17:8080', // url casa papa
    //baseURL: 'http://10.51.6.160:8080', //url facu alumnos
    //baseURL: 'http://10.51.6.160:8080',  //url facu invitados,
    //baseURL: 'http://172.20.10.5:8080', //url celu
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to register a new user
export const registerUser = async (userData) => {
  try {
      console.log("Attempting to register user:", userData);
      const response = await api.post('/api/users', userData);
      console.log("Registration successful:", response.data);
      return response.data;
  } catch (error) {
      console.error("Registration error:", error);
      if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Error data:", error.response.data);
          console.error("Error status:", error.response.status);
          console.error("Error headers:", error.response.headers);
      } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
      } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error message:", error.message);
      }
      throw error;
  }
};

// Function to login a user
export const loginUser = async (loginData) => {
    try {
        const response = await api.post('api/users/login', loginData);
        console.log("loginData", loginData);
        console.log("Response:", response.data); // Muestra la respuesta en la consola
        return response.data;
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
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

export const removeExerciseFromRoutineDay = async (userId, routineDayId, exerciseRoutineDayId) => {
  try {
      await api.delete(`/api/users/${userId}/routinedays/${routineDayId}/exercises/${exerciseRoutineDayId}`);
  } catch (error) {
      console.error("Error removing exercise from routine day:", error);
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

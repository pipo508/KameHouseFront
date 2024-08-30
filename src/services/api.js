import axios from 'axios';

// Create an Axios instance with default settings
const api = axios.create({
    baseURL: 'http://10.51.6.160:8080', // Replace with your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to register a new user
export const registerUser = async (userData) => {
    try {
        const response = await api.post('/users', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to login a user
export const loginUser = async (loginData) => {
    try {
        const response = await api.post('/users/login', loginData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
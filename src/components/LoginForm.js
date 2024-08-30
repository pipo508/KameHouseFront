import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { loginUser } from '../services/api';  // Asegúrate de que la ruta es correcta

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const loginData = {
      email,
      password,
    };

    try {
      const data = await loginUser(loginData);

      if (data) {
        Alert.alert(
          'Success',
          'You have logged in successfully',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
        // Aquí puedes redirigir al usuario o manejar la sesión iniciada
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    width: '80%',
    backgroundColor: '#1c1c1e',  // Fondo gris oscuro para contraste
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#FFD700', // Color de la sombra dorada
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.8, // Opacidad de la sombra
    shadowRadius: 15, // Difuminado de la sombra
  },
  title: {
    fontSize: 28,
    color: '#FFD700',  // Texto dorado
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#FFD700',  // Borde dorado
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    color: '#fff',  // Texto blanco
    backgroundColor: '#2c2c2e',  // Fondo ligeramente más claro para los inputs
  },
  loginButton: {
    backgroundColor: '#FFD700',  // Fondo dorado para el botón
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#000',  // Texto negro para contraste en el botón
    fontSize: 18,
    fontWeight: 'bold',
  },
});

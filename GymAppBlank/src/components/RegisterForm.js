import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../services/api'; // Asegúrate de que la ruta es correcta
import { AuthContext } from '../context/AuthContext'; // Importa el AuthContext

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [typePlan, setTypePlan] = useState('Principiante'); // Estado para el tipo de plan
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOptions, setShowOptions] = useState(false); // Estado para mostrar/ocultar opciones
  const navigation = useNavigation(); // Obtén el objeto navigation
  const { register } = useContext(AuthContext); // Obtén el método register del contexto

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const userData = {
      name,
      surname,
      address,
      phone,
      age,
      email,
      password,typePlan,
      
    };

    try {
      const response = await registerUser(userData);

      if (response && response.role) {
        register(response);
        Alert.alert('Success', 'You have registered successfully');
        navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <View style={styles.registerContainer}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Surname"
        placeholderTextColor="#999"
        value={surname}
        onChangeText={setSurname}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#999"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        placeholderTextColor="#999"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        placeholderTextColor="#999"
        value={age}
        onChangeText={setAge}
        keyboardType="phone-pad"
      />
      {/* Dropdown for Type Plan moved here */}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowOptions(!showOptions)}
      >
        <Text style={styles.dropdownText}>{typePlan}</Text>
      </TouchableOpacity>
      {showOptions && (
        <View style={styles.optionsContainer}>
          {['Principiante', 'Intermedio', 'Avanzado'].map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.option}
              onPress={() => {
                setTypePlan(option);
                setShowOptions(false);
              }}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    width: '80%',
    backgroundColor: '#1c1c1e',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  title: {
    fontSize: 28,
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#FFD700',
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    color: '#fff',
    backgroundColor: '#2c2c2e',
  },
  dropdown: {
    height: 50,
    borderColor: '#FFD700',
    borderWidth: 2,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#2c2c2e',
    marginBottom: 15,
  },
  dropdownText: {
    color: '#fff',
  },
  optionsContainer: {
    backgroundColor: '#1c1c1e',
    borderColor: '#FFD700',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
  },
  option: {
    padding: 10,
  },
  optionText: {
    color: '#FFD700',
  },
  registerButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import { updatePlanPrices, getPlanPrices, sendPaymentConfirmation } from '../services/api';
import { FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

const AdminPlanPricesScreen = () => {
  const [prices, setPrices] = useState({
    PRINCIPIANTE: '',
    INTERMEDIO: '',
    AVANZADO: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const { userId, role } = useContext(AuthContext);

  useEffect(() => {
    console.log("Component mounted. UserId:", userId, "Role:", role);
    loadPrices();
  }, []);

  const loadPrices = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching prices...");
      const currentPrices = await getPlanPrices();
      console.log("Prices fetched:", currentPrices);
      setPrices(currentPrices);
    } catch (error) {
      console.error("Error loading prices:", error);
      Alert.alert('Error', 'No se pudieron cargar los precios: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      // Convertir los valores a números antes de enviarlos
      const numericPrices = Object.keys(prices).reduce((acc, key) => {
        acc[key] = parseFloat(prices[key]);
        return acc;
      }, {});
  
      console.log("Updating prices:", numericPrices);
      await updatePlanPrices(numericPrices);
      Alert.alert('Éxito', 'Precios actualizados correctamente');
      // Recargar los precios después de actualizar
      await loadPrices();
    } catch (error) {
      console.error("Error updating prices:", error);
      Alert.alert('Error', 'No se pudieron actualizar los precios: ' + error.message);
    }
  };

  const handleSendConfirmation = async (plan) => {
    if (!userId) {
      Alert.alert('Error', 'No hay un usuario autenticado');
      return;
    }
  
    try {
      const paymentDetails = {
        plan: plan,
        amount: parseFloat(prices[plan]),
        date: new Date().toISOString()
      };
      console.log("Sending payment confirmation:", paymentDetails);
      await sendPaymentConfirmation(userId, paymentDetails);
      Alert.alert('Éxito', 'Comprobante de pago enviado por correo');
    } catch (error) {
      console.error("Error sending payment confirmation:", error.response?.data || error.message);
      Alert.alert('Error', 'No se pudo enviar el comprobante de pago: ' + (error.response?.data?.message || error.message));
    }
  };

  if (role !== 0 && role !== '0') {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Acceso no autorizado</Text>
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#FFD700" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Administrar Precios de Planes</Text>
        {Object.keys(prices).map((plan) => (
          <View key={plan} style={styles.planContainer}>
            <Text style={styles.planText}>{plan}</Text>
            <View style={styles.inputContainer}>
              <FontAwesome5 name="dollar-sign" size={20} color="#FFD700" style={styles.icon} />
              <TextInput
                style={styles.input}
                value={prices[plan].toString()}
                onChangeText={(text) => setPrices({...prices, [plan]: text})}
                keyboardType="numeric"
                placeholder="Ingrese el precio"
                placeholderTextColor="#999"
              />
            </View>
            <TouchableOpacity 
              style={styles.sendButton} 
              onPress={() => handleSendConfirmation(plan)}
            >
              <FontAwesome5 name="paper-plane" size={20} color="#000" />
              <Text style={styles.sendButtonText}>Enviar Comprobante</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#FFD700',
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  planContainer: {
    backgroundColor: '#1F1F1F',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  planText: {
    fontSize: 22,
    color: '#FFD700',
    marginBottom: 15,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#fff',
    fontSize: 18,
  },
  sendButton: {
    flexDirection: 'row',
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFD700',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6.0,
    elevation: 6,
  },
  sendButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#4CAF50',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 7.65,
    elevation: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdminPlanPricesScreen;

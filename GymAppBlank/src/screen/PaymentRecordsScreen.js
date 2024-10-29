import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserPayments } from '../services/api';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const UserPaymentRecords = ({ route, navigation }) => {
  const { userId } = route.params;
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPaymentHistory();
  }, []);

  const loadPaymentHistory = async () => {
    try {
      setIsLoading(true);
      const payments = await getUserPayments(userId);
      setPaymentHistory(payments);
    } catch (error) {
      console.error("Error al cargar historial de pagos:", error);
      Alert.alert("Error", "No se pudo cargar el historial de pagos");
    } finally {
      setIsLoading(false);
    }
  };

  const renderPaymentItem = ({ item }) => (
    <LinearGradient
      colors={['#ffffff', '#f0f0f0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.paymentItem}
    >
      <View style={styles.paymentInfo}>
        <Text style={styles.paymentDate}>{new Date(item.paymentDate).toLocaleDateString()}</Text>
        <Text style={styles.paymentAmount}>${item.amount.toFixed(2)}</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: item.paymentStatus === 'CONFIRMADO' ? '#4CAF50' : '#FFA000' }]}>
             <Text style={styles.statusText}>{item.paymentStatus}</Text>
    </View>


    </LinearGradient>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FFD700', '#FFA500']}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Historial de Pagos</Text>
      </LinearGradient>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200EE" />
          <Text style={styles.loadingText}>Cargando historial de pagos...</Text>
        </View>
      ) : paymentHistory.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#757575" />
          <Text style={styles.emptyText}>No hay pagos registrados.</Text>
        </View>
      ) : (
        <FlatList
          data={paymentHistory}
          renderItem={renderPaymentItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    elevation: 4,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  listContainer: {
    padding: 16,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentDate: {
    fontSize: 16,
    color: '#424242',
    marginBottom: 4,
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#757575',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 16,
    fontSize: 18,
    color: '#757575',
    textAlign: 'center',
  },
});

export default UserPaymentRecords;
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TextInput, TouchableOpacity, Modal, Switch, ActivityIndicator  } from 'react-native';
import { getUserDetails, updateUser, sendPaymentConfirmation } from '../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const GOLD_COLOR = '#FFD700';
const BLACK_COLOR = '#000000';
const LIGHT_GOLD = '#FFF7D6';
const DARK_GRAY = '#333333';

const AdminUserDetailEditScreen = ({ route }) => {
  const { userId } = route.params;
  const [user, setUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSendingPayment, setIsSendingPayment] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [showPaymentAmountModal, setShowPaymentAmountModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    try {
      setIsLoading(true);
      const userData = await getUserDetails(userId);
      setUser(userData);
      setEditUser(userData);
      setSelectedPlan(userData.typePlan || '');
    } catch (error) {
      console.error("Error al cargar detalles del usuario:", error);
      Alert.alert("Error", "No se pudieron cargar los detalles del usuario.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await updateUser(userId, editUser);
      setUser(editUser);
      Alert.alert("Éxito", "Usuario actualizado correctamente");
      setShowEditModal(false);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      Alert.alert("Error", "No se pudo actualizar el usuario");
    }
  };

  const handleSendPaymentConfirmation = async () => {
    if (!paymentAmount || !selectedPlan || !selectedPaymentMethod) {
      Alert.alert("Error", "Por favor, complete todos los campos de pago");
      return;
    }
    try {
      setIsSendingPayment(true);
      await sendPaymentConfirmation(userId, { 
        amount: paymentAmount,
        plan: selectedPlan,
        paymentMethod: selectedPaymentMethod
      });
      Alert.alert("Éxito", "Comprobante de pago enviado correctamente");
      setPaymentAmount('');
      setUser(prevUser => ({ ...prevUser, typePlan: selectedPlan }));
      setEditUser(prevUser => ({ ...prevUser, typePlan: selectedPlan }));
    } catch (error) {
      console.error("Error al enviar comprobante de pago:", error);
      Alert.alert("Error", "No se pudo enviar el comprobante de pago");
    } finally {
      setIsSendingPayment(false);
    }
  };

  const renderField = (label, value, key) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value?.toString() || ''}</Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando detalles del usuario...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Detalles del Usuario</Text>
      </View>
      
      <View style={styles.userInfoSection}>
        {renderField('Nombre', user.name, 'name')}
        {renderField('Apellido', user.surname, 'surname')}
        {renderField('Dirección', user.address, 'address')}
        {renderField('Teléfono', user.phone, 'phone')}
        {renderField('Edad', user.age, 'age')}
        {renderField('Email', user.email, 'email')}
        {renderField('Plan Actual', user.typePlan, 'typePlan')}
        {renderField('Activo', user.active ? 'Sí' : 'No', 'active')}
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => setShowEditModal(true)}>
        <Text style={styles.editButtonText}>Editar Usuario</Text>
      </TouchableOpacity>

      <View style={styles.paymentSection}>
        <Text style={styles.sectionTitle}>Enviar Comprobante de Pago</Text>
        <TouchableOpacity style={styles.selector} onPress={() => setShowPaymentAmountModal(true)}>
          <Text style={styles.selectorText}>{paymentAmount || 'Seleccionar Monto'}</Text>
          <Icon name="arrow-drop-down" size={24} color={GOLD_COLOR} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.selector} onPress={() => setShowPlanModal(true)}>
          <Text style={styles.selectorText}>{selectedPlan || 'Seleccionar Plan'}</Text>
          <Icon name="arrow-drop-down" size={24} color={GOLD_COLOR} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.selector} onPress={() => setShowPaymentMethodModal(true)}>
          <Text style={styles.selectorText}>{selectedPaymentMethod || 'Método de Pago'}</Text>
          <Icon name="arrow-drop-down" size={24} color={GOLD_COLOR} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.sendPaymentButton} 
          onPress={handleSendPaymentConfirmation}
          disabled={isSendingPayment}
        >
          {isSendingPayment ? (
            <ActivityIndicator size="small" color={BLACK_COLOR} />
          ) : (
            <Text style={styles.sendPaymentButtonText}>Enviar Comprobante</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Modal para editar campos específicos del usuario */}
      <Modal visible={showEditModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Editar Usuario</Text>
              {[
                { key: 'name', label: 'Nombre' },
                { key: 'surname', label: 'Apellido' },
                { key: 'address', label: 'Dirección' },
                { key: 'phone', label: 'Teléfono' },
                { key: 'age', label: 'Edad' },
                { key: 'email', label: 'Email' },
                { key: 'typePlan', label: 'Plan Actual' },
              ].map(({ key, label }) => (
                <View key={key} style={styles.modalFieldContainer}>
                  <Text style={styles.modalFieldLabel}>{label}</Text>
                  <TextInput
                    style={styles.modalInput}
                    value={editUser[key]?.toString()}
                    onChangeText={(text) => setEditUser({ ...editUser, [key]: text })}
                  />
                </View>
              ))}
              <View style={styles.modalFieldContainer}>
                <Text style={styles.modalFieldLabel}>Activo</Text>
                <Switch
                  value={editUser.active}
                  onValueChange={(value) => setEditUser({ ...editUser, active: value })}
                />
              </View>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleUpdateUser}
              >
                <Text style={styles.modalButtonText}>Guardar Cambios</Text>
              </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowEditModal(false)}>
              <Text style={styles.modalCloseButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para seleccionar monto */}
      <Modal visible={showPaymentAmountModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ingresar Monto del Pago</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Monto del pago"
              placeholderTextColor={DARK_GRAY}
              value={paymentAmount}
              onChangeText={setPaymentAmount}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowPaymentAmountModal(false)}
            >
              <Text style={styles.modalButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para seleccionar plan */}
      <Modal visible={showPlanModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar Plan</Text>
            {['PRINCIPIANTE', 'INTERMEDIO', 'AVANZADO'].map((plan) => (
              <TouchableOpacity
                key={plan}
                style={styles.modalOption}
                onPress={() => {
                  setSelectedPlan(plan);
                  setShowPlanModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>{plan}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowPlanModal(false)}>
              <Text style={styles.modalCloseButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para seleccionar método de pago */}
      <Modal visible={showPaymentMethodModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar Método de Pago</Text>
            {['TARJETA', 'MERCADO PAGO', 'EFECTIVO'].map((method) => (
              <TouchableOpacity
                key={method}
                style={styles.modalOption}
                onPress={() => {
                  setSelectedPaymentMethod(method);
                  setShowPaymentMethodModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>{method}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowPaymentMethodModal(false)}>
              <Text style={styles.modalCloseButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginBottom: 50,
    flex: 1,
    backgroundColor: LIGHT_GOLD,
  },
  modalSelector: {
    height: 40,
    borderColor: GOLD_COLOR,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalSelectorText: {
    color: BLACK_COLOR,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LIGHT_GOLD,
  },
  header: {
    backgroundColor: BLACK_COLOR,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GOLD_COLOR,
  },
  loadingText: {
    fontSize: 18,
    color: BLACK_COLOR,
  },
  userInfoSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  paymentSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: GOLD_COLOR,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BLACK_COLOR,
    marginBottom: 15,
  },
  fieldContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: LIGHT_GOLD,
    borderRadius: 5,
  },
  fieldLabel: {
    fontSize: 16,
    color: BLACK_COLOR,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  fieldValue: {
    fontSize: 16,
    color: DARK_GRAY,
  },
  selector: {
    height: 40,
    borderColor: GOLD_COLOR,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectorText: {
    color: BLACK_COLOR,
  },
  sendPaymentButton: {
    backgroundColor: GOLD_COLOR,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  sendPaymentButtonText: {
    color: BLACK_COLOR,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: BLACK_COLOR,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GOLD,
  },
  modalOptionText: {
    color: BLACK_COLOR,
    fontSize: 18,
    textAlign: 'center',
  },
  modalCloseButton: {
    backgroundColor: DARK_GRAY,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  modalCloseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalFieldContainer: {
    marginBottom: 15,
  },
  modalFieldLabel: {
    fontSize: 16,
    color: BLACK_COLOR,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  modalInput: {
    height: 40,
    borderColor:5,

  },
  modalInput: {
    height: 40,
    borderColor: GOLD_COLOR,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  modalButton: {
    backgroundColor: GOLD_COLOR,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  modalButtonText: {
    color: BLACK_COLOR,
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: BLACK_COLOR,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 20,
  },
  editButtonText: {
    color: GOLD_COLOR,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdminUserDetailEditScreen;
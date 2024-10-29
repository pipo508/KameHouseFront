import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const UserItem = ({ user, onEdit, onViewRoutine, onDelete, onViewPay }) => (
  <View style={styles.userItem}>
    <Text style={styles.userName}>{user.name}</Text>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.iconButton} onPress={() => onEdit(user.id)}>
        <Feather name="edit" size={20} color="#ffffff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={() => onViewPay(user.id)}>
        <MaterialIcons name="payment" size={20} color="#ffffff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={() => onViewRoutine(user.id)}>
        <Feather name="calendar" size={20} color="#ffffff" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.iconButton, styles.deleteButton]} onPress={() => onDelete(user.id)}>
        <Feather name="trash-2" size={20} color="#ffffff" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userName: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
});

export default UserItem;

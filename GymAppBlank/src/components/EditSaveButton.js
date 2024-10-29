import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const EditSaveButton = ({ isEditing, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>
      {isEditing ? 'Guardar Cambios' : 'Editar Usuario'}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 80,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditSaveButton;
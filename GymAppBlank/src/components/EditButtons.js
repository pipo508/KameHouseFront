import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SIZES, WORKOUT_TEXT } from '../constantes/constantes';

const EditButtons = ({ editMode, onEditMode, onRemoveAllExercises }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.editButton} onPress={onEditMode}>
      <Text style={styles.editButtonText}>
        {editMode ? WORKOUT_TEXT.FINISH_EDIT : WORKOUT_TEXT.EDIT_ROUTINE}
      </Text>
    </TouchableOpacity>
    {editMode && (
      <TouchableOpacity style={styles.removeAllButton} onPress={onRemoveAllExercises}>
        <Text style={styles.removeAllButtonText}>{WORKOUT_TEXT.REMOVE_ALL}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#3498DB', // Azul para edición
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  editButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  removeAllButton: {
    backgroundColor: '#C0392B', // Rojo oscuro para eliminar todo
    padding: 10,
    borderRadius: 5,
  },
  removeAllButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default EditButtons;
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { removeExerciseFromRoutineDay } from '../services/api';
import { ADMIN_ROUTINE_TEXT, COLORS, SIZES } from '../constantes/constantes';

const ExerciseItem = ({ exercise, dayId, userId, onRemove }) => {
  const handleRemoveExercise = async () => {
    try {
      await removeExerciseFromRoutineDay(userId, dayId, exercise.exerciseId);
      onRemove();
    } catch (error) {
      console.error("Error al eliminar ejercicio:", error);
      Alert.alert("Error", ADMIN_ROUTINE_TEXT.ERROR_REMOVE_EXERCISE);
    }
  };

  return (
    <View style={styles.exerciseItem}>
      <Text style={styles.exerciseName}>{exercise.exerciseName}</Text>
      <Text>Series: {exercise.series}</Text>
      <Text>Repeticiones: {exercise.repetitions}</Text>
      <Text>Peso: {exercise.weight}</Text>
      <Text>Descanso: {exercise.waitTime}</Text>
      <TouchableOpacity 
        style={styles.removeButton} 
        onPress={handleRemoveExercise}
      >
        <Text style={styles.removeButtonText}>{ADMIN_ROUTINE_TEXT.REMOVE}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  exerciseItem: {
    marginTop: 10,
    padding: 10,
    backgroundColor: COLORS.EXERCISE_BACKGROUND,
    borderRadius: 5,
  },
  exerciseName: {
    fontSize: SIZES.BODY,
    fontWeight: 'bold',
  },
  removeButton: {
    marginTop: 5,
    backgroundColor: COLORS.BUTTON_REMOVE,
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: COLORS.TEXT_PRIMARY,
  },
});

export default ExerciseItem;
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ExerciseTable from '../components/ExerciseTable';
import { SIZES, WORKOUT_TEXT } from '../constantes/constantes';

const DaySection = ({ day, editMode, onAddExercise, onRemoveAllExercisesFromDay, onRemoveExercise, getMuscleColor }) => (
  <View style={styles.daySection}>
    <Text style={styles.dayTitle}>{day.dayName}</Text>
    {editMode && (
      <View style={styles.editButtons}>
        <TouchableOpacity style={styles.addButton} onPress={() => onAddExercise(day)}>
          <Text style={styles.addButtonText}>{WORKOUT_TEXT.ADD_EXERCISE}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.removeAllDayButton} onPress={() => onRemoveAllExercisesFromDay(day.dayId)}>
          <Text style={styles.removeAllDayButtonText}>{WORKOUT_TEXT.REMOVE_DAY_EXERCISES}</Text>
        </TouchableOpacity>
      </View>
    )}
    <ExerciseTable 
      day={day}
      exercises={day.exercises}
      editMode={editMode}
      onRemoveExercise={onRemoveExercise}
      getMuscleColor={getMuscleColor}
    />
  </View>
);

const styles = StyleSheet.create({
  daySection: {
    marginBottom: 20,
  },
  dayTitle: {
    fontSize: SIZES.SUBTITLE,
    color: '#FFD700', // Azul oscuro para títulos
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#2ECC71', // Verde para agregar
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  addButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  removeAllDayButton: {
    backgroundColor: '#E74C3C', // Rojo para eliminar
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  removeAllDayButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default DaySection;
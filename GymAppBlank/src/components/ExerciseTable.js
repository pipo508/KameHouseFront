import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ExerciseTable = ({ day, exercises, editMode, onRemoveExercise, getMuscleColor }) => {
  return (
    <View>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerItem, styles.headerItemFirst]}>Ejercicio</Text>
        <Text style={styles.headerItem}>Series</Text>
        <Text style={styles.headerItem}>Repeticiones</Text>
        <Text style={styles.headerItem}>Peso</Text>
        <Text style={styles.headerItem}>Tiempo de espera</Text>
        {editMode && <Text style={styles.headerItem}>Acciones</Text>}
      </View>
      {exercises && exercises.length > 0 ? (
        exercises.map((exercise, exerciseIndex) => (
          <View key={exerciseIndex} style={[styles.tableRow, { backgroundColor: getMuscleColor(exercise.muscleGroup) }]}>
            <Text style={styles.rowItem}>{exercise.exerciseName}</Text>
            <Text style={styles.rowItem}>{exercise.series}</Text>
            <Text style={styles.rowItem}>{exercise.repetitions}</Text>
            <Text style={styles.rowItem}>{exercise.weight}</Text>
            <Text style={styles.rowItem}>{exercise.waitTime}</Text>
            {editMode && (
              <TouchableOpacity 
                style={styles.removeButton} 
                onPress={() => onRemoveExercise(day, exercise)}
              >
                <Text style={styles.removeButtonText}>Borrar</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.noExercisesText}>No hay ejercicios para este día.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  headerItem: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
  },
  headerItemFirst: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 5,
  },
  rowItem: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  removeButton: {
    backgroundColor: '#f44336',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  noExercisesText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ExerciseTable;
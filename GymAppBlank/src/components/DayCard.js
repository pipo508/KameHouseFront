import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ADMIN_ROUTINE_TEXT, COLORS, SIZES } from '../constantes/constantes';
import ExerciseItem from '../components/ExerciseItem';

const DayCard = ({ day, onAddExercise, onRemoveExercise, userId }) => (
  <View style={styles.dayContainer}>
    <Text style={styles.dayTitle}>{day.dayName}</Text>
    {day.exercises.map(exercise => (
      <ExerciseItem 
        key={exercise.exerciseId}
        exercise={exercise}
        dayId={day.dayId}
        userId={userId}
        onRemove={onRemoveExercise}
      />
    ))}
    <TouchableOpacity 
      style={styles.addButton} 
      onPress={onAddExercise}
    >
      <Text style={styles.addButtonText}>{ADMIN_ROUTINE_TEXT.ADD_EXERCISE}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  dayContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  dayTitle: {
    fontSize: SIZES.SUBTITLE,
    fontWeight: 'bold',
    color: COLORS.TEXT_SECONDARY,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: COLORS.BUTTON_ADD,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: COLORS.TEXT_PRIMARY,
    fontWeight: 'bold',
  },
});

export default DayCard;
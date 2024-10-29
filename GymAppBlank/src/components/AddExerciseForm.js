import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomButton from './CustomButton';
import { COLORS, SIZES, WORKOUT_TEXT } from '../constants';

const AddExerciseForm = ({
  exercises,
  selectedExercise,
  setSelectedExercise,
  series,
  setSeries,
  repetitions,
  setRepetitions,
  weight,
  setWeight,
  waitTime,
  setWaitTime,
  onSubmit,
}) => (
  <View style={styles.container}>
    <Picker
      selectedValue={selectedExercise}
      onValueChange={(itemValue) => setSelectedExercise(itemValue)}
      style={styles.picker}
    >
      <Picker.Item label="Seleccione un ejercicio" value="" />
      {exercises.map((exercise) => (
        <Picker.Item key={exercise.id} label={exercise.name} value={exercise.id} />
      ))}
    </Picker>
    <TextInput
      style={styles.input}
      placeholder="Series"
      value={series}
      onChangeText={setSeries}
      keyboardType="numeric"
    />
    <TextInput
      style={styles.input}
      placeholder="Repeticiones"
      value={repetitions}
      onChangeText={setRepetitions}
      keyboardType="numeric"
    />
    <TextInput
      style={styles.input}
      placeholder="Peso (kg)"
      value={weight}
      onChangeText={setWeight}
      keyboardType="numeric"
    />
    <TextInput
      style={styles.input}
      placeholder="Tiempo de espera (segundos)"
      value={waitTime}
      onChangeText={setWaitTime}
      keyboardType="numeric"
    />
    <CustomButton
      title={WORKOUT_TEXT.ADD_EXERCISE}
      onPress={onSubmit}
      style={styles.addButton}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  picker: {
    backgroundColor: COLORS.INPUT_BACKGROUND,
    marginBottom: 10,
  },
  input: {
    backgroundColor: COLORS.INPUT_BACKGROUND,
    color: COLORS.TEXT,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButton: {
    marginTop: 10,
  },
});

export default AddExerciseForm;
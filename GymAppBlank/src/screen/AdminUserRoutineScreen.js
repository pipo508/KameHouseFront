import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Modal, TextInput, SafeAreaView, ScrollView, Keyboard } from 'react-native';
import { getUserRoutine, addExerciseToRoutineDay, removeExerciseFromRoutineDay, getExercisesByMuscleGroup } from '../services/api';
import SearchablePicker from '../components/SearchablePicker';

const muscleGroups = ["Pecho", "Espalda", "Piernas", "Hombros", "Bíceps", "Tríceps", "Abdomen", "Antebrazo"];

const AdminUserRoutineScreen = ({ route }) => {
  const { userId } = route.params;
  const [routine, setRoutine] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null);
  const [series, setSeries] = useState('');
  const [repetitions, setRepetitions] = useState('');
  const [weight, setWeight] = useState('');
  const [waitTime, setWaitTime] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false); // Para detectar si el teclado está visible

  useEffect(() => {
    loadRoutine();

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true); // El teclado está visible
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false); // El teclado está oculto
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const loadRoutine = async () => {
    try {
      const routineData = await getUserRoutine(userId);
      setRoutine(routineData);
    } catch (error) {
      console.error("Error al cargar la rutina:", error);
      Alert.alert("Error", "No se pudo cargar la rutina del usuario");
    }
  };

  const loadExercisesByMuscleGroup = async (muscleGroup) => {
    try {
      console.log(`Cargando ejercicios para el grupo muscular: ${muscleGroup}`);
      const exercisesData = await getExercisesByMuscleGroup(muscleGroup);
      console.log('Ejercicios cargados:', exercisesData);
      if (exercisesData.length === 0) {
        console.log(`No se encontraron ejercicios para el grupo muscular: ${muscleGroup}`);
        Alert.alert("Información", `No hay ejercicios disponibles para ${muscleGroup}`);
      }
      setExercises(exercisesData.map(e => ({ label: e.name, value: e.id })));
    } catch (error) {
      console.error("Error al cargar ejercicios:", error);
      console.error("Detalles del error:", error.response?.data);
      Alert.alert("Error", "No se pudieron cargar los ejercicios: " + error.message);
    }
  };

  const handleAddExercise = async () => {
    if (!selectedExercise || !series || !repetitions) {
      Alert.alert("Error", "Por favor, selecciona un ejercicio y completa series y repeticiones.");
      return;
    }
    try {
      await addExerciseToRoutineDay(userId, selectedDay.dayId, selectedExercise.value, {
        series: parseInt(series),
        repetitions: parseInt(repetitions),
        weight,
        waitTime
      });
      setModalVisible(false);
      loadRoutine();
      resetForm();
    } catch (error) {
      console.error("Error al añadir ejercicio:", error);
      Alert.alert("Error", "No se pudo añadir el ejercicio");
    }
  };

  const resetForm = () => {
    setSeries('');
    setRepetitions('');
    setWeight('');
    setWaitTime('');
    // No reseteamos selectedMuscleGroup ni selectedExercise aquí
  };

  const handleRemoveExercise = async (dayId, exerciseId) => {
    try {
      await removeExerciseFromRoutineDay(userId, dayId, exerciseId);
      loadRoutine();
    } catch (error) {
      console.error("Error al eliminar ejercicio:", error);
      Alert.alert("Error", "No se pudo eliminar el ejercicio");
    }
  };

  const renderExercise = (exercise, dayId) => (
    <View key={exercise.exerciseId} style={styles.exerciseItem}>
      <Text style={styles.exerciseName}>{exercise.exerciseName}</Text>
      <Text>Series: {exercise.series}</Text>
      <Text>Repeticiones: {exercise.repetitions}</Text>
      <Text>Peso: {exercise.weight}</Text>
      <Text>Descanso: {exercise.waitTime}</Text>
      <TouchableOpacity 
        style={styles.removeButton} 
        onPress={() => handleRemoveExercise(dayId, exercise.exerciseId)}
      >
        <Text style={styles.removeButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDay = ({ item: day }) => (
    <View style={styles.dayContainer}>
      <Text style={styles.dayTitle}>{day.dayName}</Text>
      {day.exercises.map(exercise => renderExercise(exercise, day.dayId))}
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => {
          setSelectedDay(day);
          setModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>Añadir Ejercicio</Text>
      </TouchableOpacity>
    </View>
  );

  if (!routine) {
    return <View style={styles.container}><Text>Cargando...</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Rutina del Usuario</Text>
      <FlatList
        data={routine.routineDays}
        renderItem={renderDay}
        keyExtractor={(item) => item.dayId.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, keyboardVisible ? styles.modalViewWithKeyboard : {}]}>
            <ScrollView>
              <Text style={styles.modalTitle}>Añadir Ejercicio</Text>
              <SearchablePicker
                items={muscleGroups.map(group => ({ label: group, value: group }))}
                onSelect={(item) => {
                  console.log(`Grupo muscular seleccionado: ${item.value}`);
                  setSelectedMuscleGroup(item);
                  loadExercisesByMuscleGroup(item.value);
                }}
                placeholder="Selecciona un grupo muscular"
                selectedItem={selectedMuscleGroup}
              />
              {selectedMuscleGroup && (
                <SearchablePicker
                  items={exercises}
                  onSelect={(item) => {
                    console.log(`Ejercicio seleccionado: ${item.label}`);
                    setSelectedExercise(item);
                  }}
                  placeholder="Selecciona un ejercicio"
                  selectedItem={selectedExercise}
                />
              )}
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
                placeholder="Peso (opcional)"
                value={weight}
                onChangeText={setWeight}
                keyboardType='numeric'
              />
              <TextInput
                style={styles.input}
                placeholder="Tiempo de espera (opcional)"
                value={waitTime}
                onChangeText={setWaitTime}
                keyboardType='numeric'
              />
              <TouchableOpacity style={styles.button} onPress={handleAddExercise}>
                <Text style={styles.buttonText}>Añadir</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => {
                setModalVisible(false);
                resetForm();
              }}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginLeft: 10,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  dayContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  exerciseItem: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    marginTop: 5,
    backgroundColor: '#d9534f',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#5cb85c',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalViewWithKeyboard: {
    marginBottom: 100, // Ajusta la distancia del modal cuando el teclado está visible
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#d9534f',
  },
});

export default AdminUserRoutineScreen;

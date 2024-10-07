import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, Text, StyleSheet, Platform, ActivityIndicator, TouchableOpacity, Modal, TextInput, Alert , Keyboard} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Header from '../components/Header';
import { AuthContext } from '../context/AuthContext';
import { fetchUserRoutine, fetchExercises, addExerciseToRoutineDay, removeExerciseFromRoutineDay, removeAllExercisesFromRoutineDay, removeAllExercisesFromAllRoutineDays } from '../services/api';

const muscleColors = {
  "Pecho": "#66CCCC",
  "Hombros": "#33CC33",
  "Espalda": "#FFA07A",
  "Piernas": "#FF69B4",
  "Bíceps": "#FFFF00",
  "Tríceps": "#FF6347",
  "Antebrazo": "#DDA0DD",
  "Abdomen": "#C71585"
};



const WorkoutRoutineScreen = () => {
  const [routineData, setRoutineData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [series, setSeries] = useState('');
  const [repetitions, setRepetitions] = useState('');
  const [weight, setWeight] = useState('');
  const [waitTime, setWaitTime] = useState('');
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    loadRoutine();
    loadExercises();
  }, [userId]);



  const loadRoutine = async () => {
    if (!userId) {
      setError("No se ha encontrado un usuario logueado.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await fetchUserRoutine(userId);
      if (data && data.routineDays) {
        setRoutineData(data);
      } else {
        setError("No se encontró una rutina para este usuario.");
      }
    } catch (error) {
      console.error("Failed to load routine:", error);
      setError(`Error al cargar la rutina: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadExercises = async () => {
    try {
      const data = await fetchExercises();
      console.log("Ejercicios cargados:", data);
      setExercises(data);
    } catch (error) {
      console.error("Error al cargar ejercicios:", error);
      Alert.alert("Error", "No se pudieron cargar los ejercicios");
    }
  };

  const getMuscleColor = (muscleGroup) => {
    return muscleColors[muscleGroup] || '#fff';
  };

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleAddExercise = (day) => {
    setSelectedDay(day);
    setModalVisible(true);
  };

  const handleRemoveExercise = async (day, exerciseRoutineDayId) => {
    if (!exerciseRoutineDayId) {
      Alert.alert("Error", "ID de ejercicio no válido");
      return;
    }
    try {
      await removeExerciseFromRoutineDay(userId, day.dayId, exerciseRoutineDayId);
      loadRoutine();
    } catch (error) {
      console.error("Error al eliminar ejercicio:", error);
      Alert.alert("Error", "No se pudo eliminar el ejercicio. Intente nuevamente.");
    }
  };

  const handleRemoveAllExercisesFromDay = async (dayId) => {
    try {
      await removeAllExercisesFromRoutineDay(userId, dayId);
      loadRoutine();
    } catch (error) {
      console.error("Failed to remove all exercises from day:", error);
    }
  };

  const handleRemoveAllExercises = async () => {
    try {
      await removeAllExercisesFromAllRoutineDays(userId);
      loadRoutine();
    } catch (error) {
      console.error("Failed to remove all exercises:", error);
    }
  };

  const handleSubmitExercise = async () => {
    if (!selectedExercise || !series || !repetitions || !weight || !waitTime) {
      Alert.alert("Error", "Por favor, complete todos los campos");
      return;
    }
  
    try {
      await addExerciseToRoutineDay(userId, selectedDay.dayId, selectedExercise, {
        series: parseInt(series),
        repetitions: parseInt(repetitions),
        weight,
        waitTime
      });
      setModalVisible(false);
      loadRoutine();
      // Limpiar el formulario
      setSelectedExercise(null);
      setSeries('');
      setRepetitions('');
      setWeight('');
      setWaitTime('');
    } catch (error) {
      console.error("Error al agregar ejercicio:", error);
      Alert.alert("Error", "No se pudo agregar el ejercicio. Intente nuevamente.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFD700" />
          <Text style={styles.loadingText}>Cargando rutina...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.errorDetails}>Por favor, intenta de nuevo más tarde o contacta al soporte.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>{routineData ? routineData.routineName : 'Tu Rutina de Entrenamiento'}</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditMode}>
          <Text style={styles.editButtonText}>{editMode ? 'Terminar edición' : 'Editar rutina'}</Text>
        </TouchableOpacity>
        {editMode && (
          <TouchableOpacity style={styles.removeAllButton} onPress={handleRemoveAllExercises}>
            <Text style={styles.removeAllButtonText}>Borrar todos los ejercicios</Text>
          </TouchableOpacity>
        )}
        {routineData && routineData.routineDays && routineData.routineDays.length > 0 ? (
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {routineData.routineDays.map((day, index) => (
              <View key={day.dayId} style={styles.daySection}>
                <Text style={styles.dayTitle}>{day.dayName}</Text>
                {editMode && (
                  <View style={styles.editButtons}>
                    <TouchableOpacity style={styles.addButton} onPress={() => handleAddExercise(day)}>
                      <Text style={styles.addButtonText}>Agregar ejercicio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.removeAllDayButton} onPress={() => handleRemoveAllExercisesFromDay(day.dayId)}>
                      <Text style={styles.removeAllDayButtonText}>Borrar todos los ejercicios del día</Text>
                    </TouchableOpacity>
                  </View>
                )}
                <View style={styles.tableHeader}>
                  <Text style={[styles.headerItem, styles.headerItemFirst]}>Ejercicio</Text>
                  <Text style={styles.headerItem}>Series</Text>
                  <Text style={styles.headerItem}>Repeticiones</Text>
                  <Text style={styles.headerItem}>Peso</Text>
                  <Text style={styles.headerItem}>Tiempo de espera</Text>
                  {editMode && <Text style={styles.headerItem}>Acciones</Text>}
                </View>
                {day.exercises && day.exercises.length > 0 ? (
                  day.exercises.map((exercise, exerciseIndex) => (
                    <View key={exerciseIndex} style={[styles.tableRow, { backgroundColor: getMuscleColor(exercise.muscleGroup) }]}>
                      <Text style={styles.rowItem}>{exercise.exerciseName}</Text>
                      <Text style={styles.rowItem}>{exercise.series}</Text>
                      <Text style={styles.rowItem}>{exercise.repetitions}</Text>
                      <Text style={styles.rowItem}>{exercise.weight}</Text>
                      <Text style={styles.rowItem}>{exercise.waitTime}</Text>
                      {editMode && (
                        <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveExercise(day, exercise.id)}>
                          <Text style={styles.removeButtonText}>Borrar</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  ))
                ) : (
                  <Text style={styles.noExercisesText}>No hay ejercicios para este día.</Text>
                )}
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noRoutineText}>No se encontró una rutina para mostrar.</Text>
        )}
      </View>
      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <Text style={styles.modalTitle}>Agregar Ejercicio</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedExercise}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedExercise(itemValue)}
        >
          <Picker.Item label="Seleccione un ejercicio" value={null} />
          {exercises.map((exercise) => (
            <Picker.Item key={exercise.id} label={exercise.name} value={exercise.id} />
          ))}
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={setSeries}
        value={series}
        placeholder="Series"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={setRepetitions}
        value={repetitions}
        placeholder="Repeticiones"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={setWeight}
        value={weight}
        placeholder="Peso"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={setWaitTime}
        value={waitTime}
        placeholder="Tiempo de espera"
        keyboardType="numeric"
        
      />
      <View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.submitButton} onPress={handleSubmitExercise}>
    <Text style={styles.submitButtonText}>Agregar</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
    <Text style={styles.cancelButtonText}>Cancelar</Text>
  </TouchableOpacity>
</View>

    </View>
  </View>
</Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  contentWrapper: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFD700',
    fontSize: 16,
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FF0000',
    fontSize: 18,
    textAlign: 'center',
  },
  errorDetails: {
    color: '#FF6347',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: Platform.OS === 'web' ? 32 : 28,
    color: '#FFD700',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  daySection: {
    marginBottom: 20,
  },
  dayTitle: {
    fontSize: Platform.OS === 'web' ? 24 : 20,
    color: '#FFD700',
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Montserrat-SemiBold',
  },
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
  noRoutineText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  noExercisesText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  editButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  removeAllButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  removeAllButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  removeAllDayButton: {
    backgroundColor: '#FF9800',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  removeAllDayButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
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
  centeredView: {
    position: 'absolute',
    top: 1, // Ajusta esta valor según sea necesario
    left: 0,
    right: 0,
    bottom: 300,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
},
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    marginBottom: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold"
  },
  pickerContainer: {
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 200,
    width: '100%',
    height: 10,
  },
  picker: {
    height: 10,
    width: '100%',
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    borderColor: '#ddd',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 5,
    flex: 1,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    borderRadius: 5,
    marginLeft: 10,
    flex: 1,
  },
  submitButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default WorkoutRoutineScreen;
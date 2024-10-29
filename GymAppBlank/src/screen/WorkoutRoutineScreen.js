import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { AuthContext } from '../context/AuthContext';
import { fetchUserRoutine, fetchExercises, addExerciseToRoutineDay, removeExerciseFromRoutineDay, removeAllExercisesFromRoutineDay, removeAllExercisesFromAllRoutineDays } from '../services/api';
import AddExerciseModal from '../components/AddExerciseModal';
import { COLORS, SIZES, WORKOUT_TEXT, MUSCLE_COLORS } from '../constantes/constantes';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import DaySection from '../components/DaySection';
import EditButtons from '../components/EditButtons';

const WorkoutRoutineScreen = () => {
  const navigation = useNavigation();
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

  const showNoRoutineAlert = () => {
    Alert.alert(
      "Sin Rutinas",
      "Sus rutinas todavía no han sido cargadas por el profesor",
      [
        {
          text: "Aceptar",
          onPress: () => navigation.navigate('Home')
        }
      ]
    );
  };

  const loadRoutine = async () => {
    if (!userId) {
      setError(WORKOUT_TEXT.NO_USER);
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
        setError(WORKOUT_TEXT.NO_ROUTINE);
        showNoRoutineAlert();
      }
    } catch (error) {
      console.error("Failed to load routine:", error);
      setError(`${WORKOUT_TEXT.ERROR} ${error.message}`);
      showNoRoutineAlert();
    } finally {
      setLoading(false);
    }
  };

  const loadExercises = async () => {
    try {
      const data = await fetchExercises();
      setExercises(data);
    } catch (error) {
      console.error("Error al cargar ejercicios:", error);
      Alert.alert("Error", "No se pudieron cargar los ejercicios");
    }
  };

  const getMuscleColor = (muscleGroup) => {
    return MUSCLE_COLORS[muscleGroup] || COLORS.TEXT;
  };

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleAddExercise = (day) => {
    setSelectedDay(day);
    setModalVisible(true);
  };

  const handleRemoveExercise = async (day, exercise) => {
    if (!exercise.exerciseId) {
      Alert.alert("Error", "ID del ejercicio no válido");
      return;
    }
    try {
      await removeExerciseFromRoutineDay(userId, day.dayId, exercise.exerciseId);
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

  if (loading) return <LoadingView />;
  if (error) return <ErrorView error={error} onRetry={loadRoutine} />;

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>{routineData ? routineData.routineName : WORKOUT_TEXT.TITLE}</Text>
        <EditButtons 
          editMode={editMode} 
          onEditMode={handleEditMode} 
          onRemoveAllExercises={handleRemoveAllExercises} 
        />
        {routineData && routineData.routineDays && routineData.routineDays.length > 0 ? (
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {routineData.routineDays.map((day) => (
              <DaySection 
                key={day.dayId}
                day={day}
                editMode={editMode}
                onAddExercise={handleAddExercise}
                onRemoveAllExercisesFromDay={handleRemoveAllExercisesFromDay}
                onRemoveExercise={handleRemoveExercise}
                getMuscleColor={getMuscleColor}
              />
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noRoutineText}>{WORKOUT_TEXT.NO_ROUTINE_FOUND}</Text>
        )}
      </View>
      <AddExerciseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        exercises={exercises}
        selectedExercise={selectedExercise}
        setSelectedExercise={setSelectedExercise}
        series={series}
        setSeries={setSeries}
        repetitions={repetitions}
        setRepetitions={setRepetitions}
        weight={weight}
        setWeight={setWeight}
        waitTime={waitTime}
        setWaitTime={setWaitTime}
        onSubmit={handleSubmitExercise}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  contentWrapper: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: SIZES.TITLE,
    color: COLORS.PRIMARY,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  noRoutineText: {
    color: COLORS.TEXT,
    fontSize: SIZES.BODY,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default WorkoutRoutineScreen;
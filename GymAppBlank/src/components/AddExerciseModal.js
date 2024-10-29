import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Modal,
  ScrollView,
  Dimensions 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const { height } = Dimensions.get('window');

const AddExerciseModal = ({ 
  visible, 
  onClose, 
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
  onSubmit 
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            bounces={false}
          >
            <Text style={styles.modalTitle}>Agregar Ejercicio</Text>
            <View style={styles.contentContainer}>
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
                <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
                  <Text style={styles.submitButtonText}>Agregar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
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
  scrollContent: {
    minHeight: height * 0.7, // Asegura un espacio mínimo para el scroll
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold"
  },
  pickerContainer: {
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
  },
  picker: {
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
    marginTop: 15,
    paddingBottom: 500, // Agrega espacio extra al final
  },
  submitButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#f44444',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
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

export default AddExerciseModal;
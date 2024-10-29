import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const EditableField = ({ label, value, isEditing, onChangeText }) => {
  const displayValue = value !== null && value !== undefined ? value.toString() : '';

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}:</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={displayValue}
          onChangeText={onChangeText}
        />
      ) : (
        <Text style={styles.fieldValue}>{displayValue}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  fieldValue: {
    fontSize: 16,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});

export default EditableField;
import React, { useState, useEffect } from 'react';
import { View, Text, Modal, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener instalado expo/vector-icons

const SearchablePicker = ({ items, onSelect, placeholder }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    setFilteredItems(
      items.filter(item =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, items]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        onSelect(item);
        setModalVisible(false);
      }}
    >
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text>{placeholder}</Text>
        <Ionicons name="chevron-down" size={24} color="black" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar..."
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            <FlatList
              data={filteredItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.value.toString()}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0,0.8)', // Fondo oscuro semi-transparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    maxHeight: '70%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    width: '100%',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SearchablePicker;
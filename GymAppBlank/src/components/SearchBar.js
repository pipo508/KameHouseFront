import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchBar = ({ value, onChangeText }) => (
  <View style={styles.searchContainer}>
    <Feather name="search" size={20} color="#888" style={styles.searchIcon} />
    <TextInput
      style={styles.searchInput}
      placeholder="Buscar por nombre..."
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor="#888"
    />
  </View>
);

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
});

export default SearchBar;
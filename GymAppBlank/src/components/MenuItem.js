import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const MenuItem = ({ label, onPress, style }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={[styles.menuItem, style]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menuItem: {
    fontSize: 18,
    marginVertical: 10,
    color: '#FFD700',
    fontWeight: 'bold',
  },
});

export default MenuItem;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function FeatureCard({ icon, title, description }) {
  return (
    <View style={styles.card}>
      <FontAwesome6 name={icon} type="font-awesome" color="#FFD700" size={30} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    color: '#FFD700',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
});

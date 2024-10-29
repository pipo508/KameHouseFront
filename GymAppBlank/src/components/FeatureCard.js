import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constantes/constantes';

export default function FeatureCard({ icon, title, description }) {
  return (
    <View style={styles.card}>
      <MaterialCommunityIcons name={icon} color={COLORS.PRIMARY} size={SIZES.ICON} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.BACKGROUND,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: SIZES.SUBTITLE,
    color: COLORS.PRIMARY,
    marginVertical: 10,
  },
  description: {
    fontSize: SIZES.BODY,
    color: COLORS.TEXT,
    textAlign: 'center',
  },
});
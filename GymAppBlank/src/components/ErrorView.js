import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { COLORS, SIZES } from '../constantes/constantes';

const ErrorView = ({ error }) => (
  <View style={styles.container}>
    <Header />
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{error}</Text>
      <Text style={styles.errorDetails}>Por favor, intenta de nuevo más tarde o contacta al soporte.</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: COLORS.ERROR,
    fontSize: SIZES.SUBTITLE,
    textAlign: 'center',
  },
  errorDetails: {
    color: COLORS.ERROR_LIGHT,
    fontSize: SIZES.BODY,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ErrorView;
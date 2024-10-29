import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Header from '../components/Header';
import { COLORS, SIZES, WORKOUT_TEXT } from '../constantes/constantes';

const LoadingView = () => (
  <View style={styles.container}>
    <Header />
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      <Text style={styles.loadingText}>{WORKOUT_TEXT.LOADING}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: COLORS.PRIMARY,
    fontSize: SIZES.BODY,
    marginTop: 10,
  },
});

export default LoadingView;
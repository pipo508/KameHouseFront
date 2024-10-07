import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import kame from '../../assets/kame.jpg';

export default function Header() {
  return (
    <View style={styles.header}>
      <Image
                        source={kame}
                        style={styles.logo}
                    />
      <Text style={styles.title}>KameGym</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    backgroundColor: '#000',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 50,
  },
  title: {
    fontSize: 28,
    color: '#FFD700', // amarillo casi dorado
  },
});

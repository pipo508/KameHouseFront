import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { IMAGES, APP_TEXT, COLORS, SIZES } from '../constantes/constantes';

export default function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={IMAGES.LOGO}
        style={styles.logo}
      />
      <Text style={styles.title}>{APP_TEXT.APP_TITLE}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    backgroundColor: COLORS.BACKGROUND,
    marginBottom: 20,
  },
  logo: {
    width: SIZES.LOGO,
    height: SIZES.LOGO,
    marginRight: 10,
    borderRadius: SIZES.LOGO / 2,
  },
  title: {
    fontSize: SIZES.TITLE,
    color: COLORS.PRIMARY,
  },
});
import React from 'react';
import { Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { IMAGES } from '../constantes/constantes';

export default function GymImageSlider() {
  return (
    <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
    >
        {IMAGES.SLIDER.map((image, index) => (
        <Image key={index} source={image} style={styles.image} />
    ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    scrollView: {
        height: Dimensions.get('window').height / 3,
    },
    image: {
        width: Dimensions.get('window').width,
        height: '100%',
    },
});
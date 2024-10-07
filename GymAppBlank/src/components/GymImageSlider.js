import React from 'react';
import { Image, StyleSheet, ScrollView, Dimensions } from 'react-native';


const images = [
    require('../../assets/kame.jpg'), // Reemplaza con tus imágenes
    require('../../assets/horarios.jpg'),
    require('../../assets/remeras.jpg'),
    require('../../assets/casallena.jpg'),
];

export default function GymImageSlider() {
  return (
    <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
    >
        {images.map((image, index) => (
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

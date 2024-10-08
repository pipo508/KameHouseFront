import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Dimensions, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SidebarMenu from '../components/SidebarMenu';
import RegisterForm from '../components/RegisterForm';

export default function RegisterScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-Dimensions.get('window').width)).current;

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: -Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <ImageBackground source={require('../../assets/gym.jpg')} style={styles.background}>
      <View style={styles.overlay}>
        {!menuVisible && (
          <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
            <Text style={styles.menuButtonText}>☰</Text>
          </TouchableOpacity>
        )}

        <StatusBar style="light" />

        {menuVisible && (
          <SidebarMenu slideAnim={slideAnim} toggleMenu={toggleMenu} navigation={navigation} />
        )}

        {!menuVisible && <RegisterForm />}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Oscurece ligeramente la imagen de fondo
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  menuButton: {
    position: 'absolute',
    top: 70,
    left: 20,
    zIndex: 1,
  },
  menuButtonText: {
    fontSize: 30,
    color: '#FFD700',
    fontWeight: 'bold',
  },
});

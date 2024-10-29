import React, { useState, useRef } from 'react';
import { StyleSheet, View, Animated, Dimensions, ImageBackground, StatusBar } from 'react-native';
import { BlurView } from 'expo-blur';
import SidebarMenu from '../components/SidebarMenu';
import LoginForm from '../components/LoginForm';
import MenuButton from '../components/MenuButton';
import { IMAGES } from '../constantes/constantes';

export default function LoginScreen({ navigation }) {
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
    <ImageBackground source={IMAGES.BACKGROUND} style={styles.background}>
      <StatusBar barStyle="light-content" />
      <BlurView intensity={100} style={StyleSheet.absoluteFill} tint="dark">
        <View style={styles.container}>
          {!menuVisible && (
            <MenuButton onPress={toggleMenu} />
          )}

          {menuVisible && (
            <SidebarMenu 
              slideAnim={slideAnim} 
              toggleMenu={toggleMenu} 
              navigation={navigation} 
            />
          )}

          {!menuVisible && <LoginForm />}
        </View>
      </BlurView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
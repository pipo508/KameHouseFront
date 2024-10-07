import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SidebarMenu from '../components/SidebarMenu';
import Header from '../components/Header';
import GymImageSlider from '../components/GymImageSlider';
import FeatureCard from '../components/FeatureCard';

export default function HomeScreen({ navigation }) {
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
        <View style={styles.container}>
            {!menuVisible && (
                <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
                    <Text style={styles.menuButtonText}>☰</Text>
                </TouchableOpacity>
            )}

            <StatusBar style="auto" />

            {menuVisible && (
                <SidebarMenu slideAnim={slideAnim} toggleMenu={toggleMenu} navigation={navigation} />
            )}

            {!menuVisible && (
                <ScrollView contentContainerStyle={styles.content}>
                    <Header />
                    <GymImageSlider />
                    <FeatureCard icon="dumbbell" title="Entrenamiento Personal" description="Entrenadores expertos para ayudarte a alcanzar tus metas." />
                    <FeatureCard icon="heart-pulse" title="Salud y Bienestar" description="Programas diseñados para mejorar tu salud integral." />
                    <FeatureCard icon="spa" title="Zona de Relajación" description="Desconecta y recarga energías en nuestras áreas de relajación." />
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // Fondo negro
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    menuButton: {
        position: 'absolute',
        top: 70,
        left: 30,
        zIndex: 1,
    },
    menuButtonText: {
        fontSize: 30,
        color: '#FFD700', // Color dorado
    },
    content: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: '#000', // Fondo negro
    },
});

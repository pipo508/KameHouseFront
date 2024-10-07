
import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Image } from 'react-native';
import { AuthContext } from '../context/AuthContext'; // Asegúrate de que esta importación sea correcta
import kame from '../../assets/kame.jpg';

export default function SidebarMenu({ slideAnim, toggleMenu, navigation }) {
    const { role , logout} = useContext(AuthContext); // Obtén el rol y la función logout del contexto


    return (
        <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
                    <Text style={styles.closeButtonText}>✖</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.logoContainer} 
                    onPress={() => {
                        toggleMenu();  
                        navigation.navigate('Home');  
                    }}
                >
                    <Image source={kame} style={styles.logo} />
                    <View>
                        <Text style={styles.logoText}>KameHouse</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.menuItemsContainer}>
                <Text 
                    style={styles.menuItem} 
                    onPress={() => {
                        toggleMenu();  
                        navigation.navigate('Login');  
                    }}
                >
                    Login
                </Text>
                <Text 
                    style={styles.menuItem} 
                    onPress={() => {
                        toggleMenu();  
                        navigation.navigate('Home');  
                    }}
                >
                    Home
                </Text>
                <Text 
                    style={styles.menuItem} 
                    onPress={() => {
                        toggleMenu();  
                        navigation.navigate('Register');  
                    }}
                >
                    Registro
                </Text>
                {/* Opciones adicionales basadas en el rol */}
                {role === 0 && ( // Cambia la comparación a un número
                    <>
                        <Text 
                            style={styles.menuItem} 
                            onPress={() => {
                                toggleMenu();  
                                navigation.navigate('AdminDashboard');  
                            }}
                        >
                            Dashboard Admin
                        </Text>
                        <Text 
                            style={styles.menuItem} 
                            onPress={() => {
                                toggleMenu();  
                                navigation.navigate('AdminReports');  
                            }}
                        >
                            Reportes
                        </Text>
                        <Text 
                            style={[styles.menuItem, styles.logout]} 
                            onPress={() => {
                                logout();
                                toggleMenu();  
                                navigation.navigate('Login');  
                            }}
                        >
                            Salir
                        </Text>
                        
                    </>
                        
                )}
                {role === 1 && ( // Cambia la comparación a un número
                    <>
                        <Text 
                            style={styles.menuItem} 
                            onPress={() => {
                                toggleMenu();  
                                navigation.navigate('UserProfile');  
                            }}
                        >
                            Perfil de Usuario
                        </Text>
                        <Text 
                            style={styles.menuItem} 
                            onPress={() => {
                                toggleMenu();  
                                navigation.navigate('Rutinas');  
                            }}
                        >
                            Rutina de Ejercicios
                        </Text>
                        <Text 
                            style={[styles.menuItem, styles.logout]} 
                            onPress={() => {
                                logout();
                                toggleMenu();  
                                navigation.navigate('Login');  
                            }}
                        >
                            Salir
                        </Text>
                    </>
                )}
            </View>
        </Animated.View>
    );
}
const styles = StyleSheet.create({
    menuContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 250,
        height: '100%',
        backgroundColor: '#000',
        zIndex: 2,
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderColor: '#FFD700',
        borderWidth: 1,
        shadowColor: '#FFD700',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 20,
    },
    closeButton: {
        marginRight: 10,
    },
    closeButtonText: {
        fontSize: 24,
        color: '#FFD700',
        fontWeight: 'bold',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    logoText: {
        fontSize: 20,
        color: '#FFD700',
        fontWeight: 'bold',
    },
    menuItemsContainer: {
        marginTop: 10,
    },
    menuItem: {
        fontSize: 18,
        marginVertical: 10,
        color: '#FFD700',
        fontWeight: 'bold',
    },
    logout: {
        marginTop: 40,
        color: '#FF6347',
    },
});

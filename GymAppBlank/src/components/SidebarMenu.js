import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import MenuItem from './MenuItem';
import kame from '../../assets/kame.jpg';
import { Feather } from '@expo/vector-icons';

export default function SidebarMenu({ slideAnim, toggleMenu, navigation }) {
    const { role, logout } = useContext(AuthContext);

    const navigateAndClose = (screenName) => {
        toggleMenu();
        navigation.navigate(screenName);
    };

    return (
        <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
                    <Feather name="x" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.logoContainer} 
                    onPress={() => navigateAndClose('Home')}
                >
                    <Image source={kame} style={styles.logo} />
                    <View>
                        <Text style={styles.logoText}>KameHouse</Text>
                        <Text style={styles.logoSubtext}>Fitness Center</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.menuItemsContainer}>
                <MenuItem 
                    icon="home" 
                    label="Home" 
                    onPress={() => navigateAndClose('Home')} 
                />
                <MenuItem 
                    icon="user" 
                    label="Login" 
                    onPress={() => navigateAndClose('Login')} 
                />
                <MenuItem 
                    icon="user-plus" 
                    label="Registro" 
                    onPress={() => navigateAndClose('Register')} 
                />
                
                {role === 0 && (
                    <>
                        <MenuItem 
                            icon="shield" 
                            label="Lista De Usuarios" 
                            onPress={() => navigateAndClose('ListaUsuarios')} 
                        />

                    </>
                )}
                
                {role === 1 && (
                    <>
                        <MenuItem 
                            icon="user" 
                            label="Perfil de Usuario" 
                            onPress={() => navigateAndClose('UserProfile')} 
                        />
                        <MenuItem 
                            icon="activity" 
                            label="Rutina de Ejercicios" 
                            onPress={() => navigateAndClose('Rutinas')} 
                        />
                    </>
                )}

                {(role === 0 || role === 1) && (
                    <MenuItem 
                        icon="log-out" 
                        label="Cerrar Sesión" 
                        onPress={() => {
                            logout();
                            navigateAndClose('Login');
                        }} 
                        style={styles.logout}
                    />
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
        width: 280,
        height: '100%',
        backgroundColor: '#000',
        zIndex: 2,
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 40,
    },
    closeButton: {
        marginRight: 15,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    logoText: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
    },
    logoSubtext: {
        fontSize: 14,
        color: '#FFD700',
        fontWeight: '500',
    },
    menuItemsContainer: {
        marginTop: 20,
    },
    logout: {
        marginTop: 40,
        //rojo de boton de cancelar
        color: '#FF0000',
        borderTopWidth: 1,
        borderTopColor: '#333',
        paddingTop: 10,
    },
});
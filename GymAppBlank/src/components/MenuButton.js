import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constantes/constantes';

const MenuButton = ({ onPress }) => (
    <TouchableOpacity 
        style={styles.menuButton} 
        onPress={onPress}
        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        activeOpacity={0.7}
    >
        <Ionicons 
            name="menu" 
            size={30} 
            color={COLORS.PRIMARY}
        />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    menuButton: {
        position: 'absolute',
        top: 60,
        left: 30,
        zIndex: 2,
        padding: 10,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default MenuButton;
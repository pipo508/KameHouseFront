import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AdminReportsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Admin - Reports</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    text: {
        fontSize: 24,
        color: '#FFD700',
    },
});


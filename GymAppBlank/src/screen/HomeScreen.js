import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import SidebarMenu from '../components/SidebarMenu';
import Header from '../components/Header';
import GymImageSlider from '../components/GymImageSlider';
import FeatureCard from '../components/FeatureCard';
import MenuButton from '../components/MenuButton';
import { COLORS, FEATURE_CARDS } from '../constantes/constantes';
import useSidebarMenu from '../hooks/useSidebarMenu';

export default function HomeScreen({ navigation }) {
    const { menuVisible, slideAnim, toggleMenu } = useSidebarMenu();

    return (
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

            {!menuVisible && (
                <ScrollView contentContainerStyle={styles.content}>
                    <Header />
                    <GymImageSlider />
                    {FEATURE_CARDS.map((card, index) => (
                        <FeatureCard 
                            key={index} 
                            icon={card.icon} 
                            title={card.title} 
                            description={card.description} 
                        />
                    ))}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    content: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: COLORS.BACKGROUND,
    }
});
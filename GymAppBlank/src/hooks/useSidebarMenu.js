import { useState, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

const useSidebarMenu = () => {
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

    return { menuVisible, slideAnim, toggleMenu };
};

export default useSidebarMenu;
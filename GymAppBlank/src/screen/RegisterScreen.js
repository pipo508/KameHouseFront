import React, { useState, useContext, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground, KeyboardAvoidingView, Platform, Alert, Animated, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import SidebarMenu from '../components/SidebarMenu';
import { ROUTES, REGISTER_TEXT, REGISTER_PLACEHOLDERS, REGISTER_ALERT, PLAN_TYPES, COLORS, SIZES, IMAGES } from '../constantes/constantes';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    address: '',
    phone: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    typePlan: PLAN_TYPES[0]
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-Dimensions.get('window').width)).current;

  const navigation = useNavigation();
  const { register } = useContext(AuthContext);

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

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRegister = async () => {

    if (formData.password !== formData.confirmPassword) {
      Alert.alert(REGISTER_ALERT.ERROR_TITLE, REGISTER_ALERT.PASSWORD_MISMATCH);
      return;
    }
    const userData = {
      name: formData.name,
      surname: formData.surname,
      address: formData.address,
      phone: formData.phone,
      age: formData.age,
      email: formData.email.toLowerCase(),
      password: formData.password,
      typePlan: formData.typePlan,
    };
  
    try {
      const response = await registerUser(userData);
      console.log('Respuesta del registro:', response);
  
      if (response && response.success) {
        Alert.alert(
          REGISTER_ALERT.SUCCESS_TITLE,
          REGISTER_ALERT.SUCCESS_MESSAGE,
          [
            {
              text: 'OK',
              onPress: () => {
                register(response);
                navigation.navigate(ROUTES.HOME);
              }
            }
          ]
        );
      } else {
        Alert.alert(REGISTER_ALERT.ERROR_TITLE, REGISTER_ALERT.REGISTRATION_FAILED);
      }
    } catch (error) {
      console.error('Error de registro:', error);
      Alert.alert(REGISTER_ALERT.ERROR_TITLE, REGISTER_ALERT.GENERAL_ERROR);
    }
  };

  return (
    <ImageBackground source={IMAGES.BACKGROUND} style={styles.background}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <StatusBar style="light" />
        {!menuVisible && (
          <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
            <Ionicons name="menu" size={SIZES.ICON} color={COLORS.PRIMARY} />
          </TouchableOpacity>
        )}
        {menuVisible && (
          <SidebarMenu slideAnim={slideAnim} toggleMenu={toggleMenu} navigation={navigation} />
        )}
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>{REGISTER_TEXT.TITLE}</Text>
          
          {[
            { field: 'name', icon: 'person-outline', placeholder: REGISTER_PLACEHOLDERS.NAME },
            { field: 'surname', icon: 'person-outline', placeholder: REGISTER_PLACEHOLDERS.SURNAME },
            { field: 'address', icon: 'home-outline', placeholder: REGISTER_PLACEHOLDERS.ADDRESS },
            { field: 'phone', icon: 'call-outline', placeholder: REGISTER_PLACEHOLDERS.PHONE, keyboardType: 'phone-pad' },
            { field: 'age', icon: 'calendar-outline', placeholder: REGISTER_PLACEHOLDERS.AGE, keyboardType: 'numeric' },
            { field: 'email', icon: 'mail-outline', placeholder: REGISTER_PLACEHOLDERS.EMAIL, keyboardType: 'email-address' },
          ].map((item, index) => (
            <View key={index} style={styles.inputContainer}>
              <Ionicons name={item.icon} size={SIZES.ICON} color={COLORS.PRIMARY} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder={item.placeholder}
                placeholderTextColor={COLORS.PLACEHOLDER}
                value={formData[item.field]}
                onChangeText={(text) => handleInputChange(item.field, text)}
                keyboardType={item.keyboardType || 'default'}
              />
            </View>
          ))}

          {['password', 'confirmPassword'].map((field, index) => (
            <View key={index} style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={SIZES.ICON} color={COLORS.PRIMARY} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder={field === 'password' ? REGISTER_PLACEHOLDERS.PASSWORD : REGISTER_PLACEHOLDERS.CONFIRM_PASSWORD}
                placeholderTextColor={COLORS.PLACEHOLDER}
                secureTextEntry={field === 'password' ? !showPassword : !showConfirmPassword}
                value={formData[field]}
                onChangeText={(text) => handleInputChange(field, text)}
              />
              <TouchableOpacity onPress={() => field === 'password' ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                <Ionicons name={field === 'password' ? (showPassword ? "eye-outline" : "eye-off-outline") : (showConfirmPassword ? "eye-outline" : "eye-off-outline")} size={SIZES.ICON} color={COLORS.PRIMARY} />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowOptions(!showOptions)}
          >
            <Text style={styles.dropdownText}>{formData.typePlan}</Text>
            <Ionicons name={showOptions ? "chevron-up-outline" : "chevron-down-outline"} size={SIZES.ICON} color={COLORS.PRIMARY} />
          </TouchableOpacity>
          
          {showOptions && (
            <View style={styles.optionsContainer}>
              {PLAN_TYPES.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.option}
                  onPress={() => {
                    handleInputChange('typePlan', option);
                    setShowOptions(false);
                  }}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>{REGISTER_TEXT.BUTTON}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
            <Text style={styles.loginLink}>{REGISTER_TEXT.LOGIN_LINK}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: SIZES.TITLE,
    color: COLORS.PRIMARY,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.INPUT_BACKGROUND,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: COLORS.TEXT,
    fontSize: SIZES.BODY,
  },
  eyeIcon: {
    padding: 10,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.INPUT_BACKGROUND,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  dropdownText: {
    color: COLORS.TEXT,
    fontSize: SIZES.BODY,
  },
  optionsContainer: {
    backgroundColor: COLORS.INPUT_BACKGROUND,
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  optionText: {
    color: COLORS.PRIMARY,
    fontSize: SIZES.BODY,
  },
  registerButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: COLORS.BUTTON_TEXT,
    fontSize: SIZES.SUBTITLE,
    fontWeight: 'bold',
  },
  loginLink: {
    color: COLORS.PRIMARY,
    textAlign: 'center',
    marginTop: 20,
  },
  menuButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
});
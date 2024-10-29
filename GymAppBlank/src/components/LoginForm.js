import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { loginUser } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ROUTES, APP_TEXT, FORM_PLACEHOLDERS, BUTTON_TEXT, ALERT_MESSAGES, COLORS, SIZES, IMAGES } from '../constantes/constantes';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(ALERT_MESSAGES.ERROR, ALERT_MESSAGES.ENTER_EMAIL_PASSWORD);
      return;
    }

    setIsLoading(true);
    try {
      const data = await loginUser({ email, password });
      if (data && data.user) {
        login(data.user);
        navigation.navigate(ROUTES.HOME);
      } else {
        Alert.alert(ALERT_MESSAGES.ERROR, ALERT_MESSAGES.INVALID_RESPONSE);
      }
    } catch (error) {
      if (error.response) {
        Alert.alert(ALERT_MESSAGES.ERROR, error.response.data.message || ALERT_MESSAGES.LOGIN_FAILED);
      } else if (error.request) {
        Alert.alert(ALERT_MESSAGES.ERROR, ALERT_MESSAGES.NO_SERVER_RESPONSE);
      } else {
        Alert.alert(ALERT_MESSAGES.ERROR, ALERT_MESSAGES.UNEXPECTED_ERROR);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground 
      source={IMAGES.BACKGROUND}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>{APP_TEXT.WELCOME_BACK}</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={SIZES.ICON} color={COLORS.PRIMARY} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={FORM_PLACEHOLDERS.EMAIL}
            placeholderTextColor={COLORS.PLACEHOLDER}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={SIZES.ICON} color={COLORS.PRIMARY} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={FORM_PLACEHOLDERS.PASSWORD}
            placeholderTextColor={COLORS.PLACEHOLDER}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={SIZES.ICON} color={COLORS.PRIMARY} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.loginButtonText}>{isLoading ? BUTTON_TEXT.LOGGING_IN : BUTTON_TEXT.LOGIN}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.REGISTER)}>
          <Text style={styles.registerLink}>{APP_TEXT.DONT_HAVE_ACCOUNT}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    width: '115%',
    height: '100%',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: COLORS.FORM_BACKGROUND,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: COLORS.PRIMARY,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: SIZES.TITLE,
    color: COLORS.PRIMARY,
    marginBottom: 30,
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
  loginButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: COLORS.BUTTON_TEXT,
    fontSize: SIZES.BODY,
    fontWeight: 'bold',
  },
  registerLink: {
    color: COLORS.PRIMARY,
    marginTop: 20,
    fontSize: SIZES.BODY,
  },
});
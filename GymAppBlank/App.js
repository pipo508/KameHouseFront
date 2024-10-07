import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './src/context/AuthContext';
import LoginScreen from './src/screen/LoginScreen';
import HomeScreen from './src/screen/HomeScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import AdminDashboardScreen from './src/screen/AdminDashboardScreen';
import AdminReportsScreen from './src/screen/AdminReportsScreen';
import AdminUsersScreen from './src/screen/AdminUsersScreen';
import UserPaymentsScreen from './src/screen/UserPaymentsScreen';

import UserWorkoutsScreen from './src/screen/UserWorkoutsScreen';
import WorkoutRoutineScreen from './src/screen/WorkoutRoutineScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
          <Stack.Screen name="AdminReports" component={AdminReportsScreen} />
          <Stack.Screen name="AdminUsers" component={AdminUsersScreen} />
          <Stack.Screen name="UserPayments" component={UserPaymentsScreen} />
          <Stack.Screen name="UserWorkouts" component={UserWorkoutsScreen} />
          <Stack.Screen name="Rutinas" component={WorkoutRoutineScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
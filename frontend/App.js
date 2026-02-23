import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import AddSubjectScreen from './screens/AddSubjectScreen';
import { registerForPushNotificationsAsync } from './services/notificationService';
import { updateFcmToken } from './services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    setupNotifications();
  }, []);

  const setupNotifications = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const fcmToken = await registerForPushNotificationsAsync();
      if (fcmToken) {
        await updateFcmToken(fcmToken);
      }
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1976D2" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: '#2196F3' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Signup" 
            component={SignupScreen} 
            options={{ title: 'Create Account' }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerLeft: null, title: 'Dashboard' }}
          />
          <Stack.Screen 
            name="AddSubject" 
            component={AddSubjectScreen} 
            options={{ title: 'Add Subject' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

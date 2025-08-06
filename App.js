import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import TodoScreen from './screens/TodoScreen';
import SignUpScreen from './screens/SignUpScreen';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Todo" component={TodoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/Authentication/LoginScreen';
import SignUpScreen from './Screens/Authentication/SignupScreen';
import AskAuthScreen from './Screens/Authentication/AskAuthScreen';
import TabNavigator from './Screens/Authentication/TabNavigationScreens/TabNavigator';
import ProductDetails from './Screens/Authentication/TabNavigationScreens/ProductDetailsScreen';

const Stack = createStackNavigator();

// Testing App
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="TabScreens"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="AskAuth" component={AskAuthScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="TabScreens" component={TabNavigator} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/Authentication/LoginScreen';
import SignUpScreen from './Screens/Authentication/SignupScreen';
import AskAuthScreen from './Screens/Authentication/AskAuthScreen';
import TabNavigator from './Screens/Authentication/TabNavigationScreens/TabNavigator';
import ProductDetails from './Screens/Authentication/TabNavigationScreens/ProductDetailsScreen';
import EditProfileScreen from './Screens/Authentication/TabNavigationScreens/ProfileSettings/EditProfileScreen';
import PasswordChangeScreen from './Screens/Authentication/TabNavigationScreens/ProfileSettings/PasswordChangeScreen';
import PrivacyPolicyScreen from './Screens/Authentication/TabNavigationScreens/ProfileSettings/PrivacypolicyScreen';  
import PasswordChangeSuccessfulScreen from './Screens/Authentication/TabNavigationScreens/ProfileSettings/PasswordChangeSuccessfulScreen';  
import WishListScreen from './Screens/Authentication/TabNavigationScreens/ProfileSettings/WishListScreen';
const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="WishList"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="AskAuth" component={AskAuthScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="TabScreens" component={TabNavigator} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="ChangePassword" component={PasswordChangeScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="PasswordChangeSuccessful" component={PasswordChangeSuccessfulScreen} />
        <Stack.Screen name="WishList" component={WishListScreen} />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}
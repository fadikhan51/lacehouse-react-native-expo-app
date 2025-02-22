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
import WishlistScreen from './Screens/Authentication/TabNavigationScreens/WishListScreen';   
import OrderComplete from './Screens/Authentication/TabNavigationScreens/OrderComplete';
import  ConfirmScreen from './Screens/Authentication/TabNavigationScreens/ConfirmScreen';
import DeliveryAddressScreen from './Screens/Authentication/TabNavigationScreens/DeliveryAddressScreen';
import NotificationScreen from './Screens/Authentication/TabNavigationScreens/NotificationScreen';
import VerificationOtpScreen from './Screens/Authentication/TabNavigationScreens/VerficationOptScreen';
import CustomerSupportScreen from './Screens/Authentication/TabNavigationScreens/CustomerSupportScreen';
// import FeedBackScreen from './Screens/Authentication/TabNavigationScreens/FeedBackScreen';

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
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="ChangePassword" component={PasswordChangeScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="PasswordChangeSuccessful" component={PasswordChangeSuccessfulScreen} />
        <Stack.Screen name="Wishlist" component={WishlistScreen} />
        <Stack.Screen name="OrderScreen" component={OrderComplete} />
        <Stack.Screen name="CartDone" component={ConfirmScreen} />
        <Stack.Screen name="DeliveryAddress" component={DeliveryAddressScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Verification" component={VerificationOtpScreen} />
        <Stack.Screen name="CustomerSupport" component={CustomerSupportScreen} />
        {/* <Stack.Screen name="FeedBack" component={FeedBackScreen} /> */}
        
        
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}
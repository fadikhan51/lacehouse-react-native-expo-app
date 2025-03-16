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
import ConfirmScreen from './Screens/Authentication/TabNavigationScreens/ConfirmScreen';
import DeliveryAddressScreen from './Screens/Authentication/TabNavigationScreens/DeliveryAddressScreen';
import NotificationScreen from './Screens/Authentication/TabNavigationScreens/NotificationScreen';
import VerificationOtpScreen from './Screens/Authentication/TabNavigationScreens/VerficationOptScreen';
import CustomerSupportScreen from './Screens/Authentication/TabNavigationScreens/CustomerSupportScreen';
import OrderAdminScreen from './Screens/Authentication/TabNavigationScreens/AdminAppScreens/OrderAdminScreen';
import AdminComponentsScreen from './Screens/Authentication/TabNavigationScreens/AdminAppScreens/AdminComponentsScreen';
import OrderDetailAdminScreen from './Screens/Authentication/TabNavigationScreens/AdminAppScreens/OrderDetailAdminScreen';
import ProductDetailAdminScreen from './Screens/Authentication/TabNavigationScreens/AdminAppScreens/ProductDetailAdminScreen';  
import NotificationAdminScreen from './Screens/Authentication/TabNavigationScreens/AdminAppScreens/NotificationAdminScreen';  
import AdminLoginScreen from './Screens/Authentication/TabNavigationScreens/AdminAppScreens/AdminLoginScreen';
import LoginPageAdminScreen from './Screens/Authentication/TabNavigationScreens/AdminAppScreens/LoginPageAdminScreen';
import FeedbackAdminScreen from './Screens/Authentication/TabNavigationScreens/AdminAppScreens/FeedBackAdminScreen';
import DashBoardAdminScreen from './Screens/Authentication/TabNavigationScreens/AdminAppScreens/DashBoardAdminScreen';  
import AddProductScreen from './Screens/Authentication/TabNavigationScreens/AdminAppScreens/ProductOptions/AddProductScreen';
import EditProductScreen from './Screens/Authentication/TabNavigationScreens/AdminAppScreens/ProductOptions/EditProductScreen';
import StockInventoryScreen from './Screens/Authentication/TabNavigationScreens/AdminAppScreens/ProductOptions/StockInventoryScreen';



const Stack = createStackNavigator();

// Testing App
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="AdminLogin"
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
        <Stack.Screen name="OrderAdmin" component={OrderAdminScreen} />
        <Stack.Screen name="AdminComponents" component={AdminComponentsScreen} />
        <Stack.Screen name="OrderDetailAdmin" component={OrderDetailAdminScreen} />
        <Stack.Screen name="ProductDetailAdmin" component={ProductDetailAdminScreen} /> 
        <Stack.Screen name="NotificationAdmin" component={NotificationAdminScreen} />
        <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
        <Stack.Screen name="LoginPageAdmin" component={LoginPageAdminScreen} />
        <Stack.Screen name="FeedbackAdmin" component={FeedbackAdminScreen} />
        <Stack.Screen name="DashBoardAdmin" component={DashBoardAdminScreen} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
        <Stack.Screen name="EditProduct" component={EditProductScreen} />
        <Stack.Screen name="StockInventory" component={StockInventoryScreen} />
        
        
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}
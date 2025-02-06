import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../LoginScreen";
import SignUpScreen from "../SignupScreen";

// const TabArr = [
//   {
//     route: "Home",
//     label: "Home",
//     type: Icons.Ionicons,
//     activeIcon: "grid",
//     inActiveIcon: "grid-outline",
//     component: LoginScreen,
//   },
//   {
//     route: "Like",
//     label: "Like",
//     type: Icons.MaterialCommunityIcons,
//     activeIcon: "heart-plus",
//     inActiveIcon: "heart-plus-outline",
//     component: SignUpScreen,
//   },
// ];

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
            paddingTop: 10,
        }
      }}
    >
      <Tab.Screen name="Home" component={LoginScreen} />
      <Tab.Screen name="Profile" component={SignUpScreen} />
    </Tab.Navigator>
  );
}

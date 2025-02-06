import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../LoginScreen";
import SignUpScreen from "../SignupScreen";
import CartActive from "../../../assets/icons/cart_active.svg";
import CartUncative from "../../../assets/icons/cart_unactive.svg";
import HomeActive from "../../../assets/icons/home_active.svg";
import HomeUncative from "../../../assets/icons/home_unactive.svg";
import NotificationActive from "../../../assets/icons/notification_active.svg";
import NotificationUncative from "../../../assets/icons/notification_unactive.svg";
import ProfileActive from "../../../assets/icons/profile_active.svg";
import ProfileUncative from "../../../assets/icons/profile_unactive.svg";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import HomeScreen from "./HomeScreen";
import CartScreen from "./CartScreen";
import NotificationsScreen from "./NotificationsScreen";
import ProfileSettings from "./ProfileSettings";
import { useEffect, useRef } from "react";
import * as Animatable from "react-native-animatable";

const TabArr = [
  {
    route: "Home",
    label: "Home",
    activeIcon: <HomeActive width={40} height={40}/>,
    inActiveIcon: <HomeUncative width={40} height={40}/>,
    component: HomeScreen,
  },
  {
    route: "Cart",
    label: "Cart",
    activeIcon: <CartActive width={50} height={50}/>,
    inActiveIcon: <CartUncative width={50} height={50}/>,
    component: CartScreen,
  },
  {
    route: "Notifications",
    label: "Notifications",
    activeIcon: <NotificationActive width={35} height={35}/>,
    inActiveIcon: <NotificationUncative width={35} height={35}/>,
    component: NotificationsScreen,
  },
  {
    route: "Settings",
    label: "Settings",
    activeIcon: <ProfileActive width={40} height={40}/>,
    inActiveIcon: <ProfileUncative width={40} height={40}/>,
    component: ProfileSettings,
  },
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  useEffect(()=>{
    if(focused) {
      viewRef.current.animate({0: {scale: 0.5}, 1: {scale: 1.5}});
    }
    else {
      viewRef.current.animate({0: {scale: 1.5}, 1: {scale: 1}});
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { top: 0 }]}
    >
      <Animatable.View
      ref={viewRef}
      animation={'zoomIn'}
      duration={1000}
      style={styles.container}
      >
      {focused ? item.activeIcon : item.inActiveIcon}
      </Animatable.View>
    </TouchableOpacity>
  )
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingTop: 10,
        },
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  }
})
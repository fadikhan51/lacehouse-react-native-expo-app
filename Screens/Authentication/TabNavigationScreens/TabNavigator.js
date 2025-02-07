import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
    activeIcon: <HomeActive width={20} height={20} />,
    inActiveIcon: <HomeUncative width={40} height={40} />,
    component: HomeScreen,
  },
  {
    route: "Cart",
    label: "Cart",
    activeIcon: <CartActive width={20} height={20} />,
    inActiveIcon: <CartUncative width={50} height={50} />,
    component: CartScreen,
  },
  {
    route: "Feed",
    label: "Feed",
    activeIcon: <NotificationActive width={17} height={17} />,
    inActiveIcon: <NotificationUncative width={35} height={35} />,
    component: NotificationsScreen,
  },
  {
    route: "Settings",
    label: "Settings",
    activeIcon: <ProfileUncative width={20} height={20} />,
    inActiveIcon: <ProfileActive width={40} height={40} />,
    component: ProfileSettings,
  },
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({ 
        0: { translateX: 0 }, 
        1: { translateX: 0 } 
      });
      textRef.current.animate({
        0: { translateY: 10, opacity: 0 },
        1: { translateY: 0, opacity: 1 }
      });
    } else {
      viewRef.current.animate({ 
        0: { translateX: -10 }, 
        1: { translateX: 0 } 
      });
      textRef.current.animate({
        0: { translateY: 0, opacity: 1 },
        1: { translateY: 10, opacity: 0 }
      });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, focused && styles.expandedContainer]}
    >
      <Animatable.View
        style={[styles.btnContainer, focused && styles.expandedBtnContainer]}
        ref={viewRef}
        duration={300}
      >
        <View style={[
          styles.iconContainer,
          focused && styles.activeIconContainer
        ]}>
          {focused ? item.activeIcon : item.inActiveIcon}
          <Animatable.Text
            ref={textRef}
            duration={300}
            style={styles.labelText}
          >
            {focused ? item.label : ""}
          </Animatable.Text>
        </View>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingTop: 15,
          paddingHorizontal: 30,
          paddingBottom: 15,
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
              tabBarButton: (props) => <TabButton {...props} item={item} />,
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
    justifyContent: "center",
    alignItems: "center",
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  expandedContainer: {
    flex: 2,
  },
  btnContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
  },
  expandedBtnContainer: {
    width: '100%',
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 20,
  },
  activeIconContainer: {
    backgroundColor: '#000',
    width: '100%',
    justifyContent: 'center',
  },
  labelText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 12,
  }
});
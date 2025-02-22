import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; 
import images from "../../../Constants/images";

const LIST_ITEM_HEIGHT = 100;
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

const INITIAL_CART = [
  {
    id: "1",
    name: "Roller Rabbit",
    description: "Vado Odelle Dress",
    price: 198,
    quantity: 1,
    image: images.bag1,
  },
  {
    id: "2",
    name: "Axel Arigato",
    description: "Clean 90 Triple Sneakers",
    price: 245,
    quantity: 1,
    image: images.bag2,
  },
  {
    id: "3",
    name: "Herschel Supply Co.",
    description: "Daypack Backpack",
    price: 40,
    quantity: 1,
    image: images.bag3,
  }
];

const CartScreen = () => {
  const [cart, setCart] = useState(INITIAL_CART);
  const navigation = useNavigation(); 

  const onDismiss = (item) => {
    setCart((cart) => cart.filter((cartItem) => cartItem.id !== item.id));
  };

  const updateQuantity = (itemId, change) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + change),
            }
          : item
      )
    );
  };

  const handleCheckout = () => {
    navigation.navigate("CartDone"); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <GestureHandlerRootView style={styles.container}>
        <Text style={styles.title}>My Cart</Text>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {cart.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              onDismiss={onDismiss}
              updateQuantity={updateQuantity}
            />
          ))}
        </ScrollView>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>
            Total ({cart.length} item{cart.length > 1 ? "s" : ""}) :{" "}
          </Text>
          <Text style={styles.totalPrice}>
            {cart
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const ListItem = ({ item, onDismiss, updateQuantity }) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(item);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0),
    };
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.taskContainer, rTaskContainerStyle]}>
      <Animated.View style={[styles.hiddenItem, rIconContainerStyle]}>
        <TouchableOpacity style={styles.deleteButton}>
          <Ionicons name="trash" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={[styles.task, rStyle]}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemPrice}>
              {(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, -1)}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, 1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  scrollView: { flex: 1 },
  taskContainer: { width: "100%", alignItems: "center" },
  task: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: LIST_ITEM_HEIGHT,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 15,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  image: { width: 60, height: 60, borderRadius: 10, marginRight: 15, resizeMode: "fit" },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: "bold" },
  itemDescription: { fontSize: 12, color: "gray" },
  itemPrice: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  hiddenItem: {
    position: "absolute",
    right: 0,
    width: "100%",
    backgroundColor: "black",
    height: LIST_ITEM_HEIGHT,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: "black",
    borderRadius: 20,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 0.5,
    borderTopColor: 'gray'
  },
  totalText: { fontSize: 16, fontWeight: "bold", color:'gray', marginTop: 20 },
  totalPrice: { fontSize: 18, color: "black", fontWeight: "bold" },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;
import React, { useState, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
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
import images from "../../../Constants/images";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.5;

const INITIAL_WISHLIST = [
  {
    id: "1",
    name: "Product 1",
    description: "Vado Odelle Dress",
    price: 198,
    image: images.bag1,
  },
  {
    id: "2",
    name: "Product 2",
    description: "Clean 90 Triple Sneakers",
    price: 245,
    image: images.bag2,
  },
  {
    id: "3",
    name: "Product 3",
    description: "Daypack Backpack",
    price: 40,
    image: images.bag3,
  },
  {
    id: "4",
    name: "Product 4",
    description: "Vado Odelle Dress",
    price: 98,
    image: images.bag4,
  },
  {
    id: "5",
    name: "Product 5",
    description: "Vado Odelle Dress",
    price: 50,
    image: images.bag5,
  },
  {
    id: "7",
    name: "Product 7",
    description: "Vado Odelle Dress",
    price: 200,
    image: images.bag2,
  },
  {
    id: "8",
    name: "Product 8",
    description: "Vado Odelle Dress",
    price: 200,
    image: images.bag1,
  },
];

const WishlistScreen = ({ navigation }) => {
  const [wishlist, setWishlist] = useState(INITIAL_WISHLIST);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const scrollViewRef = useRef(null);

  const onDismiss = (item) => {
    setWishlist((wishlist) => wishlist.filter((wishlistItem) => wishlistItem.id !== item.id));
  };

  const filteredWishlist = wishlist.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === "all") return matchesSearch;
    return matchesSearch && item.price <= parseInt(filter);
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Wishlist</Text>
        </View>
        <View style={styles.searchFilterContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterIcon} onPress={() => setShowFilters(!showFilters)}>
            <Text style={styles.filterIconText}>○</Text>
          </TouchableOpacity>
          {showFilters && (
            <View style={styles.filterOptions}>
              <TouchableOpacity style={styles.filterButton} onPress={() => { setFilter("all"); setShowFilters(false); }}>
                <Text style={styles.filterText}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton} onPress={() => { setFilter("50"); setShowFilters(false); }}>
                <Text style={styles.filterText}>Under 50</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton} onPress={() => { setFilter("200"); setShowFilters(false); }}>
                <Text style={styles.filterText}>Under 200</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.scrollContainer}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {filteredWishlist.map((item) => (
              <ListItem
                key={item.id}
                item={item}
                onDismiss={onDismiss}
              />
            ))}
          </ScrollView>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const ListItem = ({ item, onDismiss }) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(100);
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
          if (isFinished) {
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

  const rIconContainerStyle = useAnimatedStyle(() => ({
    opacity: withTiming(translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0),
  }));

  const rTaskContainerStyle = useAnimatedStyle(() => ({
    height: itemHeight.value,
    marginVertical: marginVertical.value,
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.taskContainer, rTaskContainerStyle]}>
      <Animated.View style={[styles.hiddenItem, rIconContainerStyle]}>
        <Ionicons name="trash" size={24} color="white" />
      </Animated.View>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={[styles.task, rStyle]}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
            <TouchableOpacity style={styles.addToCartButton}>
              <Text style={styles.addToCartText}>Add to Cart</Text>
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 0,
  },
  searchFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  searchBar: {
    flex: 4,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  filterIcon: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  filterIconText: {
    fontSize: 35,
  },
  filterOptions: {
    position: "absolute",
    top: 60,
    right: -10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1,
  },
  filterButton: {
    padding: 8,
    backgroundColor: "black",
    alignItems: "center",
    borderWidth: -1,
    borderColor: "black",
    borderRadius: 50,
    marginVertical: 4, 
  },
  filterText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  taskContainer: {
    width: "100%",
    alignItems: "center",
  },
  task: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 100,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 12,
    color: "gray",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  hiddenItem: {
    position: "absolute",
    right: 0,
    width: "100%",
    height: 100,
    backgroundColor: "black",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
  },
  addToCartButton: {
    backgroundColor: "black",
    padding: 5,
    borderRadius: 20,
    alignItems: "center",
    position: "absolute",
    right: 1,
    bottom: -5,
    width: 100,
  },
  addToCartText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default WishlistScreen;
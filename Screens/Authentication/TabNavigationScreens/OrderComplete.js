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
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import images from "../../../Constants/images";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const INITIAL_ORDERS = [
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
];

const OrderComplete = () => {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [isProductsVisible, setIsProductsVisible] = useState(false);

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied to Clipboard", "Order number has been copied.");
  };

  const subtotal = orders.reduce((total, item) => total + item.price, 0);
  const deliveryCharge = 200;
  const packingFee = 10; // Add packing fee
  const totalOrderAmount = subtotal + deliveryCharge + packingFee; // Update total order amount

  const toggleProductsVisibility = () => {
    setIsProductsVisible(!isProductsVisible);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Order Complete</Text>
          </View>

          <View style={styles.deliveryDetails}>
            <Text style={styles.thanksMessage}>Thanks for your order!</Text>
            <Text style={styles.confirmationMessage}>
              Order confirmation has been sent to
            </Text>
            <Text style={styles.email}>FurqanFarooq923@gmail.com</Text>

            <Text style={styles.deliveryTitle}>Estimated Arrival</Text>
            <Text style={styles.deliveryInfo}>21 Jan 2024</Text>

            <Text style={styles.deliveryTitle}>Payment Mode</Text>
            <Text style={styles.deliveryInfo}>Cash On Delivery</Text>

            <View style={styles.orderNumberContainer}>
              <Text style={styles.deliveryTitle}>Order Number</Text>
              <TouchableOpacity onPress={() => copyToClipboard("76736175831612808")}>
                <Ionicons name="copy-outline" size={16} color="gray" style={styles.copyIcon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.deliveryInfo}>76736175831612808</Text>

            <Text style={styles.deliveryTitle}>Delivered To</Text>
            <View style={styles.deliveredToContainer}>
              <Text style={styles.deliveryInfo}>Furqan Farooq</Text>
              <Text style={styles.deliveryInfo}>0336-0303085</Text>
              <Text style={styles.deliveryAddress}>Dr Saima Hamid St, Afshan Colony, Rwp</Text>
            </View>
          </View>

          <View style={styles.productsContainer}>
            <TouchableOpacity
              style={styles.productsHeader}
              onPress={toggleProductsVisibility}
            >
              <Text style={styles.productsTitle}>Products ({orders.length})</Text>
              <Ionicons
                name={isProductsVisible ? "chevron-up" : "chevron-down"}
                size={20}
                color="black"
              />
            </TouchableOpacity>

            {isProductsVisible && (
              <View style={styles.productsListContainer}>
                {orders.map((item) => (
                  <ListItem key={item.id} item={item} />
                ))}
              </View>
            )}

            <View style={styles.orderTotalContainer}>
              <View style={styles.orderTotalRow}>
                <Text style={styles.orderTotalText}>Subtotal</Text>
                <Text style={styles.orderTotalAmount}>{subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.orderTotalRow}>
                <Text style={styles.orderTotalText}>Delivery Charges</Text>
                <Text style={styles.orderTotalAmount}>{deliveryCharge.toFixed(2)}</Text>
              </View>
              <View style={styles.orderTotalRow}>
                <Text style={styles.orderTotalText}>Packing Fee</Text>
                <Text style={styles.orderTotalAmount}>{packingFee.toFixed(2)}</Text>
              </View>
              <View style={styles.orderTotalRow}>
                <Text style={styles.orderTotalText}>Total</Text>
                <Text style={styles.orderTotalAmount}>{totalOrderAmount.toFixed(2)}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.continueShoppingButton}>
            <Text style={styles.continueShoppingText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ListItem = ({ item }) => {
  return (
    <View style={styles.task}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>{item.price.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  deliveryDetails: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 5,
    elevation: 5,
  },
  thanksMessage: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  confirmationMessage: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "bold",
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  deliveryInfo: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  deliveryAddress: {
    fontSize: 14,
    color: "gray",
  },
  deliveredToContainer: {
    marginBottom: 15,
  },
  orderNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  copyIcon: {
    marginLeft: 5,
  },
  productsContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 10,
  },
  productsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  productsTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productsListContainer: {
    marginBottom: 10,
  },
  task: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 100,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 10,
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
  orderTotalContainer: {
    marginTop: 10,
    paddingTop: 25,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  orderTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  orderTotalText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  orderTotalAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  continueShoppingButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  continueShoppingText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OrderComplete;
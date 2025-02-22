import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useNavigation } from "@react-navigation/native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const INITIAL_ORDERS = [
  {
    id: "1",
    name: "Vado Odelle Dress",
    description: "Vado Odelle Dress",
    price: 198,
    quantity: 1,
  },
  {
    id: "2",
    name: "Clean 90 Triple Sneakers",
    description: "Clean 90 Triple Sneakers",
    price: 245,
    quantity: 1,
  },
  {
    id: "3",
    name: "Daypack Backpack",
    description: "Daypack Backpack",
    price: 40,
    quantity: 1,
  },
];

const OrderComplete = () => {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [showFullList, setShowFullList] = useState(false);
  const navigation = useNavigation();

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied to Clipboard", "Order number has been copied.");
  };

  const subtotal = orders.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryCharge = 200;
  const packingFee = 10;
  const totalOrderAmount = subtotal + deliveryCharge + packingFee;

  const initialProductCount = 1;

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
            <Text style={styles.productsTitle}>Order Summary ({orders.length})</Text>

            <View style={styles.productListContainer}>
              {orders.slice(0, showFullList ? orders.length : initialProductCount).map((item) => (
                <View key={item.id} style={styles.productRow}>
                  <Text style={styles.productName}>
                    {item.quantity}x {item.name}
                  </Text>
                  <Text style={styles.productPrice}>Rs. {(item.price * item.quantity).toFixed(2)}</Text>
                </View>
              ))}
            </View>

            {orders.length > initialProductCount && (
              <TouchableOpacity onPress={() => setShowFullList(!showFullList)}>
                <Text style={styles.showMoreButton}>
                  {showFullList ? 'Show Less' : `Show More (${orders.length - initialProductCount})`}
                </Text>
              </TouchableOpacity>
            )}

            <View style={styles.divider} />

            <View style={styles.billingRow}>
              <Text style={styles.billingLabel}>Subtotal</Text>
              <Text style={styles.billingValue}>Rs. {subtotal.toFixed(2)}</Text>
            </View>

            <View style={styles.billingRow}>
              <Text style={styles.billingLabel}>Standard Delivery</Text>
              <Text style={styles.billingValue}>Rs. {deliveryCharge.toFixed(2)}</Text>
            </View>

            <View style={styles.billingRow}>
              <Text style={styles.billingLabel}>Packing Fee</Text>
              <Text style={styles.billingValue}>Rs. {packingFee.toFixed(2)}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.billingRow}>
              <Text style={styles.billingLabel}>Total</Text>
              <Text style={styles.billingValue}>Rs. {totalOrderAmount.toFixed(2)}</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.continueShoppingButton}
            onPress={() => navigation.navigate('TabScreens')}
          >
            <Text style={styles.continueShoppingText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    marginBottom: 5,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  deliveryDetails: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
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
    padding: 10,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 10,
  },
  productsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productListContainer: {
    marginBottom: 10,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  productName: {
    fontSize: 14,
    color: "#333",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  billingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  billingLabel: {
    fontSize: 14,
    color: "#333",
  },
  billingValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 8,
  },
  showMoreButton: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginTop: 8,
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
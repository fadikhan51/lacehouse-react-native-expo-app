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
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useNavigation } from "@react-navigation/native";
import images from "../../../../Constants/images";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const INITIAL_ORDERS = [
  {
    id: "1",
    name: "Vado Odelle Dress",
    description: "Vado Odelle Dress",
    price: 198,
    image: images.bag1,
    quantity: 2,
  },
  {
    id: "2",
    name: "Clean 90 Triple Sneakers",
    description: "Clean 90 Triple Sneakers",
    price: 245,
    image: images.bag2,
    quantity: 1,
  },
  {
    id: "3",
    name: "Daypack Backpack",
    description: "Daypack Backpack",
    price: 40,
    image: images.bag3,
    quantity: 3,
  },
];

const OrderDetailAdminScreen = () => {
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
            <Text style={styles.title}>Order Details</Text>
          </View>

          <View style={styles.deliveryDetails}>
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
                <ListItem key={item.id} item={item} />
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
        <Text style={styles.itemPrice}>Rs. {(item.price * item.quantity).toFixed(2)}</Text>
        <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
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
  itemQuantity: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
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
});

export default OrderDetailAdminScreen;
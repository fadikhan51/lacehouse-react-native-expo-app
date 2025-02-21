import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal, Button, SafeAreaView, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Clipboard from 'expo-clipboard';
import images from "../../../Constants/images";

const INITIAL_ORDERS = [
  {
    id: "1",
    name: "Product 1",
    description: "Vado Odelle Dress",
    price: 198,
    image: images.bag1,
    quantity: 1,
  },
  {
    id: "2",
    name: "Product 2",
    description: "Clean 90 Triple Sneakers",
    price: 198,
    image: images.bag2,
    quantity: 1,
  },
  {
    id: "3",
    name: "Product 3",
    description: "Daypack Backpack",
    price: 40,
    image: images.bag3,
    quantity: 1,
  },
  {
    id: "4",
    name: "Product 4",
    description: "Leather Jacket",
    price: 120,
    image: images.bag4,
    quantity: 1,
  },
];

const ConfirmScreen = ({ navigation }) => {
  const [deliveryAddress, setDeliveryAddress] = useState({
    Name: 'Furqan Farooq',
    PhoneNumber: '03360303085',
    state: 'Rawalpindi',
    Address: 'DrSaimaHamidSt,AfshanColony,Rwp',
    country: 'Pakistan',
  });

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editedAddress, setEditedAddress] = useState({ ...deliveryAddress });
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  const handleSaveAddress = () => {
    setDeliveryAddress(editedAddress);
    setEditModalVisible(false);
  };

  const handleInputChange = (field, value) => {
    setEditedAddress({ ...editedAddress, [field]: value });
  };

  const increaseQuantity = (id) => {
    const updatedOrders = orders.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setOrders(updatedOrders);
  };

  const decreaseQuantity = (id) => {
    const updatedOrders = orders.map((item) =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setOrders(updatedOrders);
  };

  const subtotal = orders.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryCharge = 200;
  const packingFee = 10;
  const totalOrderAmount = subtotal + deliveryCharge + packingFee;

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied to Clipboard", "Order number has been copied.");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <View style={styles.centerContent}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={[styles.screenTitle, { textAlign: 'left', marginLeft: 0 }]}>Order Confirmation</Text>
          </View>

          <View style={styles.box}>
            <View style={styles.header}>
              <Text style={styles.title}>Delivery Address</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(true)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.content}>{deliveryAddress.Name}</Text>
            <Text style={styles.label}>Phone Number:</Text>
            <Text style={styles.content}>{deliveryAddress.PhoneNumber}</Text>
            <Text style={styles.label}>State/Province/Area:</Text>
            <Text style={styles.content}>{deliveryAddress.state}</Text>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.content}>{deliveryAddress.Address}</Text>
            <Text style={styles.label}>Country:</Text>
            <Text style={styles.content}>{deliveryAddress.country}</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.title}>Order Summary ({orders.length})</Text>

            <View style={styles.productsListContainer}>
              {orders.slice(0, showAllProducts ? orders.length : 1).map((item) => (
                <ListItem
                  key={item.id}
                  item={item}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                />
              ))}
            </View>

            {orders.length > 1 && (
              <TouchableOpacity
                style={styles.showMoreButton}
                onPress={() => setShowAllProducts(!showAllProducts)}
              >
                <Text style={styles.showMoreButtonText}>
                  {showAllProducts ? 'Show Less' : `Show More (${orders.length - 1})`}
                </Text>
              </TouchableOpacity>
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

            <TouchableOpacity style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal visible={isEditModalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Delivery Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={editedAddress.Name}
                onChangeText={(text) => handleInputChange('Name', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={editedAddress.PhoneNumber}
                onChangeText={(text) => handleInputChange('PhoneNumber', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="State"
                value={editedAddress.state}
                onChangeText={(text) => handleInputChange('state', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={editedAddress.Address}
                onChangeText={(text) => handleInputChange('Address', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Country"
                value={editedAddress.country}
                onChangeText={(text) => handleInputChange('country', text)}
              />
              <View style={styles.modalButtons}>
                <Button title="Cancel" onPress={() => setEditModalVisible(false)} />
                <Button title="Save" onPress={handleSaveAddress} />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const ListItem = ({ item, increaseQuantity, decreaseQuantity }) => {
  return (
    <View style={styles.task}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>Rs. {(item.price * item.quantity).toFixed(2)}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    width: '100%',
  },
  backButton: {
    left: 0,
    zIndex: 1,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'Black',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  content: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  productsListContainer: {
    marginBottom: 10,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 100,
    padding: 10,
    backgroundColor: 'white',
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
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 12,
    color: 'gray',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  orderTotalContainer: {
    marginTop: 10,
    paddingTop: 25,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  orderTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  orderTotalText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  orderTotalAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#000',
    borderRadius: 15,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  showMoreButton: {
    alignItems: 'center',
  },
  showMoreButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ConfirmScreen;
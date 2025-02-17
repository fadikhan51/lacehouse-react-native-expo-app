import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal, Button, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library

const ConfirmScreen = ({ navigation }) => { // Add navigation prop
  const [deliveryAddress, setDeliveryAddress] = useState({
    Name: 'Furqan Farooq',
    PhoneNumber: '03360303085',
    state: 'Rawalpindi',
    Address: 'DrSaimaHamidSt,AfshanColony,Rwp',
    country: 'Pakistan',
  });

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editedAddress, setEditedAddress] = useState({ ...deliveryAddress });
  const [showFullList, setShowFullList] = useState(false);

  const handleSaveAddress = () => {
    setDeliveryAddress(editedAddress);
    setEditModalVisible(false);
  };

  const handleInputChange = (field, value) => {
    setEditedAddress({ ...editedAddress, [field]: value });
  };

  const productList = [
    { id: 1, name: "Product 1", quantity: 2, price: 300 },
    { id: 2, name: "Product 2", quantity: 1, price: 40 },
    { id: 3, name: "Product 3", quantity: 1, price: 27 },
    { id: 4, name: "Product 4", quantity: 1, price: 50 },
    { id: 5, name: "Product 5", quantity: 1, price: 60 },
    { id: 6, name: "Product 6", quantity: 1, price: 70 },
  ];

  const productTotal = productList.reduce((total, product) => total + product.price * product.quantity, 0);
  const deliveryCharges = 200;
  const platformFee = 10;
  const total = productTotal + deliveryCharges + platformFee;
  const initialProductCount = 3;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <View style={styles.centerContent}>
          {/* Add the back arrow and title in the same row */}
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
            <Text style={styles.title}>Order Summary</Text>

            <View style={styles.productListContainer}>
              {productList.slice(0, showFullList ? productList.length : initialProductCount).map((product) => (
                <View key={product.id} style={styles.productRow}>
                  <Text style={styles.productName}>
                    {product.quantity}x {product.name}
                  </Text>
                  <Text style={styles.productPrice}>Rs. {(product.price * product.quantity).toFixed(2)}</Text>
                </View>
              ))}
            </View>

            {productList.length > initialProductCount && (
              <TouchableOpacity onPress={() => setShowFullList(!showFullList)}>
                <Text style={styles.showMoreButton}>
                  {showFullList ? 'Show Less' : 'Show More'}
                </Text>
              </TouchableOpacity>
            )}

            <View style={styles.divider} />

            <View style={styles.billingRow}>
              <Text style={styles.billingLabel}>Subtotal</Text>
              <Text style={styles.billingValue}>Rs. {productTotal.toFixed(2)}</Text>
            </View>

            <View style={styles.billingRow}>
              <Text style={styles.billingLabel}>Standard Delivery</Text>
              <Text style={styles.billingValue}>Rs. {deliveryCharges.toFixed(2)}</Text>
            </View>

            <View style={styles.billingRow}>
              <Text style={styles.billingLabel}>Platform Fee </Text>
              <Text style={styles.billingValue}>Rs. {platformFee.toFixed(2)}</Text>
            </View>

            <View style={styles.billingRow}>
              <Text style={styles.billingLabel}>Payment Mode</Text>
              <Text style={styles.billingValue}>Cash</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.billingRow}>
              <Text style={styles.billingLabel}>Total</Text>
              <Text style={styles.billingValue}>Rs. {total.toFixed(2)}</Text>
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
  productListContainer: {
    marginTop: 10, // Added spacing here
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  productName: {
    fontSize: 14,
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  billingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  billingLabel: {
    fontSize: 14,
    color: '#333',
  },
  billingValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 8,
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default ConfirmScreen;
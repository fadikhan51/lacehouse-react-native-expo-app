  import React from 'react';
  import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

  const CartScreen = () => {
    const cartItems = [
      { id: '1', name: 'Product 1', price: 29.99, quantity: 2 },
      { id: '2', name: 'Product 2', price: 19.99, quantity: 1 },
      { id: '3', name: 'Product 3', price: 39.99, quantity: 3 },
    ];

    const renderItem = ({ item }) => (
      <View style={styles.cartItem}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.quantity}>Qty: {item.quantity}</Text>
        <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
      </View>
    );

    const calculateTotal = () => {
      return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Shopping Cart</Text>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.list}
        />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalAmount}>${calculateTotal().toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      margin: 20,
    },
    list: {
      flex: 1,
    },
    cartItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    productName: {
      fontSize: 16,
      flex: 2,
    },
    quantity: {
      fontSize: 16,
      flex: 1,
    },
    price: {
      fontSize: 16,
      fontWeight: 'bold',
      flex: 1,
      textAlign: 'right',
    },
    totalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: '#eee',
    },
    totalText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    totalAmount: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    checkoutButton: {
      backgroundColor: '#000000',
      padding: 16,
      borderRadius: 15,
      alignItems: 'center',
      margin: 16,
    },
    checkoutText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  export default CartScreen;
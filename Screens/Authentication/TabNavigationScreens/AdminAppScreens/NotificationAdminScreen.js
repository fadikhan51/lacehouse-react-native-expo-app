import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import images from "../../../../Constants/images";

const notifications = [
  {
    id: 1,
    type: 'shortage',
    title: '⚠️ Shortage Product Alert',
    message: 'The quantity of the Product orderID is low. Please check the inventory and restock as soon as possible.',
    image: [images.bag2, images.bag1],
  },
  {
    id: 2,
    type: 'hotSelling',
    title: '🔥 Hot Selling Product',
    message: 'Most selling Product orderID in the store!',
    image: [images.bag2, images.bag1, images.bag3],
  },
];

const orderStatusChanges = [
  { id: 1, status: 'Pending', orderId: 'ORD12345', time: '10:00 AM' },
  { id: 2, status: 'Shipped', orderId: 'ORD12346', time: '11:30 AM' },
  { id: 3, status: 'Delivered', orderId: 'ORD12347', time: '1:00 PM' },
];

const warningsAndAlerts = [
  { id: 1, message: 'Low stock for Product orderID:1', quantity: 5 },
  { id: 2, message: 'High return rate for Product orderID: 10'},
  { id: 3, message: 'Low stock for Product orderID:50', quantity: 2 },
];

const newOrders = [
  { id: 1, orderId: '50', customer: 'John Doe', items: 3, time: '2:00 PM' },
  { id: 2, orderId: '10', customer: 'Jane Smith', items: 5, time: '3:00 PM' },
];

const productUpdates = [
  {
    id: 1,
    type: 'upload',
    productName: 'Product A',
    orderId: '2',
    time: '4:00 PM',
  },
  {
    id: 2,
    type: 'edit',
    productName: 'Product B',
    orderId: '1',
    time: '5:00 PM',
  },
  {
    id: 3,
    type: 'edit',
    productName: 'Product A',
    orderId: '5',
    time: '6:00 PM',
  },
];

const NotificationAdminScreen = () => {
  const navigation = useNavigation();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#fff3cd';
      case 'Shipped':
        return '#d4edda';
      case 'Delivered':
        return '#d1ecf1';
      default:
        return '#fff';
    }
  };

  const getWarningColor = (message) => {
    if (message.includes('Low stock')) {
      return '#ffcccb';
    } else if (message.includes('High return rate')) {
      return '#ffeb3b';
    } else {
      return '#fff';
    }
  };

  const getProductColor = (productName) => {
    const colors = ['#e3f2fd', '#f3e5f5', '#fff8e1', '#e8f5e9', '#ffebee'];
    const hash = productName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.type !== 'newArrival' &&
      notification.type !== 'reminder' &&
      notification.type !== 'promotionDeals'
  );

  const handleOrderPress = (order) => {
    navigation.navigate('OrderDetailAdmin', { order });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Notifications</Text>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Order Status Changes</Text>
            {orderStatusChanges.map((status) => (
              <View
                key={status.id}
                style={[styles.item, { backgroundColor: getStatusColor(status.status) }]}
              >
                <Text style={styles.itemText}>
                  <Text style={styles.bold}>Order ID:</Text> {status.orderId}
                </Text>
                <Text style={styles.itemText}>
                  <Text style={styles.bold}>Status:</Text> {status.status}
                </Text>
                <Text style={styles.itemText}>
                  <Text style={styles.bold}>Time:</Text> {status.time}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.box}>
            <Text style={styles.boxTitle}>Warnings & Alerts</Text>
            {warningsAndAlerts.map((warning) => (
              <View
                key={warning.id}
                style={[styles.item, { backgroundColor: getWarningColor(warning.message) }]}
              >
                <Text style={[styles.itemText, styles.warningText]}>
                  ⚠️ {warning.message}
                  {warning.message.includes('Low stock') && warning.quantity !== undefined && (
                    <Text style={styles.quantityText}> (Quantity: {warning.quantity})</Text>
                  )}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.box}>
            <Text style={styles.boxTitle}>New Orders</Text>
            {newOrders.map((order) => (
              <TouchableOpacity
                key={order.id}
                style={styles.item}
                onPress={() => handleOrderPress(order)}
              >
                <Text style={styles.itemText}>
                  <Text style={styles.bold}>Order ID:</Text> {order.orderId}
                </Text>
                <Text style={styles.itemText}>
                  <Text style={styles.bold}>Customer:</Text> {order.customer}
                </Text>
                <Text style={styles.itemText}>
                  <Text style={styles.bold}>Items:</Text> {order.items}
                </Text>
                <Text style={styles.itemText}>
                  <Text style={styles.bold}>Time:</Text> {order.time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.box}>
            <Text style={styles.boxTitle}>Product Updates</Text>
            {productUpdates.map((update) => (
              <View
                key={update.id}
                style={[styles.item, { backgroundColor: getProductColor(update.productName) }]}
              >
                <Text style={styles.itemText}>
                  <Text style={styles.bold}>Action:</Text> {update.type === 'upload' ? 'Uploaded' : 'Edited'}
                </Text>
                <Text style={styles.itemText}>
                  <Text style={styles.bold}>Product Name:</Text> {update.productName}
                </Text>
                <Text style={styles.itemText}>
                  <Text style={styles.bold}>Order ID:</Text> {update.orderId}
                </Text>
                <Text style={styles.itemText}>
                  <Text style={styles.bold}>Time:</Text> {update.time}
                </Text>
              </View>
            ))}
          </View>

          {filteredNotifications.map((notification) => (
            <View key={notification.id} style={styles.notificationCard}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationText}>{notification.message}</Text>
              {notification.image && (
                <View style={styles.imageContainer}>
                  {notification.image.map((img, index) => (
                    <Image
                      key={index}
                      source={img}
                      style={[
                        styles.image,
                        notification.image.length === 1 && styles.singleImage,
                        notification.image.length === 2 && styles.twoImages,
                        notification.image.length === 3 && styles.threeImages,
                        notification.image.length >= 4 && styles.fourImages,
                      ]}
                      resizeMode="cover"
                    />
                  ))}
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  boxTitle: {
    fontSize: 18,
    borderRadius: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  item: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderRadius:20,
    padding: 10,
  },
  itemText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  },
  warningText: {
    color: '#ff4444',
  },
  quantityText: {
    fontWeight: 'bold',
    color: '#333',
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  notificationText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    lineHeight: 22,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  image: {
    borderRadius: 8,
    marginBottom: 12,
  },
  singleImage: {
    width: '85%',
    height: 200,
  },
  twoImages: {
    width: '48%',
    height: 150,
  },
  threeImages: {
    width: '32%',
    height: 100,
  },
  fourImages: {
    width: '23%',
    height: 80,
  },
});

export default NotificationAdminScreen;
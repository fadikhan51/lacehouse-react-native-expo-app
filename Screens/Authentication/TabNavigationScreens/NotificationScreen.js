import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import images from "../../../Constants/images";

const notifications = [
  {
    id: 1,
    type: 'newArrival',
    title: '🆕 New Arrival',
    message: 'New items have arrived! Check out our latest collection.',
    image: [images.bag1],
  },
  {
    id: 2,
    type: 'orderComplete',
    title: '✅ Order Complete Confirmation',
    message: 'Your order #12345 has been successfully completed. Thank you for shopping with us!',
    image: null,
  },
  {
    id: 3,
    type: 'reminder',
    title: '⏰ Reminder to Complete Order',
    message: 'You have an incomplete order. Please complete it to avoid cancellation.',
    image: null,
  },
  {
    id: 4,
    type: 'promotionDeals',
    title: '🎉 Promotion Deals',
    message: 'Check out our latest promotion deals! Get up to 50% off on selected items.',
    image: [images.bag3, images.bag2],
  },
  {
    id: 5,
    type: 'shortage',
    title: '⚠️ Shortage Item Alert',
    message: 'The item "XYZ" is currently out of stock. We will notify you once it\'s available again.',
    image: [images.bag2, images.bag1],
  },
  {
    id: 6,
    type: 'hotSelling',
    title: '🔥 Hot Selling Item',
    message: 'Check out this hot-selling item that everyone is talking about!',
    image: [images.bag2, images.bag1, images.bag3], 
  },
];

const NotificationScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notification</Text>
          <View style={styles.emptyView} />
        </View>

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {notifications.map((notification) => (
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
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 5,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyView: {
    width: 24,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
    fontSize: 14,
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
    width: '100%',
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

export default NotificationScreen;
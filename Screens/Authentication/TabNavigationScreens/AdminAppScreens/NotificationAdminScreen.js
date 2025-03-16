import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Modal,
  TextInput,
  Pressable,
  Animated,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Using a hypothetical icon library that would be imported in the actual app
// Replace these with your actual icon imports
const PlusIcon = () => <Text style={{fontSize: 24, fontWeight: 'bold'}}>+</Text>;
const CheckIcon = () => <Text style={{fontSize: 16}}>✓</Text>;

// Initial notifications data
const initialNotifications = [
  {
    id: 1,
    type: 'orderConfirmed',
    title: 'Order Confirmed',
    message: 'Order #ORD12345 has been confirmed and is being processed.',
    orderId: 'ORD12345',
    timestamp: '10:30 AM',
    read: false
  },
  {
    id: 2,
    type: 'orderCancelled',
    title: 'Order Cancelled',
    message: 'Order #ORD12346 has been cancelled by the customer.',
    orderId: 'ORD12346',
    timestamp: '11:45 AM',
    read: false
  },
  {
    id: 3,
    type: 'shortage',
    title: 'Product Shortage Alert',
    message: 'Low stock for Product #P789 in Black color (5 remaining).',
    productId: 'P789',
    color: 'Black',
    quantity: 5,
    timestamp: '01:15 PM',
    read: false
  },
  {
    id: 4,
    type: 'orderConfirmed',
    title: 'Order Confirmed',
    message: 'Order #ORD12347 has been confirmed and is being processed.',
    orderId: 'ORD12347',
    timestamp: '02:20 PM',
    read: true
  },
  {
    id: 5,
    type: 'shortage',
    title: 'Product Shortage Alert',
    message: 'Low stock for Product #P456 in White color (3 remaining).',
    productId: 'P456',
    color: 'White',
    quantity: 3,
    timestamp: '03:40 PM',
    read: true
  },
];

const NotificationAdminScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: ''
  });
  
  // Animation value for the read indicator
  const [fadeAnims] = useState(() => 
    notifications.map(() => new Animated.Value(1))
  );

  const getNotificationTypeIcon = (type) => {
    switch (type) {
      case 'orderConfirmed':
        return '✓';
      case 'orderCancelled':
        return '✕';
      case 'shortage':
        return '!';
      default:
        return '';
    }
  };

  const getNotificationBorderColor = (type, isRead) => {
    if (isRead) {
      return '#ddd';
    }
    
    switch (type) {
      case 'orderConfirmed':
        return '#555';
      case 'orderCancelled':
        return '#444';
      case 'shortage':
        return '#333';
      default:
        return '#666';
    }
  };

  const handleNotificationPress = (notification, index) => {
    if (notification.type === 'orderConfirmed' || notification.type === 'orderCancelled') {
      navigation.navigate('OrderDetailAdmin', { 
        orderId: notification.orderId,
      });
    } else if (notification.type === 'shortage') {
      navigation.navigate('ProductDetail', {
        productId: notification.productId,
        color: notification.color,
      });
    }
    
    // Mark as read if not already
    if (!notification.read) {
      markAsRead(notification.id, index);
    }
  };

  const markAsRead = (id, index) => {
    // Animate the notification
    Animated.timing(fadeAnims[index], {
      toValue: 0.7,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    // Update the notifications state
    const updatedNotifications = notifications.map(notif => 
      notif.id === id ? {...notif, read: true} : notif
    );
    
    // Short delay to complete the animation before updating state
    setTimeout(() => {
      setNotifications(updatedNotifications);
    }, 300);
  };

  const handleSendNotification = () => {
    if (newNotification.title.trim() === '' || newNotification.message.trim() === '') {
      // In a real app, you'd show an error message
      return;
    }
    
    const newNotif = {
      id: Date.now(),
      ...newNotification,
      type: 'custom', // Generic notification type
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      read: false
    };
    
    setNotifications([newNotif, ...notifications]);
    setModalVisible(false);
    setNewNotification({
      title: '',
      message: ''
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header with Plus Button */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Notifications</Text>
          
          <TouchableOpacity 
            style={styles.plusButton} 
            onPress={() => setModalVisible(true)}
          >
            <PlusIcon />
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          style={styles.scrollContainer} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {notifications.map((notification, index) => (
            <Animated.View 
              key={notification.id}
              style={{
                opacity: fadeAnims[index],
                transform: [{
                  scale: fadeAnims[index].interpolate({
                    inputRange: [0.7, 1],
                    outputRange: [0.98, 1]
                  })
                }]
              }}
            >
              <TouchableOpacity
                style={[
                  styles.notificationItem,
                  { 
                    borderLeftColor: getNotificationBorderColor(notification.type, notification.read)
                  },
                  notification.read && styles.readNotification
                ]}
                onPress={() => handleNotificationPress(notification, index)}
              >
                <View style={styles.iconContainer}>
                  <Text style={styles.notificationIcon}>
                    {getNotificationTypeIcon(notification.type)}
                  </Text>
                </View>
                
                <View style={styles.notificationContent}>
                  <View style={styles.titleRow}>
                    <Text style={styles.notificationTitle}>
                      {notification.title}
                    </Text>
                    {notification.read && (
                      <Text style={styles.readIndicator}>
                        Read
                      </Text>
                    )}
                  </View>
                  <Text style={styles.notificationMessage}>
                    {notification.message}
                  </Text>
                  <Text style={styles.timestamp}>
                    {notification.timestamp}
                  </Text>
                </View>
                
                {!notification.read && (
                  <TouchableOpacity 
                    style={styles.markReadButton}
                    onPress={() => markAsRead(notification.id, index)}
                  >
                    <CheckIcon />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>

        {/* Modal for sending new notifications */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.centeredView}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Send Notification to All Users</Text>
              
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Title</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter notification title"
                  placeholderTextColor="#999"
                  value={newNotification.title}
                  onChangeText={(text) => setNewNotification({...newNotification, title: text})}
                />
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Message</Text>
                <TextInput
                  style={styles.textArea}
                  placeholder="Enter notification message"
                  placeholderTextColor="#999"
                  multiline={true}
                  numberOfLines={4}
                  value={newNotification.message}
                  onChangeText={(text) => setNewNotification({...newNotification, message: text})}
                />
              </View>
              
              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.button, styles.buttonCancel]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonSend]}
                  onPress={handleSendNotification}
                >
                  <Text style={styles.buttonSendText}>Send to All</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  plusButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderLeftWidth: 4,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  readNotification: {
    opacity: 0.7,
  },
  iconContainer: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
  },
  notificationIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationContent: {
    flex: 1,
    padding: 16,
    paddingLeft: 0,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  readIndicator: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#999',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    alignSelf: 'flex-end',
  },
  markReadButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Modal styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  formGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#000',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#000',
    textAlignVertical: 'top',
    minHeight: 100,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    borderRadius: 8,
    padding: 12,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonCancel: {
    backgroundColor: 'transparent',
    borderColor: '#ddd',
  },
  buttonSend: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  buttonSendText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});

export default NotificationAdminScreen;
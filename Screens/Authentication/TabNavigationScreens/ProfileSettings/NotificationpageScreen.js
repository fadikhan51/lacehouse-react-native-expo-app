
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, SafeAreaView } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const NotificationPageScreen = () => {
  const [notifications, setNotifications] = useState({
    newItems: true,
    promotions: true,
    newArrivals: true,
    orderConfirmation: true,
    customerService: true,
  });

  const toggleSwitch = (key) => {
    setNotifications(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Notification Settings</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>New Items Notification</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={notifications.newItems ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={() => toggleSwitch('newItems')}
              value={notifications.newItems}
            />
          </View>

          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>Promotion Deals</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={notifications.promotions ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={() => toggleSwitch('promotions')}
              value={notifications.promotions}
            />
          </View>

          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>New Arrivals</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={notifications.newArrivals ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={() => toggleSwitch('newArrivals')}
              value={notifications.newArrivals}
            />
          </View>

          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>Order Confirmation</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={notifications.orderConfirmation ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={() => toggleSwitch('orderConfirmation')}
              value={notifications.orderConfirmation}
            />
          </View>

          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>Customer Service Response</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={notifications.customerService ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={() => toggleSwitch('customerService')}
              value={notifications.customerService}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
  },
});

export default NotificationPageScreen;

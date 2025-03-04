import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const fetchOrders = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', subTotal: '10.00', grandTotal: '10.00', orderDate: '2/25/25', status: 'Delivered', deliveryAddress: 'Dr saima st, Afshan st, Lahore' },
        { id: '2', subTotal: '30.00', grandTotal: '32.00', orderDate: '2/20/25', status: 'Pending', deliveryAddress: 'Dr saima st, Afshan st, Lahore' },
        { id: '3', subTotal: '10.00', grandTotal: '10.00', orderDate: '2/21/25', status: 'Shipped', deliveryAddress: 'Dr saima st, Afshan st, Lahore' },
        { id: '4', subTotal: '15.00', grandTotal: '16.00', orderDate: '2/23/25', status: 'Delivered', deliveryAddress: 'Dr saima st, Afshan st, Lahore' },
        { id: '5', subTotal: '15.00', grandTotal: '16.00', orderDate: '2/22/25', status: 'Pending', deliveryAddress: 'Dr saima st, Afshan st, Lahore' },
        { id: '6', subTotal: '15.00', grandTotal: '16.00', orderDate: '2/26/25', status: 'Shipped', deliveryAddress: 'Dr saima st, Afshan st, Lahore' },
        { id: '7', subTotal: '15.00', grandTotal: '16.00', orderDate: '2/26/25', status: 'Delivered', deliveryAddress: 'Dr saima st, Afshan st, Lahore' },
      ]);
    }, 1000);
  });
};

const OrderAdminScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [visibleAddressId, setVisibleAddressId] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderIdInput, setOrderIdInput] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const loadData = async () => {
      try {
        const orders = await fetchOrders();
        setData(orders);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const totalOrders = data.length;
  const pendingOrders = data.filter((item) => item.status === 'Pending').length;
  const completeOrders = data.filter((item) => item.status === 'Delivered').length;
  const shippedOrders = data.filter((item) => item.status === 'Shipped').length;

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleFilterSelect = (value) => {
    setFilter(value);
    setIsFilterVisible(false);
  };

  const toggleAddress = (id) => {
    setVisibleAddressId(visibleAddressId === id ? null : id);
  };

  const displayedData = data.filter((item) => {
    const matchesSearchQuery = item.id.includes(searchQuery) || item.status.includes(searchQuery);
    const matchesFilter = filter === 'All' || item.status === filter;
    return matchesSearchQuery && matchesFilter;
  });

  const pendingOrdersData = data.filter((item) => item.status === 'Pending');

  const handleUpdateStatus = (orderId, newStatus) => {
    const updatedData = data.map((item) => 
      item.id === orderId ? { ...item, status: newStatus } : item
    );
    setData(updatedData);
    Alert.alert('Status Updated', `Order ${orderId} is now ${newStatus}`);
  };

  const handleOrderIdSubmit = () => {
    const order = data.find((item) => item.id === orderIdInput);
    if (order) {
      Alert.alert('Order Details', `ID: ${order.id}\nStatus: ${order.status}`);
    } else {
      Alert.alert('Error', 'Order not found');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#333" />
        <Text style={styles.loadingText}>Loading orders...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.screenTitle}>Order Management</Text>

      {/* Summary Statistics */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Orders</Text>
          <Text style={styles.statValue}>{totalOrders}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Pending</Text>
          <Text style={styles.statValue}>{pendingOrders}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Delivered</Text>
          <Text style={styles.statValue}>{completeOrders}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Shipped</Text>
          <Text style={styles.statValue}>{shippedOrders}</Text>
        </View>
      </View>

      {/* Order Status Update */}
      <View style={styles.orderUpdateContainer}>
        <Text style={styles.sectionTitle}>Update Order Status</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.orderInput}
            placeholder="Enter Order ID"
            placeholderTextColor="#666"
            value={orderIdInput}
            onChangeText={setOrderIdInput}
          />
        </View>
        <View style={styles.actionButtonContainer}>
          {['Pending', 'Shipped', 'Delivered'].map((status) => (
            <TouchableOpacity
              key={status}
              style={[styles.actionButton, styles[`${status.toLowerCase()}Button`]]}
              onPress={() => handleUpdateStatus(orderIdInput, status)}
            >
              <Text style={styles.actionButtonText}>Set {status}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search orders..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity onPress={toggleFilter} style={styles.filterButton}>
          <Icon name="filter-list" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
      <Modal
        transparent={true}
        visible={isFilterVisible}
        animationType="fade"
        onRequestClose={() => setIsFilterVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsFilterVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.filterModal}>
              {['All', 'Delivered', 'Pending', 'Shipped'].map((filterOption) => (
                <TouchableOpacity
                  key={filterOption}
                  style={styles.filterOption}
                  onPress={() => handleFilterSelect(filterOption)}
                >
                  <Text style={styles.filterOptionText}>{filterOption}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Orders List */}
      <View style={styles.orderListContainer}>
        <View style={styles.orderListHeader}>
          {['ID', 'Sub Total', 'Grand Total', 'Date', 'Status', 'Address'].map((header) => (
            <Text key={header} style={styles.orderListHeaderText}>{header}</Text>
          ))}
        </View>
        {displayedData.map((item) => (
          <View key={item.id} style={styles.orderListItem}>
            <Text style={styles.orderListCell}>{item.id}</Text>
            <Text style={styles.orderListCell}>${item.subTotal}</Text>
            <Text style={styles.orderListCell}>${item.grandTotal}</Text>
            <Text style={styles.orderListCell}>{item.orderDate}</Text>
            <Text style={[
              styles.orderListCell, 
              styles.statusCell, 
              item.status === 'Pending' && styles.pendingStatus,
              item.status === 'Shipped' && styles.shippedStatus,
              item.status === 'Delivered' && styles.deliveredStatus
            ]}>
              {item.status}
            </Text>
            <TouchableOpacity onPress={() => toggleAddress(item.id)} style={styles.orderListCell}>
              <Icon name="location-on" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Pending Orders */}
      <View style={styles.pendingOrdersContainer}>
        <Text style={styles.sectionTitle}>New Pending Orders</Text>
        {pendingOrdersData.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.pendingOrderCard}
            onPress={() => navigation.navigate('OrderDetailAdmin', { orderId: item.id })}
          >
            <View style={styles.pendingOrderContent}>
              <Text style={styles.pendingOrderText}>Order ID: {item.id}</Text>
              <Text style={styles.pendingOrderText}>Total: ${item.grandTotal}</Text>
              <Text style={styles.pendingOrderText}>Date: {item.orderDate}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 15,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'left',
    marginVertical: 20,
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '22%',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  orderUpdateContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  inputRow: {
    marginBottom: 15,
  },
  orderInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  pendingButton: { backgroundColor: '#FFC107' },
  shippedButton: { backgroundColor: '#2196F3' },
  deliveredButton: { backgroundColor: '#4CAF50' },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 14,
  },
  filterButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  filterModal: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },
  filterOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterOptionText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  orderListContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderListHeader: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTop: 10, },
    // ... (previous code remains the same)

  orderListHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    color: '#666',
    fontSize: 12,
  },
  orderListItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  orderListCell: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    color: '#333',
  },
  statusCell: {
    fontWeight: '600',
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  pendingStatus: {
    backgroundColor: '#FFC1074D',
    color: '#FFC107',
  },
  shippedStatus: {
    backgroundColor: '#2196F34D',
    color: '#2196F3',
  },
  deliveredStatus: {
    backgroundColor: '#4CAF504D',
    color: '#4CAF50',
  },
  pendingOrdersContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pendingOrderCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginVertical: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  pendingOrderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pendingOrderText: {
    fontSize: 12,
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
});

export default OrderAdminScreen;
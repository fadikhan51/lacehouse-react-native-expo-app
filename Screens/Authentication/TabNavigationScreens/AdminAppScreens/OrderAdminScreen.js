import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const fetchOrders = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', subTotal: '10.00', grandTotal: '10.00', orderDate: '2/25/25', status: 'Deliverd', deliveryAddress: 'Dr saima st, Afshan st, Lahore' },
        { id: '2', subTotal: '30.00', grandTotal: '32.00', orderDate: '2/20/25', status: 'Pending', deliveryAddress: 'Dr saima st, Afshan st, Lahore' },
        { id: '3', subTotal: '10.00', grandTotal: '10.00', orderDate: '2/21/25', status: 'Shipped', deliveryAddress: 'Dr saima st, Afshan st, Lahore' },
        { id: '4', subTotal: '15.00', grandTotal: '16.00', orderDate: '2/23/25', status: 'Deliverd', deliveryAddress: 'Dr saima st, Afshan st, Lahore' },
        { id: '5', subTotal: '15.00', grandTotal: '16.00', orderDate: '2/22/25', status: 'Pending', deliveryAddress: 'Dr saima st, Afshan st, Lahore' },
        { id: '6', subTotal: '15.00', grandTotal: '16.00', orderDate: '2/26/25', status: 'Shipped', deliveryAddress: 'Dr saima st, Afshan st, Lahore' },
        { id: '7', subTotal: '15.00', grandTotal: '16.00', orderDate: '2/26/25', status: 'Deliverd', deliveryAddress: 'Dr saima st, Afshan st, Lahore' },
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
  const completeOrders = data.filter((item) => item.status === 'Deliverd').length;
  const shippedOrders = data.filter((item) => item.status === 'Shipped').length;

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleFilterSelect = (value) => {
    setFilter(value);
    setIsFilterVisible(false);
  };

  const toggleAddress = (id) => {
    if (visibleAddressId === id) {
      setVisibleAddressId(null);
    } else {
      setVisibleAddressId(id);
    }
  };

  const displayedData = data.filter((item) => {
    const matchesSearchQuery = item.id.includes(searchQuery) || item.status.includes(searchQuery);
    const matchesFilter = filter === 'All' || item.status === filter;
    return matchesSearchQuery && matchesFilter;
  });

  const pendingOrdersData = data.filter((item) => item.status === 'Pending');

  const handleUpdateStatus = (orderId, newStatus) => {
    const updatedData = data.map((item) => {
      if (item.id === orderId) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    setData(updatedData);
    Alert.alert('Success', `Order ${orderId} status updated to ${newStatus}`);
  };

  const handleOrderIdSubmit = () => {
    const order = data.find((item) => item.id === orderIdInput);
    if (order) {
      Alert.alert('Order Found', `Order ID: ${order.id}, Status: ${order.status}`);
    } else {
      Alert.alert('Error', 'Order not found');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading orders...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.screenName}>Order Screen</Text>

      {/* Summary Box */}
      <View style={styles.summaryBox}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Orders</Text>
          <Text style={styles.summaryValue}>{totalOrders}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Pending Orders</Text>
          <Text style={styles.summaryValue}>{pendingOrders}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Delivered Orders</Text>
          <Text style={styles.summaryValue}>{completeOrders}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Shipped Orders</Text>
          <Text style={styles.summaryValue}>{shippedOrders}</Text>
        </View>
      </View>

      {/* Order ID Input and Status Update Box */}
      <View style={styles.orderIdBox}>
        <Text style={styles.orderIdTitle}>Update Order Status</Text>
        <TextInput
          style={styles.orderIdInput}
          placeholder="Enter Order ID"
          value={orderIdInput}
          onChangeText={setOrderIdInput}
        />
        <View style={styles.statusButtonsContainer}>
          <TouchableOpacity
            style={[styles.statusButton, styles.pendingButton]}
            onPress={() => handleUpdateStatus(orderIdInput, 'Pending')}
          >
            <Text style={styles.statusButtonText}>Set Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statusButton, styles.shippedButton]}
            onPress={() => handleUpdateStatus(orderIdInput, 'Shipped')}
          >
            <Text style={styles.statusButtonText}>Set Shipped</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statusButton, styles.deliveredButton]}
            onPress={() => handleUpdateStatus(orderIdInput, 'Deliverd')}
          >
            <Text style={styles.statusButtonText}>Set Delivered</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search and Filter Section */}
      <View style={styles.searchFilterContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={toggleFilter} style={styles.filterIcon}>
          <Icon name="filter-list" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
      <Modal
        visible={isFilterVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsFilterVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsFilterVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.filterDropdown}>
              <TouchableOpacity onPress={() => handleFilterSelect('All')} style={styles.filterOption}>
                <Text style={styles.filterOptionText}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleFilterSelect('Deliverd')} style={styles.filterOption}>
                <Text style={styles.filterOptionText}>Delivered</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleFilterSelect('Pending')} style={styles.filterOption}>
                <Text style={styles.filterOptionText}>Pending</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleFilterSelect('Shipped')} style={styles.filterOption}>
                <Text style={styles.filterOptionText}>Shipped</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Orders Table */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>ID</Text>
        <Text style={styles.headerCell}>Sub Total</Text>
        <Text style={styles.headerCell}>Grand Total</Text>
        <Text style={styles.headerCell}>Order Date</Text>
        <Text style={styles.headerCell}>Status</Text>
        <Text style={styles.headerCell}>Delivery Address</Text>
      </View>

      {displayedData.map((item) => (
        <View key={item.id}>
          <View style={styles.tableRow}>
            <Text style={styles.cell}>{item.id}</Text>
            <Text style={styles.cell}>{item.subTotal}</Text>
            <Text style={styles.cell}>{item.grandTotal}</Text>
            <Text style={styles.cell}>{item.orderDate}</Text>
            <Text style={[styles.cell, styles.statusCell]}>{item.status}</Text>
            <TouchableOpacity onPress={() => toggleAddress(item.id)} style={styles.cell}>
              <Icon name="location-on" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {visibleAddressId === item.id && (
            <View style={styles.addressContainer}>
              <Text style={styles.addressText}>{item.deliveryAddress}</Text>
            </View>
          )}
        </View>
      ))}

      {/* New Orders Box */}
      <View style={styles.newOrdersBox}>
        <Text style={styles.newOrdersTitle}>New Orders (Pending)</Text>
        {pendingOrdersData.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => navigation.navigate('OrderDetailAdmin', { orderId: item.id })}>
            <View style={styles.newOrderItem}>
              <Text style={styles.newOrderText}>Order ID: {item.id}</Text>
              <Text style={styles.newOrderText}>Sub Total: {item.subTotal}</Text>
              <Text style={styles.newOrderText}>Grand Total: {item.grandTotal}</Text>
              <Text style={styles.newOrderText}>Order Date: {item.orderDate}</Text>
              <Text style={styles.newOrderText}>Delivery Address: {item.deliveryAddress}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#f5f5f5',
  },
  screenName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
    color: '#333',
  },
  summaryBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  orderIdBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderIdTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  orderIdInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  statusButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusButton: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  pendingButton: {
    backgroundColor: '#ffcc00',
  },
  shippedButton: {
    backgroundColor: '#00ccff',
  },
  deliveredButton: {
    backgroundColor: '#00cc66',
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  newOrdersBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newOrdersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  newOrderItem: {
    padding: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#000',
  },
  newOrderText: {
    fontSize: 14,
    color: '#000',
  },
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginRight: 20,
  },
  filterIcon: {
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  filterDropdown: {
    width: '90%',
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 20,
  },
  filterOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 3,
    borderBottomColor: '#ccc',
    paddingVertical: 20,
    backgroundColor: '#000',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 3,
    borderBottomColor: '#eee',
    paddingVertical: 10,
    backgroundColor: '#000',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
    color: '#fff',
  },
  statusCell: {
    overflow: 'hidden',
  },
  addressContainer: {
    padding: 8,
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  addressText: {
    textAlign: 'center',
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderAdminScreen;
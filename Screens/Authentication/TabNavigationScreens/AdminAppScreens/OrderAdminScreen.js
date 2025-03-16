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
        { id: '8', subTotal: '20.00', grandTotal: '22.00', orderDate: '2/24/25', status: 'Cancelled', deliveryAddress: 'Dr saima st, Afshan st, Lahore' },
        { id: '9', subTotal: '25.00', grandTotal: '27.00', orderDate: '2/28/25', status: 'Reversed', deliveryAddress: 'Dr saima st, Afshan st, Lahore' },
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
  const cancelledOrders = data.filter((item) => item.status === 'Cancelled').length;
  const reversedOrders = data.filter((item) => item.status === 'Reversed').length;

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
  const cancelledOrdersData = data.filter((item) => item.status === 'Cancelled');
  const reversedOrdersData = data.filter((item) => item.status === 'Reversed');

  const handleUpdateStatus = (orderId, newStatus) => {
    // Validate order ID
    if (!orderId.trim()) {
      Alert.alert('Error', 'Please enter a valid Order ID');
      return;
    }

    // Check if order exists
    const order = data.find((item) => item.id === orderId);
    if (!order) {
      Alert.alert('Error', 'Order not found');
      return;
    }

    // Apply status transition rules
    const currentStatus = order.status;

    // Check if the transition is allowed
    if (newStatus === 'Cancelled' && currentStatus !== 'Pending') {
      Alert.alert('Error', 'Only pending orders can be cancelled');
      return;
    }
    
    if (newStatus === 'Shipped' && currentStatus !== 'Pending') {
      Alert.alert('Error', 'Only pending orders can be shipped');
      return;
    }
    
    if (newStatus === 'Delivered' && currentStatus !== 'Shipped') {
      Alert.alert('Error', 'Only shipped orders can be delivered');
      return;
    }

    if (newStatus === 'Reversed' && currentStatus !== 'Shipped') {
      Alert.alert('Error', 'Only shipped orders can be reversed');
      return;
    }

    // If reached here, update is allowed
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

  const navigateToOrderDetail = (orderId) => {
    navigation.navigate('OrderDetailAdmin', { orderId });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#333" />
        <Text style={styles.loadingText}>Loading orders...</Text>
      </View>
    );
  }

  const getOrderStatus = (orderId) => {
    const order = data.find(item => item.id === orderId);
    return order ? order.status : null;
  };

  // Determine which buttons should be disabled based on current order status
  const orderStatus = getOrderStatus(orderIdInput);
  const canSetPending = false; // Can't manually set to pending
  const canShip = orderStatus === 'Pending';
  const canDeliver = orderStatus === 'Shipped';
  const canCancel = orderStatus === 'Pending';
  const canReverse = orderStatus === 'Shipped';

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.screenTitle}>Order Management</Text>

      {/* Summary Statistics - Added Reversed orders stat */}
      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total</Text>
            <Text style={styles.statValue}>{totalOrders}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Pending</Text>
            <Text style={styles.statValue}>{pendingOrders}</Text>
          </View>
        </View>
        
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Shipped</Text>
            <Text style={styles.statValue}>{shippedOrders}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Delivered</Text>
            <Text style={styles.statValue}>{completeOrders}</Text>
          </View>
        </View>
        
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Cancelled</Text>
            <Text style={styles.statValue}>{cancelledOrders}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Reversed</Text>
            <Text style={styles.statValue}>{reversedOrders}</Text>
          </View>
        </View>
      </View>

      {/* Order Status Update - Added Reversed button */}
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
        {orderIdInput.trim() !== "" && orderStatus && (
          <Text style={styles.currentStatusText}>
            Current Status: <Text style={styles.statusHighlight}>{orderStatus}</Text>
          </Text>
        )}
        <View style={styles.actionButtonRows}>
          <View style={styles.actionButtonRow}>
            <TouchableOpacity
              style={[
                styles.actionButton, 
                styles.pendingButton,
                !canSetPending && styles.disabledButton
              ]}
              disabled={!canSetPending}
              onPress={() => handleUpdateStatus(orderIdInput, 'Pending')}
            >
              <Text style={styles.actionButtonText}>Set Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionButton, 
                styles.shippedButton,
                !canShip && styles.disabledButton
              ]}
              disabled={!canShip}
              onPress={() => handleUpdateStatus(orderIdInput, 'Shipped')}
            >
              <Text style={styles.actionButtonText}>Set Shipped</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actionButtonRow}>
            <TouchableOpacity
              style={[
                styles.actionButton, 
                styles.deliveredButton,
                !canDeliver && styles.disabledButton
              ]}
              disabled={!canDeliver}
              onPress={() => handleUpdateStatus(orderIdInput, 'Delivered')}
            >
              <Text style={styles.actionButtonText}>Set Delivered</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionButton, 
                styles.cancelledButton,
                !canCancel && styles.disabledButton
              ]}
              disabled={!canCancel}
              onPress={() => handleUpdateStatus(orderIdInput, 'Cancelled')}
            >
              <Text style={styles.actionButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actionButtonRow}>
            <TouchableOpacity
              style={[
                styles.actionButton, 
                styles.reversedButton,
                !canReverse && styles.disabledButton
              ]}
              disabled={!canReverse}
              onPress={() => handleUpdateStatus(orderIdInput, 'Reversed')}
            >
              <Text style={styles.actionButtonText}>Reverse Order</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.statusFlowNote}>
          Status Flow: Pending → Shipped → Delivered | Pending → Cancelled | Shipped → Reversed
        </Text>
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

      {/* Filter Modal - Added Reversed filter option */}
      <Modal
        transparent={true}
        visible={isFilterVisible}
        animationType="fade"
        onRequestClose={() => setIsFilterVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsFilterVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.filterModal}>
              {['All', 'Delivered', 'Pending', 'Shipped', 'Cancelled', 'Reversed'].map((filterOption) => (
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
          <TouchableOpacity 
            key={item.id} 
            style={styles.orderListItem}
            onPress={() => navigateToOrderDetail(item.id)}
          >
            <Text style={styles.orderListCell}>{item.id}</Text>
            <Text style={styles.orderListCell}>${item.subTotal}</Text>
            <Text style={styles.orderListCell}>${item.grandTotal}</Text>
            <Text style={styles.orderListCell}>{item.orderDate}</Text>
            <Text style={[
              styles.orderListCell, 
              styles.statusCell, 
              item.status === 'Pending' && styles.pendingStatus,
              item.status === 'Shipped' && styles.shippedStatus,
              item.status === 'Delivered' && styles.deliveredStatus,
              item.status === 'Cancelled' && styles.cancelledStatus,
              item.status === 'Reversed' && styles.reversedStatus
            ]}>
              {item.status}
            </Text>
            <TouchableOpacity 
              onPress={(e) => {
                e.stopPropagation();
                toggleAddress(item.id);
              }} 
              style={styles.orderListCell}
            >
              <Icon name="location-on" size={20} color="#333" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      {/* Pending Orders */}
      <View style={styles.pendingOrdersContainer}>
        <Text style={styles.sectionTitle}>New Pending Orders</Text>
        {pendingOrdersData.length > 0 ? (
          pendingOrdersData.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.pendingOrderCard}
              onPress={() => navigateToOrderDetail(item.id)}
            >
              <View style={styles.pendingOrderContent}>
                <Text style={styles.pendingOrderText}>Order ID: {item.id}</Text>
                <Text style={styles.pendingOrderText}>Total: ${item.grandTotal}</Text>
                <Text style={styles.pendingOrderText}>Date: {item.orderDate}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyStateText}>No pending orders</Text>
        )}
      </View>

      {/* Cancelled Orders */}
      <View style={styles.cancelledOrdersContainer}>
        <Text style={styles.sectionTitle}>Recently Cancelled Orders</Text>
        {cancelledOrdersData.length > 0 ? (
          cancelledOrdersData.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.cancelledOrderCard}
              onPress={() => navigateToOrderDetail(item.id)}
            >
              <View style={styles.cancelledOrderContent}>
                <Text style={styles.cancelledOrderText}>Order ID: {item.id}</Text>
                <Text style={styles.cancelledOrderText}>Total: ${item.grandTotal}</Text>
                <Text style={styles.cancelledOrderText}>Date: {item.orderDate}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyStateText}>No cancelled orders</Text>
        )}
      </View>

      {/* Reversed Orders - New section */}
      <View style={styles.reversedOrdersContainer}>
        <Text style={styles.sectionTitle}>Reversed Orders</Text>
        {reversedOrdersData.length > 0 ? (
          reversedOrdersData.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.reversedOrderCard}
              onPress={() => navigateToOrderDetail(item.id)}
            >
              <View style={styles.reversedOrderContent}>
                <Text style={styles.reversedOrderText}>Order ID: {item.id}</Text>
                <Text style={styles.reversedOrderText}>Total: ${item.grandTotal}</Text>
                <Text style={styles.reversedOrderText}>Date: {item.orderDate}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyStateText}>No reversed orders</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 15,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'left',
    marginVertical: 20,
    color: '#000',
  },
  statsContainer: {
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    width: '48%', // Two cards per row with some margin
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  orderUpdateContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: '#000',
  },
  inputRow: {
    marginBottom: 15,
  },
  orderInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#fafafa',
  },
  currentStatusText: {
    marginBottom: 10,
    fontSize: 14,
    color: '#666',
  },
  statusHighlight: {
    fontWeight: '600',
    color: '#000',
  },
  statusFlowNote: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  actionButtonRows: {
    marginVertical: 5,
  },
  actionButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  actionButton: {
    width: '48%',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  // Updated colors with professional tones and added reversed button
  pendingButton: { backgroundColor: '#4A90E2' }, // Professional blue
  shippedButton: { backgroundColor: '#F5A623' }, // Professional orange
  deliveredButton: { backgroundColor: '#9B51E0' }, // Professional purple
  cancelledButton: { backgroundColor: '#D0021B' }, // Professional red
  reversedButton: { backgroundColor: '#008080', width: '100%' }, // Professional teal
  disabledButton: {
    backgroundColor: '#cccccc',
    opacity: 0.7,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
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
    borderRadius: 8,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 14,
    color: '#000',
  },
  filterButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
    borderRadius: 8,
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
    color: '#000',
  },
  orderListContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  orderListHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  orderListHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    color: '#000',
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
    color: '#000',
  },
  statusCell: {
    fontWeight: '600',
    fontSize: 11,
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  // Status colors with professional colors and added reversed status
  pendingStatus: {
    backgroundColor: '#E3F2FD', // Light blue
    color: '#4A90E2', // Professional blue for text
  },
  shippedStatus: {
    backgroundColor: '#FFF3E0', // Light orange
    color: '#F5A623', // Professional orange for text
  },
  deliveredStatus: {
    backgroundColor: '#F3E5F5', // Light purple
    color: '#9B51E0', // Professional purple for text
  },
  cancelledStatus: {
    backgroundColor: '#FFEBEE', // Light red
    color: '#D0021B', // Professional red for text
  },
  reversedStatus: {
    backgroundColor: '#E0F2F1', // Light teal
    color: '#008080', // Professional teal for text
  },
  pendingOrdersContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pendingOrderCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    padding: 12,
    marginVertical: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#00BCD4', // Cyan for pending
  },
  pendingOrderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pendingOrderText: {
    fontSize: 12,
    color: '#000',
  },
  cancelledOrdersContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cancelledOrderCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    padding: 12,
    marginVertical: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#D32F2F', // Red for cancelled
  },
  cancelledOrderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelledOrderText: {
    fontSize: 12,
    color: '#000',
  },
  // Added styles for Reversed Orders section
  reversedOrdersContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reversedOrderCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    padding: 12,
    marginVertical: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#008080', // Teal for reversed
  },
  reversedOrderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reversedOrderText: {
    fontSize: 12,
    color: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  loadingText: {
    marginTop: 10,
    color: '#000',
  },
  emptyStateText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 10,
    fontStyle: 'italic',
  },
});

export default OrderAdminScreen;
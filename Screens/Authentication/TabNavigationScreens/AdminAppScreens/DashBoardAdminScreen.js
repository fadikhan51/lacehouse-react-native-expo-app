import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, FlatList, TextInput, Image } from 'react-native';
import images from '../../../../Constants/images';

const DashBoardAdminScreen = () => {
  // Example sales data
  const totalSales = 12000;
  const dailySales = 1500;
  const monthlySales = 45000;
  const yearlySales = 540000;

  // Example user data
  const totalUsers = 500;
  const dailyUsers = 10;
  const monthlyUsers = 150;
  const yearlyUsers = 1800;

  // State for modal visibility and selected month/year
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedYear, setSelectedYear] = useState('2023');
  const [showAllDays, setShowAllDays] = useState(false);

  // Data for months and years
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const years = ['2021', '2022', '2023', '2024', '2025'];

  // Function to generate mock daily sales data for the selected month
  const generateDailySales = (month) => {
    const daysInMonth = new Date(2023, months.indexOf(month) + 1, 0).getDate();
    const dailySalesData = [];
    for (let day = 1; day <= daysInMonth; day++) {
      dailySalesData.push({
        day: day,
        sales: Math.floor(Math.random() * 1000) + 500, // Random sales data for demonstration
      });
    }
    return dailySalesData;
  };

  // State for daily sales data
  const [dailySalesData, setDailySalesData] = useState(generateDailySales('January'));

  // Function to handle month/year selection
  const handleSelect = (type, value) => {
    if (type === 'month') {
      setSelectedMonth(value);
      setDailySalesData(generateDailySales(value)); // Update daily sales data for the selected month
    } else if (type === 'year') {
      setSelectedYear(value);
    }
    setIsModalVisible(false); // Close the modal after selection
  };

  // Function to toggle showing all days
  const toggleShowAllDays = () => {
    setShowAllDays(!showAllDays);
  };

  // Determine how many days to show
  const displayedDays = showAllDays ? dailySalesData : dailySalesData.slice(0, 2);

  // State for order number and product quantity
  const [orderNo, setOrderNo] = useState('');
  const [productQuantity, setProductQuantity] = useState(null);

  // State for month selection modal visibility
  const [isMonthModalVisible, setIsMonthModalVisible] = useState(false);

  // State for daily sales data for the selected month in the order breakdown
  const [orderDailySalesData, setOrderDailySalesData] = useState([]);

  // State to control visibility of the daily sales list in "Total Items Sold for Order ID"
  const [showDailySalesList, setShowDailySalesList] = useState(false);

  // Function to handle order number search
  const handleOrderSearch = () => {
    const mockProductQuantity = Math.floor(Math.random() * 100) + 1; // Random quantity for demonstration
    setProductQuantity(mockProductQuantity);
    setIsMonthModalVisible(true);
  };

  // Function to handle month selection for order breakdown
  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setIsMonthModalVisible(false);

    // Generate mock daily sales data for the selected month
    const daysInMonth = new Date(2023, months.indexOf(month) + 1, 0).getDate();
    const dailySalesData = [];
    for (let day = 1; day <= daysInMonth; day++) {
      dailySalesData.push({
        day: day,
        sales: Math.floor(Math.random() * 100) + 10, // Random sales data for demonstration
      });
    }
    setOrderDailySalesData(dailySalesData); // Update daily sales data for the selected month
    setShowDailySalesList(true); // Show the daily sales list
  };

  // Function to close the daily sales list
  const closeDailySalesList = () => {
    setShowDailySalesList(false);
  };

  // Mock data for hottest selling products
  const hottestSellingProducts = [
    { id: 1, name: 'Wireless Bluetooth Earbuds', sales: 1200, image: images.bag1 },
    { id: 2, name: 'Smartwatch Pro', sales: 950, image: images.bag1 },
    { id: 3, name: 'Noise-Cancelling Headphones', sales: 800, image: images.bag1 },
    { id: 4, name: 'Portable Bluetooth Speaker', sales: 700, image: images.bag1 },
  ];

  // State to control how many products are shown
  const [showAllProducts, setShowAllProducts] = useState(false);

  // Determine how many products to show
  const displayedProducts = showAllProducts ? hottestSellingProducts : hottestSellingProducts.slice(0, 2);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Dashboard Title */}
      <Text style={styles.dashboardTitle}>Dashboard</Text>

      {/* Sales Breakdown Box */}
      <View style={styles.salesBreakdownBox}>
        {/* Total Sales Box */}
        <View style={styles.totalSalesBox}>
          <Text style={styles.salesLabel}>Total Sales</Text>
          <Text style={styles.salesAmount}>${totalSales.toLocaleString()}</Text>
        </View>

        <Text style={styles.breakdownTitle}>Sales Breakdown</Text>

        {/* Button to open modal */}
        <TouchableOpacity style={styles.selectButton} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.selectButtonText}>Select Month/Year</Text>
        </TouchableOpacity>

        {/* Display selected month and year */}
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedText}>Selected Month: {selectedMonth}</Text>
          <Text style={styles.selectedText}>Selected Year: {selectedYear}</Text>
        </View>

        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Today:</Text>
          <Text style={styles.breakdownValue}>${dailySales.toLocaleString()}</Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>This Month:</Text>
          <Text style={styles.breakdownValue}>${monthlySales.toLocaleString()}</Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>This Year:</Text>
          <Text style={styles.breakdownValue}>${yearlySales.toLocaleString()}</Text>
        </View>

        {/* Daily Sales Section */}
        <Text style={styles.dailySalesTitle}>Daily Sales for {selectedMonth}</Text>
        <FlatList
          data={displayedDays}
          keyExtractor={(item) => item.day.toString()}
          renderItem={({ item }) => (
            <View style={styles.dailySalesItem}>
              <Text style={styles.dailySalesDay}>Day {item.day}</Text>
              <Text style={styles.dailySalesAmount}>${item.sales.toLocaleString()}</Text>
            </View>
          )}
          scrollEnabled={false} // Disable scrolling for this FlatList
        />

        {/* Show More Button */}
        {dailySalesData.length > 2 && (
          <TouchableOpacity style={styles.showMoreButton} onPress={toggleShowAllDays}>
            <Text style={styles.showMoreButtonText}>
              {showAllDays ? 'Show Less' : 'Show More'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Combined Users Box */}
      <View style={styles.usersBox}>
        {/* Total Users Section */}
        <View style={styles.totalUsersSection}>
          <Text style={styles.usersLabel}>Total Users</Text>
          <Text style={styles.usersAmount}>{totalUsers.toLocaleString()}</Text>
        </View>

        {/* Users Breakdown Section */}
        <Text style={styles.breakdownTitle}>Users Breakdown</Text>

        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Today:</Text>
          <Text style={styles.breakdownValue}>{dailyUsers.toLocaleString()}</Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>This Month:</Text>
          <Text style={styles.breakdownValue}>{monthlyUsers.toLocaleString()}</Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>This Year:</Text>
          <Text style={styles.breakdownValue}>{yearlyUsers.toLocaleString()}</Text>
        </View>
      </View>

      {/* Product Quantity Box */}
      <View style={styles.productQuantityBox}>
        <Text style={styles.productQuantityTitle}>Check Product Quantity by Order No</Text>
        <TextInput
          style={styles.orderNoInput}
          placeholder="Enter Order No"
          value={orderNo}
          onChangeText={setOrderNo}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleOrderSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
        {productQuantity !== null && (
          <Text style={styles.productQuantityText}>
            Product Quantity: {productQuantity}
          </Text>
        )}
      </View>

      {/* New Box: Total Items Sold for Order ID */}
      <View style={styles.orderBreakdownBox}>
        <Text style={styles.orderBreakdownTitle}>Total Items Sold for Order ID</Text>
        <TextInput
          style={styles.orderNoInput}
          placeholder="Enter Order No"
          value={orderNo}
          onChangeText={setOrderNo}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleOrderSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

        {/* Display daily sales data for the selected month */}
        {showDailySalesList && (
          <View>
            <Text style={styles.dailySalesTitle}>Daily Sales for {selectedMonth}</Text>
            <FlatList
              data={orderDailySalesData}
              keyExtractor={(item) => item.day.toString()}
              renderItem={({ item }) => (
                <View style={styles.dailySalesItem}>
                  <Text style={styles.dailySalesDay}>Day {item.day}</Text>
                  <Text style={styles.dailySalesAmount}>Quantity Sold: {item.sales}</Text>
                </View>
              )}
              scrollEnabled={false} // Disable scrolling for this FlatList
            />
            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={closeDailySalesList}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Hottest Selling Products Box */}
      <View style={styles.hottestProductBox}>
        <Text style={styles.hottestProductTitle}>Hottest Selling Products</Text>
        <FlatList
          data={displayedProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.hottestProductContent}>
              <Image
                source={item.image}
                style={styles.hottestProductImage}
              />
              <View style={styles.hottestProductDetails}>
                <Text style={styles.hottestProductName}>{item.name}</Text>
                <Text style={styles.hottestProductSales}>
                  Total Sales: {item.sales.toLocaleString()}
                </Text>
              </View>
            </View>
          )}
          scrollEnabled={false} // Disable scrolling for this FlatList
        />
        {/* Show More Button */}
        {hottestSellingProducts.length > 2 && (
          <TouchableOpacity
            style={styles.showMoreButton}
            onPress={() => setShowAllProducts(!showAllProducts)}
          >
            <Text style={styles.showMoreButtonText}>
              {showAllProducts ? 'Show Less' : 'Show More'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Modal for selecting month and year */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Month and Year</Text>

            {/* Month and Year Selection in the same row */}
            <View style={styles.rowContainer}>
              {/* Month Selection */}
              <View style={styles.listContainer}>
                <Text style={styles.modalSubtitle}>Month</Text>
                <FlatList
                  data={months}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.listItem}
                      onPress={() => handleSelect('month', item)}
                    >
                      <Text style={styles.listItemText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>

              {/* Year Selection */}
              <View style={styles.listContainer}>
                <Text style={styles.modalSubtitle}>Year</Text>
                <FlatList
                  data={years}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.listItem}
                      onPress={() => handleSelect('year', item)}
                    >
                      <Text style={styles.listItemText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for selecting month for order breakdown */}
      <Modal visible={isMonthModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Month</Text>

            {/* Month Selection */}
            <FlatList
              data={months}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => handleMonthSelect(item)}
                >
                  <Text style={styles.listItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsMonthModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  dashboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  totalSalesBox: {
    width: '100%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 20,
  },
  salesLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  salesAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 10,
  },
  usersBox: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 30,
  },
  totalUsersSection: {
    marginBottom: 20,
  },
  usersLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  usersAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginTop: 10,
  },
  salesBreakdownBox: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 20,
  },
  breakdownTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  breakdownLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  breakdownValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  selectButton: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedContainer: {
    marginBottom: 15,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  dailySalesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  dailySalesItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 3,
    borderBottomColor: '#000',
  },
  dailySalesDay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  dailySalesAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  showMoreButton: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  showMoreButtonText: {
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
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  listContainer: {
    width: '48%',
  },
  listItem: {
    padding: 5,
    backgroundColor: '#000',
    borderRadius: 20,
    margin: 5,
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 14,
    color: '#fff',
  },
  closeButton: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productQuantityBox: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 30,
  },
  productQuantityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  orderNoInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    marginBottom: 15,
  },
  searchButton: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 20,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productQuantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 15,
  },
  orderBreakdownBox: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 30,
  },
  orderBreakdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  breakdownContainer: {
    marginTop: 15,
  },
  breakdownText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 5,
  },
  hottestProductBox: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 30,
  },
  hottestProductTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  hottestProductContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  hottestProductImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: 15,
  },
  hottestProductDetails: {
    flex: 1,
  },
  hottestProductName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  hottestProductSales: {
    fontSize: 14,
    color: '#4CAF50',
  },
});

export default DashBoardAdminScreen;
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

  // Render a card component
  const Card = ({ children, style }) => (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );

  // Render a metric component
  const Metric = ({ label, value, valueStyle }) => (
    <View style={styles.metricContainer}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricValue, valueStyle]}>{value}</Text>
    </View>
  );

  // Render a button component
  const Button = ({ title, onPress, style }) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dashboard</Text>
        </View>

        {/* Overview Stats Row */}
        <View style={styles.statsRow}>
          <Card style={styles.halfCard}>
            <Metric 
              label="Total Sales" 
              value={`$${totalSales.toLocaleString()}`} 
              valueStyle={styles.salesValue}
            />
          </Card>
          
          <Card style={styles.halfCard}>
            <Metric 
              label="Total Users" 
              value={totalUsers.toLocaleString()} 
              valueStyle={styles.usersValue}
            />
          </Card>
        </View>
        
        {/* Sales Section */}
        <Card>
          <Text style={styles.sectionTitle}>Sales Breakdown</Text>
          
          <View style={styles.periodSelector}>
            <Text style={styles.periodText}>{selectedMonth} {selectedYear}</Text>
            <Button title="Change" onPress={() => setIsModalVisible(true)} />
          </View>
          
          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <Text style={styles.metricItemLabel}>Today</Text>
              <Text style={styles.metricItemValue}>${dailySales.toLocaleString()}</Text>
            </View>
            
            <View style={styles.metricItem}>
              <Text style={styles.metricItemLabel}>This Month</Text>
              <Text style={styles.metricItemValue}>${monthlySales.toLocaleString()}</Text>
            </View>
            
            <View style={styles.metricItem}>
              <Text style={styles.metricItemLabel}>This Year</Text>
              <Text style={styles.metricItemValue}>${yearlySales.toLocaleString()}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <Text style={styles.subsectionTitle}>Daily Sales for {selectedMonth}</Text>
          
          {displayedDays.map((item) => (
            <View key={item.day} style={styles.dataRow}>
              <Text style={styles.dataLabel}>Day {item.day}</Text>
              <Text style={styles.dataValue}>${item.sales.toLocaleString()}</Text>
            </View>
          ))}
          
          {dailySalesData.length > 2 && (
            <TouchableOpacity style={styles.textButton} onPress={toggleShowAllDays}>
              <Text style={styles.textButtonText}>
                {showAllDays ? 'Show Less' : 'Show More'}
              </Text>
            </TouchableOpacity>
          )}
        </Card>
        
        {/* Users Section */}
        <Card>
          <Text style={styles.sectionTitle}>Users Breakdown</Text>
          
          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <Text style={styles.metricItemLabel}>Today</Text>
              <Text style={styles.metricItemValue}>{dailyUsers.toLocaleString()}</Text>
            </View>
            
            <View style={styles.metricItem}>
              <Text style={styles.metricItemLabel}>This Month</Text>
              <Text style={styles.metricItemValue}>{monthlyUsers.toLocaleString()}</Text>
            </View>
            
            <View style={styles.metricItem}>
              <Text style={styles.metricItemLabel}>This Year</Text>
              <Text style={styles.metricItemValue}>{yearlyUsers.toLocaleString()}</Text>
            </View>
          </View>
        </Card>
        
        {/* Product Quantity Check */}
        <Card>
          <Text style={styles.sectionTitle}>Check Product Quantity</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Enter Order No"
            placeholderTextColor="#999"
            value={orderNo}
            onChangeText={setOrderNo}
            keyboardType="numeric"
          />
          
          <Button title="Search" onPress={handleOrderSearch} />
          
          {productQuantity !== null && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>
                Product Quantity: <Text style={styles.highlightText}>{productQuantity}</Text>
              </Text>
            </View>
          )}
        </Card>
        
        {/* Total Items Sold for Order ID */}
        <Card>
          <Text style={styles.sectionTitle}>Total Items Sold for Order ID</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Enter Order No"
            placeholderTextColor="#999"
            value={orderNo}
            onChangeText={setOrderNo}
            keyboardType="numeric"
          />
          
          <Button title="Search" onPress={handleOrderSearch} />
          
          {showDailySalesList && (
            <View style={styles.resultContainer}>
              <Text style={styles.subsectionTitle}>Daily Sales for {selectedMonth}</Text>
              
              {orderDailySalesData.map((item) => (
                <View key={item.day} style={styles.dataRow}>
                  <Text style={styles.dataLabel}>Day {item.day}</Text>
                  <Text style={styles.dataValue}>Quantity: {item.sales}</Text>
                </View>
              ))}
              
              <TouchableOpacity style={styles.textButton} onPress={closeDailySalesList}>
                <Text style={styles.textButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </Card>
        
        {/* Hottest Selling Products */}
        <Card>
          <Text style={styles.sectionTitle}>Hottest Selling Products</Text>
          
          {displayedProducts.map((product) => (
            <View key={product.id} style={styles.productRow}>
              <Image
                source={product.image}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productSales}>
                  Total Sales: {product.sales.toLocaleString()}
                </Text>
              </View>
            </View>
          ))}
          
          {hottestSellingProducts.length > 2 && (
            <TouchableOpacity 
              style={styles.textButton} 
              onPress={() => setShowAllProducts(!showAllProducts)}
            >
              <Text style={styles.textButtonText}>
                {showAllProducts ? 'Show Less' : 'Show More'}
              </Text>
            </TouchableOpacity>
          )}
        </Card>
      </View>
        
      {/* Modal for selecting month and year */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Period</Text>
            
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Month</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsContainer}>
                {months.map((month) => (
                  <TouchableOpacity
                    key={month}
                    style={[
                      styles.optionButton,
                      selectedMonth === month && styles.selectedOption
                    ]}
                    onPress={() => handleSelect('month', month)}
                  >
                    <Text style={[
                      styles.optionText,
                      selectedMonth === month && styles.selectedOptionText
                    ]}>
                      {month}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            
            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Year</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsContainer}>
                {years.map((year) => (
                  <TouchableOpacity
                    key={year}
                    style={[
                      styles.optionButton,
                      selectedYear === year && styles.selectedOption
                    ]}
                    onPress={() => handleSelect('year', year)}
                  >
                    <Text style={[
                      styles.optionText,
                      selectedYear === year && styles.selectedOptionText
                    ]}>
                      {year}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            
            <Button 
              title="Close" 
              onPress={() => setIsModalVisible(false)} 
              style={styles.modalCloseButton}
            />
          </View>
        </View>
      </Modal>

      {/* Modal for selecting month for order breakdown */}
      <Modal visible={isMonthModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Month</Text>
            
            <FlatList
              data={months}
              keyExtractor={(item) => item}
              style={styles.monthList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.monthItem,
                    selectedMonth === item && styles.selectedMonth
                  ]}
                  onPress={() => handleMonthSelect(item)}
                >
                  <Text style={[
                    styles.monthItemText,
                    selectedMonth === item && styles.selectedMonthText
                  ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
            
            <Button 
              title="Cancel" 
              onPress={() => setIsMonthModalVisible(false)} 
              style={styles.modalCloseButton}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  header: {
    marginVertical: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  halfCard: {
    width: '48%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginVertical: 12,
  },
  metricContainer: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  salesValue: {
    color: '#000',
  },
  usersValue: {
    color: '#000',
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  periodText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  metricItem: {
    width: '33.33%',
    marginBottom: 16,
  },
  metricItemLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  metricItemValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dataLabel: {
    fontSize: 14,
    color: '#333',
  },
  dataValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  textButton: {
    alignSelf: 'center',
    marginTop: 12,
  },
  textButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#000',
  },
  resultContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  resultText: {
    fontSize: 16,
    color: '#333',
  },
  highlightText: {
    fontWeight: '600',
    color: '#000',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  productSales: {
    fontSize: 14,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalSection: {
    marginBottom: 16,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedOption: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  optionText: {
    color: '#333',
    fontSize: 14,
  },
  selectedOptionText: {
    color: '#fff',
  },
  modalCloseButton: {
    marginTop: 8,
  },
  monthList: {
    maxHeight: 300,
  },
  monthItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedMonth: {
    backgroundColor: '#f5f5f5',
  },
  monthItemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedMonthText: {
    fontWeight: '600',
    color: '#000',
  },
});

export default DashBoardAdminScreen;
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StockInventoryScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Categories for the dropdown filter
  const categories = ['All', 'Clothing', 'Electronics', 'Home Decor'];

  // Dummy data for demonstration
  const dummyProducts = [
    {
      id: '1',
      name: 'Product 1',
      price: 29.99,
      category: 'Clothing',
      isSold: false,
      colorOptions: [
        { color: 'Red', quantity: 5, image: 'https://via.placeholder.com/150' },
        { color: 'Blue', quantity: 3, image: 'https://via.placeholder.com/150' },
      ],
    },
    {
      id: '2',
      name: 'Product 2',
      price: 99.99,
      category: 'Electronics',
      isSold: true,
      colorOptions: [
        { color: 'Black', quantity: 2, image: 'https://via.placeholder.com/150' },
      ],
    },
    {
      id: '3',
      name: 'Product 3',
      price: 49.99,
      category: 'Home Decor',
      isSold: false,
      colorOptions: [
        { color: 'Green', quantity: 7, image: 'https://via.placeholder.com/150' },
      ],
    },
  ];

  // Load products when component mounts
  useEffect(() => {
    setProducts(dummyProducts);
    setFilteredProducts(dummyProducts);
  }, []);

  // Filter products when category changes
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  // Calculate active products (not sold)
  const activeProducts = filteredProducts.filter(product => !product.isSold);

  // Navigate to edit screen with product details
  const handleProductPress = (product) => {
    navigation.navigate('EditProduct', { product });
  };

  // Calculate total quantity for a product
  const calculateTotalQuantity = (colorOptions) => {
    return colorOptions.reduce((total, option) => {
      return total + parseInt(option.quantity || 0);
    }, 0);
  };

  // Render each product item
  const renderProductItem = ({ item }) => {
    const mainImage = item.colorOptions[0]?.image || 'https://via.placeholder.com/150';
    
    return (
      <TouchableOpacity
        style={[
          styles.productCard,
          item.isSold && styles.soldProductCard
        ]}
        onPress={() => handleProductPress(item)}
      >
        <View style={styles.productImageContainer}>
          <Image source={{ uri: mainImage }} style={styles.productImage} />
          {item.isSold && (
            <View style={styles.soldBadge}>
              <Text style={styles.soldBadgeText}>SOLD</Text>
            </View>
          )}
        </View>
        
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          
          <View style={styles.productDetails}>
            <View style={styles.quantityContainer}>
              <Text style={styles.detailLabel}>QUANTITY</Text>
              <Text style={styles.detailValue}>
                {calculateTotalQuantity(item.colorOptions)}
              </Text>
            </View>
            
            <View style={styles.categoryContainer}>
              <Text style={styles.detailLabel}>CATEGORY</Text>
              <Text style={styles.detailValue}>{item.category}</Text>
            </View>
          </View>
          
          <Text style={styles.colorsLabel}>COLORS</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.colorsContainer}
          >
            {item.colorOptions.map((colorOption, index) => (
              <View key={index} style={styles.colorOption}>
                <Text style={styles.colorName}>{colorOption.color}</Text>
                <Text style={styles.colorQuantity}>{colorOption.quantity}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    );
  };

  // Render category dropdown
  const renderDropdown = () => {
    return (
      <Modal
        transparent={true}
        visible={isDropdownVisible}
        onRequestClose={() => setIsDropdownVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsDropdownVisible(false)}>
          <View style={styles.dropdownOverlay}>
            <View style={styles.dropdownContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedCategory(category);
                    setIsDropdownVisible(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Inventory</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('AddProduct')}
        >
          <Text style={styles.addButtonText}>+ Add Product</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.summaryAndFilterContainer}>
        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{activeProducts.length}</Text>
            <Text style={styles.statLabel}>Active Products</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {filteredProducts.length - activeProducts.length}
            </Text>
            <Text style={styles.statLabel}>Sold Products</Text>
          </View>
        </View>
        
        {/* Filter Section */}
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Filter by Category</Text>
          <TouchableOpacity
            style={styles.pickerWrapper}
            onPress={() => setIsDropdownVisible(true)}
          >
            <Text style={styles.selectedCategoryText}>{selectedCategory}</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Product List */}
      <View style={styles.listContainer}>
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderProductItem}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Render Dropdown */}
      {renderDropdown()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DEE2E6',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
  },
  addButton: {
    backgroundColor: '#212529',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  summaryAndFilterContainer: {
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
  },
  statLabel: {
    fontSize: 14,
    color: '#6C757D',
  },
  pickerContainer: {
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
    marginBottom: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#DEE2E6',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  selectedCategoryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  productList: {
    paddingBottom: 16,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  soldProductCard: {
    opacity: 0.6,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  soldBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#DC3545',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  soldBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    color: '#28A745',
    marginBottom: 16,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  quantityContainer: {
    alignItems: 'center',
  },
  categoryContainer: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#6C757D',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
  },
  colorsLabel: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 8,
  },
  colorsContainer: {
    flexDirection: 'row',
  },
  colorOption: {
    alignItems: 'center',
    marginRight: 16,
  },
  colorName: {
    fontSize: 12,
    color: '#6C757D',
  },
  colorQuantity: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212529',
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '80%',
    padding: 16,
  },
  dropdownItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  dropdownItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
  },
});

export default StockInventoryScreen;
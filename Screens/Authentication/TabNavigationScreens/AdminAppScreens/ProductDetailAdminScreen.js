import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import images from "../../../../Constants/images";

const ProductDetailAdminScreen = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productName, setProductName] = useState('');
  const [productColor, setProductColor] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productOrderNo, setProductOrderNo] = useState('');
  const [soldOutModalVisible, setSoldOutModalVisible] = useState(false);
  const [selectedProductForSoldOut, setSelectedProductForSoldOut] = useState(null);
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [colors, setColors] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  // Filter products based on search term (orderNo)
  const filteredProducts = products.filter((product) =>
    product.orderNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    const newProduct = {
      id: Date.now().toString(),
      name: productName,
      description: productDescription,
      colors: colors,
      quantity: productQuantity,
      orderNo: productOrderNo,
      image: images.bag1,
      isHotSelling: false,
      soldOutType: null,
      soldOutColors: [],
    };
    setProducts([...products, newProduct]);
    clearForm();
  };

  const handleEditProduct = () => {
    const updatedProducts = products.map((product) =>
      product.id === selectedProduct.id
        ? {
            ...product,
            name: productName,
            description: productDescription,
            colors: colors,
            quantity: productQuantity,
            orderNo: productOrderNo,
          }
        : product
    );
    setProducts(updatedProducts);
    setSelectedProduct(null);
    clearForm();
  };

  const handleDeleteProduct = (id) => {
    const filteredProducts = products.filter((product) => product.id !== id);
    setProducts(filteredProducts);
  };

  const handleSoldOutProduct = (id, option) => {
    if (option === 'Entire Product') {
      const updatedProducts = products.map((product) =>
        product.id === id
          ? { ...product, soldOutType: 'Entire Product', quantity: 0 }
          : product
      );
      setProducts(updatedProducts);
    } else if (option === 'Color') {
      setColorModalVisible(true);
    }
    setSoldOutModalVisible(false);
  };

  const handleMarkColorAsSoldOut = (id, color) => {
    const updatedProducts = products.map((product) =>
      product.id === id
        ? {
            ...product,
            soldOutType: 'Color',
            soldOutColors: [...product.soldOutColors, color],
            colors: product.colors.filter((c) => c !== color),
          }
        : product
    );
    setProducts(updatedProducts);
    setColorModalVisible(false);
  };

  const handleRemoveSoldOut = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id
        ? {
            ...product,
            soldOutType: null,
            colors: [...product.colors, ...product.soldOutColors],
            soldOutColors: [],
            quantity: product.quantity === 0 ? 1 : product.quantity,
          }
        : product
    );
    setProducts(updatedProducts);
  };

  const handleToggleHotSelling = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, isHotSelling: !product.isHotSelling } : product
    );
    setProducts(updatedProducts);
  };

  const clearForm = () => {
    setProductName('');
    setProductColor('');
    setProductQuantity('');
    setProductDescription('');
    setProductOrderNo('');
    setColors([]);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setProductName(product.name);
    setProductDescription(product.description);
    setColors(product.colors);
    setProductQuantity(product.quantity);
    setProductOrderNo(product.orderNo);
  };

  const handleOpenSoldOutModal = (product) => {
    setSelectedProductForSoldOut(product);
    setSoldOutModalVisible(true);
  };

  const handleAddColor = () => {
    if (productColor.trim()) {
      setColors([...colors, productColor.trim()]);
      setProductColor('');
    }
  };

  const handleDeleteColor = (colorToDelete) => {
    setColors(colors.filter((color) => color !== colorToDelete));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Product Detail Admin Screen</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Order No"
        placeholderTextColor="#fff"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          placeholderTextColor="#fff"
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Product Description"
          placeholderTextColor="#fff"
          value={productDescription}
          onChangeText={setProductDescription}
          multiline={true}
          numberOfLines={4}
        />
        <TextInput
          style={styles.input}
          placeholder="Product Order No"
          placeholderTextColor="#fff"
          value={productOrderNo}
          onChangeText={setProductOrderNo}
        />
        <View style={styles.colorInputContainer}>
          <TextInput
            style={styles.colorInput}
            placeholder="Product Color"
            placeholderTextColor="#fff"
            value={productColor}
            onChangeText={setProductColor}
          />
          <TouchableOpacity style={styles.plusButton} onPress={handleAddColor}>
            <Text style={styles.plusButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.colorBoxContainer}>
          {colors.map((color, index) => (
            <View key={index} style={styles.colorBox}>
              <Text style={styles.colorBoxText}>{color}</Text>
              <TouchableOpacity onPress={() => handleDeleteColor(color)}>
                <Text style={styles.deleteColorText}>❌</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Remaining Quantity"
          placeholderTextColor="#fff"
          value={productQuantity}
          onChangeText={setProductQuantity}
          keyboardType="numeric"
        />
        <View style={styles.buttonContainer}>
          {selectedProduct ? (
            <>
              <Button title="Update Product" onPress={handleEditProduct} color="#fff" />
              <Button title="Cancel" onPress={() => setSelectedProduct(null)} color="red" />
            </>
          ) : (
            <Button title="Add Product" onPress={handleAddProduct} color="#fff" />
          )}
        </View>
      </View>

      <View style={styles.productList}>
        {filteredProducts.map((product) => (
          <View key={product.id} style={styles.productBox}>
            <Image source={product.image} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDetail}>
              Description: {product.description}
            </Text>
            <Text style={styles.productDetail}>
              Order No: {product.orderNo}
            </Text>
            <Text style={styles.productDetail}>
              Available Colors: {product.colors.join(', ')}
            </Text>
            <Text style={styles.productDetail}>
              Remaining Quantity: {product.quantity === 0 ? 'Sold Out' : product.quantity}
            </Text>
            <Text style={styles.productDetail}>
              Hot Selling: {product.isHotSelling ? '🔥' : ''}
            </Text>
            <Text style={styles.productDetail}>
              Sold Out Type: {product.soldOutType || 'Not Sold Out'}
            </Text>
            {product.soldOutType === 'Color' && (
              <Text style={styles.productDetail}>
                Sold Out Colors: {product.soldOutColors.join(', ')}
              </Text>
            )}
            <View style={styles.productActions}>
              <Button title="Edit" onPress={() => handleSelectProduct(product)} />
              <Button title="Sold Out" onPress={() => handleOpenSoldOutModal(product)} color="orange" />
              <Button
                title={product.isHotSelling ? 'Remove Hot Selling' : 'Mark as Hot Selling'}
                onPress={() => handleToggleHotSelling(product.id)}
                color={product.isHotSelling ? 'gray' : 'green'}
              />
              <Button title="Delete" onPress={() => handleDeleteProduct(product.id)} color="red" />
              <Button title="Remove Sold Out" onPress={() => handleRemoveSoldOut(product.id)} color="blue" />
            </View>
          </View>
        ))}
      </View>

      <Modal
        transparent={true}
        visible={soldOutModalVisible}
        onRequestClose={() => setSoldOutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Mark as Sold Out</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleSoldOutProduct(selectedProductForSoldOut.id, 'Color')}
            >
              <Text style={styles.modalOptionText}>Color</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleSoldOutProduct(selectedProductForSoldOut.id, 'Entire Product')}
            >
              <Text style={styles.modalOptionText}>Entire Product</Text>
            </TouchableOpacity>
            <Button title="Cancel" onPress={() => setSoldOutModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={colorModalVisible}
        onRequestClose={() => setColorModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Color to Mark as Sold Out</Text>
            {selectedProductForSoldOut?.colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalOption}
                onPress={() => handleMarkColorAsSoldOut(selectedProductForSoldOut.id, color)}
              >
                <Text style={styles.modalOptionText}>{color}</Text>
              </TouchableOpacity>
            ))}
            <Button title="Cancel" onPress={() => setColorModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 30,
    textAlign: 'center',
    color: '#fff',
  },
  searchInput: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 3,
    borderRadius: 20,
    marginBottom: 60,
    paddingHorizontal: 50,
    color: '#fff',
    backgroundColor: '#333',
  },
  form: {
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 3,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff',
    backgroundColor: '#333',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  colorInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  colorInput: {
    flex: 1,
    height: 40,
    borderColor: '#fff',
    borderWidth: 3,
    borderRadius: 20,
    paddingHorizontal: 10,
    color: '#fff',
    backgroundColor: '#333',
  },
  plusButton: {
    marginLeft: 10,
    backgroundColor: 'black',
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  colorBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  colorBox: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 5,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorBoxText: {
    fontSize: 14,
    color: '#fff',
    marginRight: 10,
  },
  deleteColorText: {
    color: '#ff4444',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productList: {
    marginTop: 30,
  },
  productBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: '90%',
    height: 200,
    borderRadius: 20,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  productDetail: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  productActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  modalOption: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  modalOptionText: {
    color: '#fff',
  },
});

export default ProductDetailAdminScreen;
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Image,
  Alert,
  Switch
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const EditProductScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params || {};
  
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [profit, setProfit] = useState('');
  const [isSold, setIsSold] = useState(false);
  
  const [colorOptions, setColorOptions] = useState([
    { color: '', quantity: '', image: null, isSold: false }
  ]);
  
  // Load product data when component mounts
  useEffect(() => {
    if (product) {
      setProductName(product.name || '');
      setProductCategory(product.category || '');
      setProductDescription(product.description || '');
      setOriginalPrice(product.originalPrice ? product.originalPrice.toString() : '');
      setSellingPrice(product.sellingPrice ? product.sellingPrice.toString() : '');
      calculateProfit(
        product.originalPrice ? product.originalPrice.toString() : '',
        product.sellingPrice ? product.sellingPrice.toString() : ''
      );
      setIsSold(product.isSold || false);
      
      if (product.colorOptions && product.colorOptions.length > 0) {
        setColorOptions(product.colorOptions.map(option => ({
          ...option,
          isSold: option.isSold || false
        })));
      }
    }
  }, [product]);
  
  // Calculate profit when either original price or selling price changes
  const calculateProfit = (original, selling) => {
    if (original && selling) {
      const originalValue = parseFloat(original);
      const sellingValue = parseFloat(selling);
      
      if (!isNaN(originalValue) && !isNaN(sellingValue)) {
        const profitValue = sellingValue - originalValue;
        setProfit(profitValue.toFixed(2));
        return profitValue.toFixed(2);
      }
    }
    setProfit('');
    return '';
  };
  
  // Update selling price and recalculate profit
  const updateSellingPrice = (value) => {
    setSellingPrice(value);
    calculateProfit(originalPrice, value);
  };
  
  // Update original price and recalculate profit
  const updateOriginalPrice = (value) => {
    setOriginalPrice(value);
    calculateProfit(value, sellingPrice);
  };
  
  const addColorOption = () => {
    setColorOptions([...colorOptions, { color: '', quantity: '', image: null, isSold: false }]);
  };
  
  const updateColorOption = (index, field, value) => {
    const updatedOptions = [...colorOptions];
    updatedOptions[index][field] = value;
    setColorOptions(updatedOptions);
  };
  
  const removeColorOption = (index) => {
    if (colorOptions.length > 1) {
      const updatedOptions = colorOptions.filter((_, i) => i !== index);
      setColorOptions(updatedOptions);
    }
  };
  
  const pickImage = async (index) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      updateColorOption(index, 'image', result.assets[0].uri);
    }
  };
  
  const handleSubmit = () => {
    if (!productName || !productCategory || !productDescription || !originalPrice || !sellingPrice) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    
    const incompleteColors = colorOptions.some(
      option => !option.color || !option.quantity || !option.image
    );
    
    if (incompleteColors) {
      Alert.alert('Error', 'Please complete all color, quantity, and image fields');
      return;
    }
    
    // Create updated product object
    const updatedProduct = {
      id: product?.id,
      name: productName,
      category: productCategory,
      description: productDescription,
      originalPrice: parseFloat(originalPrice),
      sellingPrice: parseFloat(sellingPrice),
      profit: parseFloat(profit),
      colorOptions: colorOptions,
      isSold: isSold,
      updatedAt: new Date().toISOString(),
    };
    
    // Here you would typically call an API to update the product
    // For now, we'll just show a success message
    
    Alert.alert('Success', 'Product updated successfully', [
      { text: 'OK', onPress: () => navigation.navigate('ProductOverview') }
    ]);
  };
  
  const toggleSoldStatus = () => {
    setIsSold(!isSold);
  };
  
  const toggleColorSoldStatus = (index) => {
    const updatedOptions = [...colorOptions];
    updatedOptions[index].isSold = !updatedOptions[index].isSold;
    setColorOptions(updatedOptions);
  };
  
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Edit Product</Text>
      
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Product Name*</Text>
          <TextInput
            style={styles.input}
            value={productName}
            onChangeText={setProductName}
            placeholder="Enter product name"
            placeholderTextColor="#666"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Product Category*</Text>
          <TextInput
            style={styles.input}
            value={productCategory}
            onChangeText={setProductCategory}
            placeholder="Enter product category"
            placeholderTextColor="#666"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Product Description*</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={productDescription}
            onChangeText={setProductDescription}
            placeholder="Enter product description"
            placeholderTextColor="#666"
            multiline={true}
            numberOfLines={4}
          />
        </View>
        
        <View style={styles.priceContainer}>
          <View style={[styles.formGroup, styles.priceField]}>
            <Text style={styles.label}>Original Price*</Text>
            <TextInput
              style={styles.input}
              value={originalPrice}
              onChangeText={updateOriginalPrice}
              placeholder="Enter cost price"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
          </View>
          
          <View style={[styles.formGroup, styles.priceField]}>
            <Text style={styles.label}>Selling Price*</Text>
            <TextInput
              style={styles.input}
              value={sellingPrice}
              onChangeText={updateSellingPrice}
              placeholder="Enter selling price"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Profit</Text>
          <View style={[styles.input, styles.profitDisplay]}>
            <Text style={[
              styles.profitText, 
              parseFloat(profit) > 0 ? styles.profitPositive : 
              parseFloat(profit) < 0 ? styles.profitNegative : null
            ]}>
              {profit ? `$${profit}` : 'Calculate profit...'}
            </Text>
          </View>
        </View>
        
        <View style={styles.soldStatusContainer}>
          <Text style={styles.label}>Product Status</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Mark as Sold</Text>
            <Switch
              trackColor={{ false: "#DEE2E6", true: "#212529" }}
              thumbColor={isSold ? "#FFFFFF" : "#f4f3f4"}
              ios_backgroundColor="#DEE2E6"
              onValueChange={toggleSoldStatus}
              value={isSold}
            />
          </View>
          {isSold && (
            <Text style={styles.soldMessage}>
              This product will be marked as sold and won't appear in active listings
            </Text>
          )}
        </View>
        
        <Text style={styles.sectionTitle}>Color Options</Text>
        
        {colorOptions.map((option, index) => (
          <View key={index} style={styles.colorSection}>
            <Text style={styles.colorHeading}>Color Option {index + 1}</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Color*</Text>
              <TextInput
                style={styles.input}
                value={option.color}
                onChangeText={(value) => updateColorOption(index, 'color', value)}
                placeholder="e.g. Black, Red, White"
                placeholderTextColor="#666"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Quantity*</Text>
              <TextInput
                style={styles.input}
                value={option.quantity.toString()}
                onChangeText={(value) => updateColorOption(index, 'quantity', value)}
                placeholder="Enter quantity for this color"
                placeholderTextColor="#666"
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Product Image*</Text>
              <TouchableOpacity 
                style={styles.imagePicker}
                onPress={() => pickImage(index)}
              >
                {option.image ? (
                  <Image source={{ uri: option.image }} style={styles.previewImage} />
                ) : (
                  <Text style={styles.imagePickerText}>Select Image</Text>
                )}
              </TouchableOpacity>
            </View>
            
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Mark this color as sold</Text>
              <Switch
                trackColor={{ false: "#DEE2E6", true: "#212529" }}
                thumbColor={option.isSold ? "#FFFFFF" : "#f4f3f4"}
                ios_backgroundColor="#DEE2E6"
                onValueChange={() => toggleColorSoldStatus(index)}
                value={option.isSold}
              />
            </View>
            
            {colorOptions.length > 1 && (
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removeColorOption(index)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
        
        <TouchableOpacity 
          style={styles.addColorButton}
          onPress={addColorOption}
        >
          <Text style={styles.addColorButtonText}>Add Color Option</Text>
        </TouchableOpacity>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Update Product</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.buttonText, { color: '#000000' }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  screenTitle: {
    fontSize: 28,
    marginTop: 60,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  container: {
    flexGrow: 1,
    padding: 24,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#212529',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DEE2E6',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceField: {
    width: '48%',
  },
  profitDisplay: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  profitText: {
    fontSize: 18,
    fontWeight: '700',
  },
  profitPositive: {
    color: '#28a745',
  },
  profitNegative: {
    color: '#dc3545',
  },
  soldStatusContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#DEE2E6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
  },
  soldMessage: {
    marginTop: 12,
    fontSize: 14,
    color: '#6C757D',
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 32,
    marginBottom: 24,
    color: '#212529',
    letterSpacing: 0.5,
  },
  colorSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#DEE2E6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  colorHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
    color: '#212529',
  },
  imagePicker: {
    height: 200,
    borderWidth: 2,
    borderColor: '#DEE2E6',
    borderRadius: 12,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    overflow: 'hidden',
  },
  imagePickerText: {
    color: '#495057',
    fontSize: 16,
    fontWeight: '500',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removeButton: {
    backgroundColor: '#F8F9FA',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#212529',
  },
  removeButtonText: {
    color: '#212529',
    fontWeight: '600',
    fontSize: 14,
  },
  addColorButton: {
    backgroundColor: '#F8F9FA',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 24,
    borderWidth: 1,
    borderColor: '#212529',
  },
  addColorButtonText: {
    color: '#212529',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    marginBottom: 40,
  },
  button: {
    flex: 1,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  submitButton: {
    backgroundColor: '#212529',
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#212529',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default EditProductScreen;
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const AddProductScreen = () => {
  const navigation = useNavigation();
  
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  
  const [colorOptions, setColorOptions] = useState([
    { color: '', quantity: '', image: null }
  ]);
  
  const addColorOption = () => {
    setColorOptions([...colorOptions, { color: '', quantity: '', image: null }]);
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
    if (!productName || !productCategory || !productDescription || !productPrice) {
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
    
    Alert.alert('Success', 'Product added successfully', [
      { text: 'OK', onPress: () => navigation.navigate('ProductOverview') }
    ]);
  };
  
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Add Product</Text>
      
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
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Product Price*</Text>
          <TextInput
            style={styles.input}
            value={productPrice}
            onChangeText={setProductPrice}
            placeholder="Enter product price"
            placeholderTextColor="#666"
            keyboardType="numeric"
          />
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
                value={option.quantity}
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
            <Text style={styles.buttonText}>Add Product</Text>
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

export default AddProductScreen;
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    FlatList,
    Modal,
    Alert,
} from 'react-native';

import { countries } from 'country-data'; 
import { useNavigation } from '@react-navigation/native'; 
import { Ionicons } from '@expo/vector-icons'; 

const citiesByProvince = {
    'Punjab': [
        'Lahore', 'Faisalabad', 'Rawalpindi', 'Gujranwala', 'Multan', 'Sialkot', 'Bahawalpur',
        'Sargodha', 'Jhang', 'Sheikhupura', 'Rahim Yar Khan', 'Gujrat', 'Kasur', 'Sahiwal', 'Okara',
        'Mianwali', 'Burewala', 'Muridke', 'Mandi Bahauddin', 'Jhelum', 'Chiniot', 'Kamoke', 'Hafizabad',
        'Attock', 'Kot Addu', 'Wazirabad', 'Dera Ghazi Khan', 'Pakpattan', 'Vehari', 'Gojra', 'Narowal',
        'Khanewal', 'Toba Tek Singh', 'Haroonabad', 'Muzaffargarh', 'Bhakkar', 'Lodhran', 'Hasilpur',
        'Arifwala', 'Chishtian', 'Jaranwala', 'Ahmedpur East', 'Kot Abdul Malik', 'Kharian', 'Mailsi',
        'Layyah', 'Chakwal', 'Daska', 'Pind Dadan Khan', 'Kabirwala', 'Sadiqabad', 'Sambrial', 'Shakargarh',
        'Taxila', 'Nankana Sahib', 'Pasrur', 'Zafarwal', 'Khushab', 'Dunyapur', 'Hujra Shah Muqeem',
        'Kot Radha Kishan', 'Phalia', 'Renala Khurd', 'Sangla Hill', 'Talagang', 'Alipur Chatha', 'Bhalwal',
        'Choa Saidan Shah', 'Dipalpur', 'Ferozewala', 'Hassan Abdal', 'Jalalpur Jattan', 'Kamalia',
        'Kot Mumin', 'Lalian', 'Mian Channu', 'Pattoki', 'Qila Didar Singh', 'Raiwind', 'Sillanwali', 'Shorkot', 'Other'],
    'Sindh': [
        'Karachi', 'Hyderabad', 'Sukkur', 'Larkana', 'Nawabshah', 'Mirpur Khas', 'Jacobabad',
        'Shikarpur', 'Dadu', 'Kashmore', 'Khairpur', 'Badin', 'Tando Allahyar', 'Tando Adam',
        'Thatta', 'Umerkot', 'Ghotki', 'Matiari', 'Sanghar', 'Kandhkot', 'Tharparkar', 'Hala',
        'Kotri', 'Tando Muhammad Khan', 'Shahdadkot', 'Mehar', 'Sujawal', 'Qambar', 'Shahdadpur',
        'Ratodero', 'Pir Jo Goth', 'New Sukkur', 'Rohri', 'Sehwan', 'Mirpur Mathelo', 'Gambat',
        'Thul', 'Johi', 'Bulri Shah Karim', 'Nasirabad', 'Digri', 'Chuhar Jamali', 'Tando Ghulam Ali',
        'Khipro', 'Kot Diji', 'Hingorja', 'Naushero Feroze', 'Warah', 'Mirwah Gorchani', 'Dhoronaro', 'Other'],
    'Khyber Pakhtunkhwa': [
        'Peshawar', 'Mardan', 'Abbottabad', 'Swat', 'Kohat', 'Bannu', 'Dera Ismail Khan', 'Mansehra',
        'Charsadda', 'Haripur', 'Nowshera', 'Swabi', 'Chitral', 'Tank', 'Timergara', 'Hangu', 'Karak',
        'Battagram', 'Lakki Marwat', 'Shangla', 'Buner', 'Lower Dir', 'Upper Dir', 'Torghar', 'Malakand',
        'Kolai-Palas', 'Orakzai', 'Kurram', 'Mohmand', 'Bajaur', 'North Waziristan', 'South Waziristan',
        'Parachinar', 'Landi Kotal', 'Jamrud', 'Mingora', 'Tangi', 'Shabqadar', 'Topi', 'Barikot',
        'Thal', 'Daraban', 'Domel', 'Katlang', 'Sarai Naurang', 'Tordher', 'Dargai', 'Gulabad', 'Alpuri', 'Other'],
    'Balochistan': [
        'Quetta', 'Gwadar', 'Turbat', 'Kalat', 'Khuzdar', 'Chaman', 'Zhob', 'Sibi', 'Mastung',
        'Panjgur', 'Nushki', 'Loralai', 'Kharan', 'Pishin', 'Dalbandin', 'Dera Murad Jamali',
        'Usta Mohammad', 'Dera Allah Yar', 'Harnai', 'Musakhel', 'Ziarat', 'Washuk', 'Awaran',
        'Lasbela', 'Qila Saifullah', 'Qila Abdullah', 'Bela', 'Surab', 'Kohlu', 'Barkhan',
        'Sherani', 'Hub', 'Duki', 'Gaddani', 'Ormara', 'Pasni', 'Other'],
    'Islamabad': [
        'Bara Kahu', 'Tarnol', 'Sihala', 'Rawat', 'Golra Sharif', 'Chattar', 'Nilore',
        'Bhara Kahu', 'Shah Allah Ditta', 'Korang Town', 'Gulberg Greens', 'Lehtrar',
        'Bani Gala', 'Tarlai Kalan', 'Sangjani', 'Phulgran', 'Malpur', 'Kirpa', 'Kuri',
        'Model Town Humak', 'Farash Town', 'Gandhara City', 'Other'],
    'Gilgit-Baltistan': [
        'Gilgit', 'Skardu', 'Chilas', 'Khaplu', 'Hunza', 'Astore', 'Other'],
    'Federally Administered Tribal Areas': [
        'Bajaur Agency', 'Darra Adam Khel', 'Miran Shah', 'Thana Malakand Agency', 'Other'],
        'Azad Kashmir': ['Muzaffarabad', 'Mirpur', 'Rawalakot', 'Kotli', 'Bagh', 'Pallandri', 'Hajira',
              'Bhimber', 'Hattian Bala','Other'],
};

const DeliveryAddressScreen = () => {
    const navigation = useNavigation();
    const [country, setCountry] = useState('Pakistan');
    const [countryCode, setCountryCode] = useState('+92'); 
    const [contactName, setContactName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [aptSuite, setAptSuite] = useState('');
    const [province, setProvince] = useState('Province');
    const [city, setCity] = useState('City');
    const [zipCode, setZipCode] = useState('');
    const [isDefault, setIsDefault] = useState(false);


    const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);


    const [isProvinceModalVisible, setIsProvinceModalVisible] = useState(false);


    const [isCityModalVisible, setIsCityModalVisible] = useState(false);
    const [cities, setCities] = useState([]);
    const [citySearchQuery, setCitySearchQuery] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);


    const provinces = [
        'Azad Kashmir',
        'Balochistan',
        'Federally Administered Tribal Areas',
        'Gilgit-Baltistan',
        'Islamabad',
        'Khyber Pakhtunkhwa',
        'Punjab',
        'Sindh',
        'Other',
    ];



    useEffect(() => {
        const allCountries = countries.all.map((country) => ({
            name: country.name,
            code: country.countryCallingCodes[0] || '+0', 
        }));
        setFilteredCountries(allCountries);
    }, []);


    const handleSearch = (query) => {
        setSearchQuery(query);
        const allCountries = countries.all.map((country) => ({
            name: country.name,
            code: country.countryCallingCodes[0] || '+0',
        }));
        const filtered = allCountries.filter((country) =>
            country.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCountries(filtered);
    };


    const handleSelectCountry = (selectedCountry) => {
        setCountry(selectedCountry.name);
        setCountryCode(selectedCountry.code); 
        setIsCountryModalVisible(false);
        setSearchQuery('');
        setFilteredCountries(
            countries.all.map((country) => ({
                name: country.name,
                code: country.countryCallingCodes[0] || '+0',
            }))
        );
    };


    const handleSelectProvince = (selectedProvince) => {
        setProvince(selectedProvince);
        setCities(citiesByProvince[selectedProvince] || []);
        setFilteredCities(citiesByProvince[selectedProvince] || []);
        setIsProvinceModalVisible(false);
    };


    const handleSelectCity = (selectedCity) => {
        setCity(selectedCity);
        setIsCityModalVisible(false);
    };



    const handleCitySearch = (query) => {
        setCitySearchQuery(query);
        const filtered = cities.filter((city) =>
            city.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCities(filtered);
    };


    const handleSubmit = () => {
        const address = {
            country,
            countryCode,
            contactName,
            mobileNumber,
            streetAddress,
            aptSuite,
            province,
            city,
            zipCode,
            isDefault,
        };
        console.log('Submitted Address:', address);
        navigation.navigate('CartDone');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
        
              <View style={styles.section}>
              <View style={styles.section}>
              <Text style={styles.sectionTitle}>Country/region</Text>
              <View style={styles.selector}>
              <Text style={styles.selectedText}>{country}</Text>
            
            </View>
            </View>
                </View>

                
                <Modal
                    visible={isCountryModalVisible}
                    animationType="slide"
                    transparent={false}
                    onRequestClose={() => setIsCountryModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <TextInput
                            style={styles.searchBar}
                            placeholder="Search for a country"
                            placeholderTextColor="#666"
                            value={searchQuery}
                            onChangeText={handleSearch}
                        />
                        <FlatList
                            data={filteredCountries}
                            keyExtractor={(item) => item.name}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.item}
                                    onPress={() => handleSelectCountry(item)}
                                >
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemCode}>{item.code}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setIsCountryModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact information</Text>
                    <Text style={styles.label}>Contact name</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={contactName}
                        onChangeText={setContactName}
                        placeholder="Enter contact name"
                    />

                    <Text style={styles.label}>Mobile number</Text>
                    <View style={styles.phoneInput}>
                        <Text style={styles.phonePrefix}>{countryCode}</Text>
                        <TextInput
                            style={[styles.inputBox, { flex: 1 }]}
                            value={mobileNumber}
                            onChangeText={setMobileNumber}
                            placeholder="Enter mobile number"
                            keyboardType="phone-pad"
                        />
                    </View>
                </View>

                {/* Address Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Address</Text>
                    <Text style={styles.label}>Street, house/apartment/unit</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={streetAddress}
                        onChangeText={setStreetAddress}
                        placeholder="Enter street address"
                    />

                    <Text style={styles.label}>Apt, suite, unit, etc (optional)</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={aptSuite}
                        onChangeText={setAptSuite}
                        placeholder="Enter apt, suite, unit"
                    />

                    <Text style={styles.label}>Province</Text>
                    <TouchableOpacity
                        style={styles.selector}
                        onPress={() => setIsProvinceModalVisible(true)}
                    >
                        <Text style={styles.selectedText}>{province}</Text>
                        <Text style={styles.changeText}>Change</Text>
                    </TouchableOpacity>
                    <View style={{ marginBottom: 16 }} />

                    <Text style={styles.label}>City</Text>
                    
                    <TouchableOpacity
                        style={styles.selector}
                        onPress={() => {
                            if (province !== 'Province') {
                                setIsCityModalVisible(true);
                            } else {
                                Alert.alert('Please select a province first.');
                            }
                        }}
                        
                        
                    >
                        <Text style={styles.selectedText}>{city}</Text>
                        <Text style={styles.changeText}>Change</Text>
                    </TouchableOpacity>
                    <View style={{ marginBottom: 16 }} />
                    <Text style={styles.label}>ZIP code</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={zipCode}
                        onChangeText={setZipCode}
                        placeholder="Enter ZIP code"
                        keyboardType="numeric"
                    />
                </View>

                
                <Modal
                    visible={isProvinceModalVisible}
                    animationType="slide"
                    transparent={false}
                    onRequestClose={() => setIsProvinceModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <FlatList
                            data={provinces}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.item}
                                    onPress={() => handleSelectProvince(item)}
                                >
                                    <Text style={styles.itemName}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setIsProvinceModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                
                <Modal
                    visible={isCityModalVisible}
                    animationType="slide"
                    transparent={false}
                    onRequestClose={() => setIsCityModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <TextInput
                            style={styles.searchBar}
                            placeholder="Search for a city"
                            placeholderTextColor="#666"
                            value={citySearchQuery}
                            onChangeText={handleCitySearch}
                        />
                        <FlatList
                            data={filteredCities}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.item}
                                    onPress={() => handleSelectCity(item)}
                                >
                                    <Text style={styles.itemName}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setIsCityModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity onPress={() => setIsDefault(!isDefault)}>
                        <View style={styles.checkbox}>
                            {isDefault && <Text style={styles.checkboxIcon}>✓</Text>}
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.checkboxLabel}>Set as default shipping address</Text>
                </View>

                
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit Address</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
    },
    section: {
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    selector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    selectedText: {
        fontSize: 14,
        color: '#333',
    },
    changeText: {
        fontSize: 14,
        color: '#000000',
    },
    modalContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    searchBar: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 14,
        marginBottom: 12,
        marginTop: 20,
        color: '#000000',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemName: {
        fontSize: 14,
        color: '#333',
    },
    itemCode: {
        fontSize: 14,
        color: '#555',
    },
    closeButton: {
        marginTop: 12,
        padding: 12,
        backgroundColor: '#000000',
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 12,
        color: '#555',
        marginBottom: 6,
    },
    inputBox: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 10,
        fontSize: 14,
        backgroundColor: '#f9f9f9',
    },
    phoneInput: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    phonePrefix: {
        fontSize: 14,
        marginRight: 8,
        color: '#333',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    checkboxIcon: {
        fontSize: 12,
        color: '#007bff',
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#333',
    },
    submitButton: {
        backgroundColor: '#000000',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',

    },
});

export default DeliveryAddressScreen;
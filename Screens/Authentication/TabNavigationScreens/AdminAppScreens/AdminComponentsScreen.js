import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdminComponentsScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.screenTitle}>AdminScreen</Text>

            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity
                  style={styles.box}
                  onPress={() => navigation.navigate('DashBoardAdmin')}
                > 
                    <Text style={styles.boxTitle}>Dashboard</Text>
                    <Text style={styles.boxText}>View your admin dashboard</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.box}
                    onPress={() => navigation.navigate('OrderAdmin')}
                >
                    <Text style={styles.boxTitle}>Order Summary</Text>
                    <Text style={styles.boxText}>Check recent orders</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.box}
                    onPress={() => navigation.navigate('ProductDetailAdmin')}
                >
                    <Text style={styles.boxTitle}>Product Overview</Text>
                    <Text style={styles.boxText}>Manage your products</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.box}
                    onPress={() => navigation.navigate('NotificationAdmin')}
                >
                    <Text style={styles.boxTitle}>Notifications</Text>
                    <Text style={styles.boxText}>View notifications</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.box}
                    onPress={() => navigation.navigate('FeedbackAdmin')}
                >
                    <Text style={styles.boxTitle}>FeedBack</Text>
                    <Text style={styles.boxText}>View Feedback Response Of Customer</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const OrderAdminScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Admin Screen</Text>
            <Text style={styles.text}>Here you can manage all the orders.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    screenTitle: {
        fontSize: 25,
        marginTop: 50,
        marginBottom: -10,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        paddingVertical: 30,
        backgroundColor: 'white',
        borderBottomWidth: 0,
        borderBottomColor: '#e0e0e0',
    },
    container: {
        flexGrow: 1,
        padding: 20,
    },
    box: {
        backgroundColor: 'black',
        borderRadius: 25,
        padding: 25,
        marginVertical: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    boxTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    boxText: {
        fontSize: 14,
        color: 'white',
    },
});

export default AdminComponentsScreen;
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, ImageBackground } from 'react-native';
import Logo from '../../assets/logo.svg';

export default AskAuthScreen = ({ navigation}) => {
    return (
        <ImageBackground 
            source={require('../../assets/splash1.jpg')} 
            style={styles.backgroundImage}
            resizeMode="cover"
            blurRadius={5}
        >
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Logo width={250}  height={250} />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.outlinedButton}
                        onPress={() => navigation.navigate('SignUp')}
                    >
                        <Text style={styles.outlinedButtonText}>Signup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        marginBottom: 20
    },
    button: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000'
    },
    outlinedButton: {
        borderWidth: 2,
        borderColor: '#ffffff',
        backgroundColor: 'transparent',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center'
    },
    outlinedButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff'
    }
});
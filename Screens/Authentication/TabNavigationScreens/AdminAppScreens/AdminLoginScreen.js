import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdminLoginScreen = () => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('LoginPageAdmin');
  };

  return (
    <View style={styles.container}>
      <View style={styles.blackHalf}>
        <Text style={styles.adminPortalText}>Admin Portal      LaceHouse</Text>
      </View>

      <View style={styles.whiteHalf}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  blackHalf: {
    flex: 1.5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  whiteHalf: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminPortalText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  loginButton: {
    backgroundColor: 'black',
    marginTop: 80,
    paddingHorizontal: 150,
    paddingVertical: 10,
    borderRadius: 25,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdminLoginScreen;
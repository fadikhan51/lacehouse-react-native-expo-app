import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PasswordChangeSuccessfulScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Icon name="check-circle" size={150} color="#28a745" />
        <Text style={styles.successText}>Successfully!</Text>
        <Text style={styles.message}>
          Your password has been successfully changed.
        </Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Home')}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Back to Home
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
  contentContainer: {
    alignItems: 'center',
  },
  successText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    color: '#28a745',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    width: '80%',
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#000',
  },
  buttonText: {
    color: '#fff',
  },
});

export default PasswordChangeSuccessfulScreen;
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PasswordChangeScreen = ({route}) => {
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password) => {
    const rules = [
      { id: 1, text: 'Be at least 8 characters', valid: password.length >= 8 },
      { id: 2, text: 'Not contain your name, username, or school name', valid: true },
      { id: 3, text: 'Include at least one uppercase letter', valid: /[A-Z]/.test(password) },
      { id: 4, text: 'Include at least one number', valid: /[0-9]/.test(password) },
      { id: 5, text: 'Include at least one symbol(!,@,#,$)', valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    ];
    return rules;
  };

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    const rules = validatePassword(newPassword);
    const isPasswordValid = rules.every(rule => rule.valid);
    if (!isPasswordValid) {
      Alert.alert('Error', 'Password does not meet all requirements');
      return;
    }

    navigation.navigate('ChangePasswordSuccessful');
  };

  const passwordRules = validatePassword(newPassword);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Change Password</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputHeading}>Current Password</Text>
        <TextInput
          placeholder="Enter your current password"
          placeholderTextColor="#999"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry={!showCurrentPassword}
          right={
            <TextInput.Icon
              icon={showCurrentPassword ? "eye-off" : "eye"}
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
            />
          }
          style={styles.input}
          mode="outlined"
          theme={{ 
            colors: { text: '#000', placeholder: '#999' },
            roundness: 10,
          }}
        />

        <Text style={styles.inputHeading}>New Password</Text>
        <TextInput
          placeholder="Enter a new password"
          placeholderTextColor="#999"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={!showNewPassword}
          right={
            <TextInput.Icon
              icon={showNewPassword ? "eye-off" : "eye"}
              onPress={() => setShowNewPassword(!showNewPassword)}
            />
          }
          style={styles.input}
          mode="outlined"
          theme={{ 
            colors: { text: '#000', placeholder: '#999' },
            roundness: 10,
          }}
        />

        <Text style={styles.inputHeading}>Confirm New Password</Text>
        <TextInput
          placeholder="Re-enter the new password"
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          right={
            <TextInput.Icon
              icon={showConfirmPassword ? "eye-off" : "eye"}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          }
          style={styles.input}
          mode="outlined"
          theme={{ 
            colors: { text: '#000', placeholder: '#999' },
            roundness: 10,
          }}
        />

        <View style={styles.validationContainer}>
          <Text style={styles.validationHeading}>Your password must:</Text>
          {passwordRules.map(rule => (
            <Text
              key={rule.id}
              style={[styles.validationRule, rule.valid ? styles.validRule : styles.invalidRule]}
            >
              {rule.valid ? '✓' : '✗'} {rule.text}
            </Text>
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={()=>navigation.navigate('PasswordChangeSuccessful')}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    marginBottom: 10,
  },
  headingContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -40,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    padding: 20,
  },
  inputHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 5,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 14,
  },
  validationContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  validationHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  validationRule: {
    fontSize: 12,
    marginBottom: 5,
  },
  validRule: {
    color: 'green',
  },
  invalidRule: {
    color: 'red',
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PasswordChangeScreen;    
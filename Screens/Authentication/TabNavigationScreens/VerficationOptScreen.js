import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
} from 'react-native';
import Logo from '../../../assets/logo.svg';

const VerificationOtpScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const otpInputs = useRef([]);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    const fetchedEmail = route.params?.email || 'furqanfarooq923@gmail.com';
    setEmail(fetchedEmail);
  }, [route.params?.email]);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prevCooldown) => prevCooldown - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleVerifyOtp = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit code');
      return;
    }

    try {
      setLoading(true);
      Alert.alert('Success', 'Email verified successfully!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', error?.message || 'Failed to verify email');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) {
      return;
    }

    try {
      setLoading(true);
      Alert.alert('Success', 'Verification code resent successfully');
      setResendCooldown(60);
    } catch (error) {
      Alert.alert('Error', 'Failed to resend code');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputs.current[index + 1].focus();
    }

    if (index === 5 && value) {
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.blackBackground}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.arrowText}>←</Text>
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Logo width={200} height={200} />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Email Verification</Text>
        <Text style={styles.subtitle}>
          Please enter the verification code sent to{' '}
          <Text style={styles.emailText}>{email}</Text>
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpBox}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleOtpChange(index, value)}
              ref={(ref) => (otpInputs.current[index] = ref)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace' && index > 0 && !digit) {
                  otpInputs.current[index - 1].focus();
                }
              }}
              selectionColor="black"
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.verifyButton}
          onPress={handleVerifyOtp}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Verifying...' : 'Verify Email'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resendButton}
          onPress={handleResendCode}
          disabled={loading || resendCooldown > 0}
        >
          <Text style={styles.resendText}>
            Resend Code {resendCooldown > 0 ? `(${resendCooldown}s)` : ''}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  blackBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '35%',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  backArrow: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  arrowText: {
    fontSize: 30,
    color: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '35%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  emailText: {
    fontWeight: 'bold',
    color: '#000',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    padding: 20,
  },
  verifyButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendButton: {
    padding: 10,
  },
  resendText: {
    color: 'black',
    fontSize: 16,
  },
});

export default VerificationOtpScreen;
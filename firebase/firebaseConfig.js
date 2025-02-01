// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';    
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDk1FzUItdX-0XrSLNAbANyQBqMqJ2Cp5k",
  authDomain: "lacehouse-a6fbc.firebaseapp.com",
  projectId: "lacehouse-a6fbc",
  storageBucket: "lacehouse-a6fbc.firebasestorage.app",
  messagingSenderId: "131091242895",
  appId: "1:131091242895:web:afb3ae66415b54121575fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

export {auth};
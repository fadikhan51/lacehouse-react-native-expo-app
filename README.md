📱 React Native Expo + Firebase Setup
Welcome to this React Native Expo project! 🚀 This guide will help you set up and run the project seamlessly.
_____________________________________________________________________________________________________________
📌 Prerequisites
Ensure you have the following installed:

Node.js (Latest LTS recommended)<br>
Expo CLI<br>
Firebase Console<br>
Expo Go App (for testing on mobile)<br>

_____________________________________________________________________________________________________________
⚡ Setup & Installation

1️⃣ Register Firebase Project
Go to Firebase Console.
Create a new project.
Navigate to Project Settings → General → Your Apps.
Register an Android or iOS app.
Copy the Firebase config values.

2️⃣ Create a .env File
Inside your project root, create a .env file and add the following:
<code># .env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
👉 Note: Do not share this file or commit it to GitHub!</code>

3️⃣ Install Dependencies
Run the following command to install required packages:

<code>npm install</code>
4️⃣ Start the Expo Project
Launch the development server with:

<code>npm start
or
expo start</code>

5️⃣ Run on Mobile
Scan the QR Code shown in the terminal using Expo Go.
The app will open instantly on your device! 🎉
🚀 Features
✔️ Firebase Authentication
✔️ Firestore Database
✔️ Secure Environment Variables
✔️ Cross-Platform Support (iOS & Android)

_____________________________________________________________________________________________________________
🤝 Contributing
Want to improve this project? Feel free to submit a pull request!


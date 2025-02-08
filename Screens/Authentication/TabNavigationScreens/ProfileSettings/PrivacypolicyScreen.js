import * as React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PrivacyPolicyScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.effectiveDate}>LACE_HOUSE PRIVACY POLICY — YOUR PRIVACY RIGHTS</Text>
      <Text style={styles.effectiveDate}>Effective Date: February 9, 2025</Text>

      <Text style={styles.sectionTitle}>THIS PRIVACY POLICY APPLIES TO THE SITES</Text>
      <Text style={styles.text}>
        This Policy describes how we treat personal information both online and offline. This includes on our app. It also includes in phone or email interactions you have with us.
      </Text>

      <Text style={styles.sectionTitle}>WE COLLECT INFORMATION FROM AND ABOUT YOU</Text>
      <Text style={styles.smallText}>
        <Text style={styles.bullet}>•</Text> Contact information. For example, we might collect your name and street address. We might also collect your phone number or email address.
      </Text>
      <Text style={styles.smallText}>
        <Text style={styles.bullet}>•</Text> Payment and billing information. For example, we collect your credit card number and zip code when you buy one of our products.
      </Text>
      <Text style={styles.smallText}>
        <Text style={styles.bullet}>•</Text> Information you submit or post. If you post content, apply for a job, or respond to a survey, we will collect the information you provide to us.
      </Text>
      <Text style={styles.smallText}>
        <Text style={styles.bullet}>•</Text> Demographic information. We may collect information about our services you like or products you buy. We might collect this as part of a survey, for example.
      </Text>
      <Text style={styles.smallText}>
        <Text style={styles.bullet}>•</Text> Other information. If you use our app, we may collect information about your computer location or the browser you're using. We might look at what site you came from, or what site you visit when you leave us.
      </Text>

      <Text style={styles.sectionTitle}>WE USE INFORMATION AS DISCLOSED AND DESCRIBED HERE</Text>
      <Text style={styles.smallText}>
        <Text style={styles.bullet}>•</Text> We use information to respond to your requests or questions. For example, we might use your information to confirm your registration for a program or contest, or fulfill prizes or premiums in a promotion. We may use your friend's email address if you send them features on our app.
      </Text>
      <Text style={styles.smallText}>
        <Text style={styles.bullet}>•</Text> We use information to improve our products and services. We might use your information to customize your experience with us. We may use your information to make our app and products better.
      </Text>
      <Text style={styles.smallText}>
        <Text style={styles.bullet}>•</Text> We use information to look at site trends and customer interests. We may use your information to make our app and products better. We may combine information we get from you with information about you we get from third parties.
      </Text>
      <Text style={styles.smallText}>
        <Text style={styles.bullet}>•</Text> We use information for security purposes. We may use information to protect our company, our customers, or our app. For example, in the event of a breach, we may use your contact information to contact you about that incident.
      </Text>
      <Text style={styles.smallText}>
        <Text style={styles.bullet}>•</Text> We use information for marketing purposes. For example, we might send you information about special promotions or offers. We might also tell you about new features or products. These might be our own offers or products, or third-party offers or products we think you might find interesting.
      </Text>
      <Text style={styles.smallText}>
        <Text style={styles.bullet}>•</Text> We use information to send you transactional communications. For example, we might send you emails about a purchase you made with us. We might also contact you about this policy or our app terms.
      </Text>
      <Text style={styles.smallText}>
        <Text style={styles.bullet}>•</Text> We use information as otherwise permitted by law.
      </Text>

      <Text style={styles.sectionTitle}>YOU HAVE CERTAIN CHOICES ABOUT HOW WE USE YOUR INFORMATION</Text>
      <Text style={styles.smallText}>
        <Text style={styles.bullet}>•</Text> You can opt out of receiving our marketing emails. To stop receiving our promotional emails, send a request to our registed email address lacehousecustomercare@gmail.com or follow the instructions in any promotional message you get from us. It may take about ten (10) days to process your request. Don't worry! Even if you opt out of getting marketing messages, we will still be sure to send you transactional messages. For example, we may still contact you about your orders.
      </Text>
      <Text style={styles.smallText}>
        <Text style={styles.bullet}>•</Text> You can control if we share information with third parties for their marketing purposes. To opt out of having us share your information with third parties for their promotional purposes.
      </Text>
      <Text style={styles.smallText}>
        <Text style={styles.bullet}>•</Text> Once your account has been deleted after your approval, you will lose all the information associated with that account e.g. Addresses, Past Orders.
      </Text>

      <Text style={styles.sectionTitle}>CHILDREN'S PRIVACY</Text>
      <Text style={styles.smallText}>
        <Text style={styles.bullet}>•</Text> Our app is intended for adults and youngest, and we do not knowingly collect personal information from children under 13 without parental or guardian consent. If you are a parent or legal guardian and believe your child under 13 has provided us with personal information, please contact us at [insert email] or write to us at the address listed in this policy. Please include "COPPA Information Request" in your message.
      </Text>
      <Text style={styles.smallText}>
        <Text style={styles.bullet}>•</Text> While our app is designed for users of all ages above age 13, it is not intended for children under 13.
      </Text>

      <Text style={styles.sectionTitle}>CHANGES TO THIS POLICY</Text>
      <Text style={styles.smallText}>
        <Text style={styles.bullet}>•</Text> From time to time we may change our privacy practices. We will notify you of any material changes to this policy as required by law. We will also post an updated copy on our app. Please check our app periodically for updates.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 22,
    left: -5,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    marginTop: 16,
  },
  effectiveDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    textAlign: 'justify',
    marginBottom: 8,
  },
  smallText: {
    fontSize: 14,
    textAlign: 'justify',
    marginBottom: 8,
    paddingLeft: 24,
  },
  bullet: {
    fontWeight: 'bold',
    fontSize: 16,
    position: 'absolute',
    left: -20,
  },
});

export default PrivacyPolicyScreen;
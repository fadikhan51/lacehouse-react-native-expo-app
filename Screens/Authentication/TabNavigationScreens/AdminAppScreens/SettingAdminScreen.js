import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Switch } from 'react-native';
import { Button, Card, Title, Paragraph, TextInput } from 'react-native-paper';

const SettingAdminScreen = () => {
  const [isEncryptionEnabled, setIsEncryptionEnabled] = useState(false);
  const [passwordPolicy, setPasswordPolicy] = useState('');
  const [ipWhitelist, setIpWhitelist] = useState('');
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [featureToggle, setFeatureToggle] = useState(false);
  const [customBranding, setCustomBranding] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
  });

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>User Management</Title>
          <Button onPress={() => console.log('Manage Users')}>Manage Users</Button>
          <Button onPress={() => console.log('Manage Roles')}>Manage Roles</Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Security Settings</Title>
          <View style={styles.setting}>
            <Text>Enable Data Encryption</Text>
            <Switch value={isEncryptionEnabled} onValueChange={setIsEncryptionEnabled} />
          </View>
          <TextInput
            label="Password Policy"
            value={passwordPolicy}
            onChangeText={setPasswordPolicy}
          />
          <TextInput
            label="IP Whitelist"
            value={ipWhitelist}
            onChangeText={setIpWhitelist}
          />
          <TextInput
            label="Session Timeout (minutes)"
            value={sessionTimeout}
            onChangeText={setSessionTimeout}
            keyboardType="numeric"
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>App Configuration</Title>
          <View style={styles.setting}>
            <Text>Enable Feature X</Text>
            <Switch value={featureToggle} onValueChange={setFeatureToggle} />
          </View>
          <TextInput
            label="Custom Branding"
            value={customBranding}
            onChangeText={setCustomBranding}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Notifications and Alerts</Title>
          <View style={styles.setting}>
            <Text>Email Notifications</Text>
            <Switch
              value={notificationSettings.email}
              onValueChange={(value) => setNotificationSettings({ ...notificationSettings, email: value })}
            />
          </View>
          <View style={styles.setting}>
            <Text>Push Notifications</Text>
            <Switch
              value={notificationSettings.push}
              onValueChange={(value) => setNotificationSettings({ ...notificationSettings, push: value })}
            />
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>API and Developer Settings</Title>
          <TextInput
            label="API Key"
            value={apiKey}
            onChangeText={setApiKey}
          />
          <Button onPress={() => console.log('Generate API Key')}>Generate API Key</Button>
        </Card.Content>
      </Card>

      {/* Add more sections for Data Management, Audit and Logging, Billing, Compliance, etc. */}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default SettingAdminScreen;
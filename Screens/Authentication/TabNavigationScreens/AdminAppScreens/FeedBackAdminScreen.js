import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const FeedbackAdminScreen = () => {
  const initialFeedbackList = [
    {
      id: 1,
      name: 'Furqan Farooq',
      phone: '03360303085',
      email: 'FurqanFarooq923@example.com',
      response: 'Great service! Very satisfied.',
      isRead: false,
    },
    {
      id: 2,
      name: 'Furqan Farooq',
      phone: '03360303085',
      email: 'FurqanFarooq923@example.com',
      response: 'The product was delivered late.',
      isRead: false,
    },
    {
      id: 3,
      name: 'Furqan Farooq',
      phone: '03360303085',
      email: 'FurqanFarooq923@example.com',
      response: 'Excellent customer support!',
      isRead: true,
    },
    {
      id: 4,
      name: 'Furqan Farooq',
      phone: '03360303085',
      email: 'FurqanFarooq923@example.com',
      response: 'The product quality is amazing.',
      isRead: false,
    },
  ];

  const [feedbackList, setFeedbackList] = useState(initialFeedbackList);
  const [unreadCount, setUnreadCount] = useState(0);
  const [readCount, setReadCount] = useState(0);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const unread = feedbackList.filter((item) => !item.isRead).length;
    const read = feedbackList.filter((item) => item.isRead).length;
    setUnreadCount(unread);
    setReadCount(read);
  }, [feedbackList]);

  const markAsRead = (id) => {
    const updatedFeedbackList = feedbackList.map((item) =>
      item.id === id ? { ...item, isRead: true } : item
    );
    setFeedbackList(updatedFeedbackList);
  };

  const getFilteredFeedback = () => {
    switch (filter) {
      case 'unread':
        return feedbackList.filter((item) => !item.isRead);
      case 'read':
        return feedbackList.filter((item) => item.isRead);
      default:
        return feedbackList;
    }
  };

  const renderFeedbackItem = ({ item }) => (
    <TouchableOpacity onPress={() => markAsRead(item.id)}>
      <View style={styles.feedbackItem}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.phone}>Phone: {item.phone}</Text>
        <Text style={styles.email}>Email: {item.email}</Text>
        <View style={styles.responseContainer}>
          <Text style={styles.responseLabel}>Response: </Text>
          <Text style={styles.responseText}>{item.response}</Text>
        </View>
        <Text style={item.isRead ? styles.readStatusRead : styles.readStatusUnread}>
          {item.isRead ? 'Read' : 'Unread'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Feedback Responses</Text>

      <View style={styles.statusBox}>
        <TouchableOpacity
          style={[styles.statusItem, filter === 'unread' && styles.activeFilter]}
          onPress={() => setFilter('unread')}
        >
          <Text style={styles.statusText}>Unread: {unreadCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.statusItem, filter === 'read' && styles.activeFilter]}
          onPress={() => setFilter('read')}
        >
          <Text style={styles.statusText}>Read: {readCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.statusItem, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <Text style={styles.statusText}>All: {feedbackList.length}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={getFilteredFeedback()}
        renderItem={renderFeedbackItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#F5F7FA',
  },
  heading: {
    fontSize: 24,
    marginTop: 30,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 20,
    textAlign: 'center',
  },
  statusBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statusItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeFilter: {
    backgroundColor: '#EDF2F7',
  },
  statusText: {
    fontSize: 14,
    color: '#4A5568',
    fontWeight: '500',
  },
  feedbackItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  phone: {
    fontSize: 14,
    color: '#718096',
    marginTop: 8,
  },
  email: {
    fontSize: 14,
    color: '#718096',
    marginTop: 4,
  },
  responseContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  responseLabel: {
    fontSize: 14,
    color: '#4A5568',
    fontWeight: '500',
  },
  responseText: {
    fontSize: 14,
    color: '#38A169',
    flex: 1,
  },
  readStatusUnread: {
    fontSize: 12,
    color: '#E53E3E',
    marginTop: 8,
    textAlign: 'right',
    fontWeight: '500',
  },
  readStatusRead: {
    fontSize: 12,
    color: '#3182CE',
    marginTop: 8,
    textAlign: 'right',
    fontWeight: '500',
  },
});

export default FeedbackAdminScreen;
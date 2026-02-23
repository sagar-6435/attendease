import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDashboard, markAttendance, deleteSubject } from '../services/api';
import CircularProgress from '../components/CircularProgress';
import SubjectCard from '../components/SubjectCard';

export default function HomeScreen({ navigation }) {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load dashboard');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboard();
  };

  const handleMarkAttendance = async (subjectId, status) => {
    try {
      await markAttendance(subjectId, status);
      fetchDashboard();
      Alert.alert('Success', `Marked as ${status}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to mark attendance');
    }
  };

  const handleDeleteSubject = (subjectId, subjectName) => {
    Alert.alert(
      'Delete Subject',
      `Are you sure you want to delete ${subjectName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteSubject(subjectId);
              fetchDashboard();
              Alert.alert('Success', 'Subject deleted');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete subject');
            }
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Login');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome, {dashboard?.userName}!</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressSection}>
          <CircularProgress percentage={dashboard?.overallPercentage || 0} />
          <View style={styles.badgeContainer}>
            <View style={[styles.badge, dashboard?.isSafe ? styles.safeBadge : styles.lowBadge]}>
              <Text style={styles.badgeText}>{dashboard?.isSafe ? 'SAFE' : 'LOW'}</Text>
            </View>
          </View>
          {dashboard?.warningMessage && (
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>⚠️ {dashboard.warningMessage}</Text>
            </View>
          )}
        </View>

        <View style={styles.subjectsSection}>
          <Text style={styles.sectionTitle}>Your Subjects</Text>
          {dashboard?.subjects?.length === 0 ? (
            <Text style={styles.emptyText}>No subjects added yet. Tap + to add one!</Text>
          ) : (
            dashboard?.subjects?.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                onMarkPresent={() => handleMarkAttendance(subject.id, 'present')}
                onMarkAbsent={() => handleMarkAttendance(subject.id, 'absent')}
                onDelete={() => handleDeleteSubject(subject.id, subject.subjectName)}
              />
            ))
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddSubject')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2196F3',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
  progressSection: {
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeContainer: {
    marginTop: 16,
  },
  badge: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 16,
  },
  safeBadge: {
    backgroundColor: '#4CAF50',
  },
  lowBadge: {
    backgroundColor: '#F44336',
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  warningBox: {
    backgroundColor: '#FFF3E0',
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
    width: '100%',
  },
  warningText: {
    color: '#E65100',
    fontSize: 14,
    textAlign: 'center',
  },
  subjectsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 32,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
});

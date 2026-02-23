import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SubjectCard({ subject, onMarkPresent, onMarkAbsent, onDelete }) {
  const percentage = parseFloat(subject.attendancePercentage || 0);
  const isSafe = percentage >= 75;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.subjectName}>{subject.subjectName}</Text>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteText}>×</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{subject.attendedClasses}</Text>
          <Text style={styles.statLabel}>Attended</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{subject.totalClasses}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: isSafe ? '#4CAF50' : '#F44336' }]}>
            {percentage.toFixed(0)}%
          </Text>
          <Text style={styles.statLabel}>Percentage</Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.presentButton} onPress={onMarkPresent}>
          <Text style={styles.buttonText}>Present</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.absentButton} onPress={onMarkAbsent}>
          <Text style={styles.buttonText}>Absent</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    fontSize: 24,
    color: '#F44336',
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  presentButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
  },
  absentButton: {
    flex: 1,
    backgroundColor: '#F44336',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

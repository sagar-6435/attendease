import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CircularProgress({ percentage }) {
  const radius = 70;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const color = percentage >= 75 ? '#4CAF50' : '#F44336';

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <View style={[styles.progressCircle, { borderColor: '#E0E0E0' }]} />
        <View
          style={[
            styles.progressCircle,
            {
              borderColor: color,
              borderTopColor: 'transparent',
              borderRightColor: percentage > 25 ? color : 'transparent',
              borderBottomColor: percentage > 50 ? color : 'transparent',
              borderLeftColor: percentage > 75 ? color : 'transparent',
              transform: [{ rotate: `${(percentage * 3.6)}deg` }],
            },
          ]}
        />
        <View style={styles.innerCircle}>
          <Text style={styles.percentageText}>{percentage.toFixed(0)}%</Text>
          <Text style={styles.label}>Attendance</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 160,
    height: 160,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircle: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 12,
  },
  innerCircle: {
    width: 116,
    height: 116,
    borderRadius: 58,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

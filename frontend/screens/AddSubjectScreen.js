import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { addSubject } from '../services/api';

export default function AddSubjectScreen({ navigation }) {
  const [subjectName, setSubjectName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddSubject = async () => {
    if (!subjectName.trim()) {
      Alert.alert('Error', 'Please enter subject name');
      return;
    }

    setLoading(true);
    try {
      await addSubject(subjectName.trim());
      Alert.alert('Success', 'Subject added successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to add subject');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Subject Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Mathematics, Physics"
          value={subjectName}
          onChangeText={setSubjectName}
          autoFocus
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleAddSubject}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Adding...' : 'Add Subject'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  form: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 24,
    borderRadius: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

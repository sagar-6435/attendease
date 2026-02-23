import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.100:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signup = async (name, email, password) => {
  const response = await api.post('/auth/signup', { name, email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const updateFcmToken = async (fcmToken) => {
  const response = await api.post('/auth/fcm-token', { fcmToken });
  return response.data;
};

export const addSubject = async (subjectName) => {
  const response = await api.post('/subjects/add', { subjectName });
  return response.data;
};

export const getSubjects = async () => {
  const response = await api.get('/subjects/list');
  return response.data;
};

export const markAttendance = async (subjectId, status) => {
  const response = await api.post('/subjects/mark-attendance', { subjectId, status });
  return response.data;
};

export const getDashboard = async () => {
  const response = await api.get('/subjects/dashboard');
  return response.data;
};

export const deleteSubject = async (subjectId) => {
  const response = await api.delete(`/subjects/${subjectId}`);
  return response.data;
};

// Update subject card to use 'id' instead of '_id'
export { api };

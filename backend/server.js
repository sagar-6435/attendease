require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const { initializeFirestore } = require('./config/firestore');
const { sendPushNotification } = require('./config/firebase');
const UserModel = require('./models/userModel');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Firestore
initializeFirestore();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/subjects', require('./routes/subjectRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'AttendEase API is running' });
});

// Cron job - Daily at 5:00 PM
cron.schedule('0 17 * * *', async () => {
  console.log('Running daily attendance check at 5:00 PM');
  
  try {
    const users = await UserModel.getUsersWithoutAttendanceToday();

    for (const user of users) {
      if (user.fcmToken) {
        await sendPushNotification(
          user.fcmToken,
          'Attendance Reminder',
          '⚠️ You have not marked your attendance today. Please update before 11:59 PM.'
        );
      }
    }

    console.log(`Sent notifications to ${users.length} users`);
  } catch (error) {
    console.error('Cron job error:', error.message);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`AttendEase Server running on port ${PORT}`);
});

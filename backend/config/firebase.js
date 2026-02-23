const admin = require('firebase-admin');

const initializeFirebase = () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    });
    console.log('Firebase Admin Initialized');
  } catch (error) {
    console.error('Firebase Initialization Error:', error.message);
  }
};

const sendPushNotification = async (fcmToken, title, body) => {
  try {
    const message = {
      notification: { title, body },
      token: fcmToken,
    };
    await admin.messaging().send(message);
    return true;
  } catch (error) {
    console.error('Push Notification Error:', error.message);
    return false;
  }
};

module.exports = { initializeFirebase, sendPushNotification };

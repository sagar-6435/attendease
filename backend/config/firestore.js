const admin = require('firebase-admin');

let db;

const initializeFirestore = () => {
  try {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
      });
    }
    
    db = admin.firestore();
    console.log('Firebase Firestore Initialized');
    return db;
  } catch (error) {
    console.error('Firestore Initialization Error:', error.message);
    process.exit(1);
  }
};

const getFirestore = () => {
  if (!db) {
    return initializeFirestore();
  }
  return db;
};

module.exports = { initializeFirestore, getFirestore };

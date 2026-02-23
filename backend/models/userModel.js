const { getFirestore } = require('../config/firestore');
const admin = require('firebase-admin');

class UserModel {
  constructor() {
    this.collection = 'users';
  }

  async createUser(userData) {
    const db = getFirestore();
    const userRef = db.collection(this.collection).doc();
    
    const user = {
      id: userRef.id,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      fcmToken: null,
      subjects: [],
      lastMarkedDate: null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await userRef.set(user);
    return { id: userRef.id, ...user };
  }

  async findByEmail(email) {
    const db = getFirestore();
    const snapshot = await db.collection(this.collection)
      .where('email', '==', email.toLowerCase())
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }

  async findById(userId) {
    const db = getFirestore();
    const doc = await db.collection(this.collection).doc(userId).get();

    if (!doc.exists) {
      return null;
    }

    return { id: doc.id, ...doc.data() };
  }

  async updateUser(userId, updateData) {
    const db = getFirestore();
    const userRef = db.collection(this.collection).doc(userId);
    
    await userRef.update({
      ...updateData,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return this.findById(userId);
  }

  async addSubject(userId, subjectData) {
    const user = await this.findById(userId);
    
    const newSubject = {
      id: Date.now().toString(),
      subjectName: subjectData.subjectName,
      totalClasses: 0,
      attendedClasses: 0,
      lastMarkedDate: null,
    };

    const subjects = user.subjects || [];
    subjects.push(newSubject);

    await this.updateUser(userId, { subjects });
    return newSubject;
  }

  async updateSubject(userId, subjectId, updateData) {
    const user = await this.findById(userId);
    const subjects = user.subjects || [];
    
    const subjectIndex = subjects.findIndex(s => s.id === subjectId);
    if (subjectIndex === -1) {
      throw new Error('Subject not found');
    }

    subjects[subjectIndex] = {
      ...subjects[subjectIndex],
      ...updateData,
    };

    await this.updateUser(userId, { subjects });
    return subjects[subjectIndex];
  }

  async deleteSubject(userId, subjectId) {
    const user = await this.findById(userId);
    const subjects = (user.subjects || []).filter(s => s.id !== subjectId);
    
    await this.updateUser(userId, { subjects });
    return true;
  }

  async getUsersWithoutAttendanceToday() {
    const db = getFirestore();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const snapshot = await db.collection(this.collection)
      .where('fcmToken', '!=', null)
      .get();

    const users = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      const lastMarked = data.lastMarkedDate?.toDate();
      
      if (!lastMarked || lastMarked < today) {
        users.push({ id: doc.id, ...data });
      }
    });

    return users;
  }
}

module.exports = new UserModel();

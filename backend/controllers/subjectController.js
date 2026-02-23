const UserModel = require('../models/userModel');

exports.addSubject = async (req, res) => {
  try {
    const { subjectName } = req.body;

    if (!subjectName) {
      return res.status(400).json({ message: 'Subject name is required' });
    }

    const user = req.user;

    const existingSubject = (user.subjects || []).find(
      (s) => s.subjectName.toLowerCase() === subjectName.toLowerCase()
    );

    if (existingSubject) {
      return res.status(400).json({ message: 'Subject already exists' });
    }

    const subject = await UserModel.addSubject(req.userId, { subjectName });

    res.status(201).json({
      message: 'Subject added successfully',
      subject,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getSubjects = async (req, res) => {
  try {
    const user = req.user;
    
    const subjectsWithPercentage = (user.subjects || []).map((subject) => ({
      id: subject.id,
      subjectName: subject.subjectName,
      totalClasses: subject.totalClasses,
      attendedClasses: subject.attendedClasses,
      lastMarkedDate: subject.lastMarkedDate,
      attendancePercentage:
        subject.totalClasses > 0
          ? ((subject.attendedClasses / subject.totalClasses) * 100).toFixed(2)
          : 0,
    }));

    res.json({ subjects: subjectsWithPercentage });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.markAttendance = async (req, res) => {
  try {
    const { subjectId, status } = req.body;

    if (!subjectId || !status) {
      return res.status(400).json({ message: 'Subject ID and status are required' });
    }

    if (!['present', 'absent'].includes(status)) {
      return res.status(400).json({ message: 'Status must be present or absent' });
    }

    const user = req.user;
    const subject = (user.subjects || []).find(s => s.id === subjectId);

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const updatedSubject = await UserModel.updateSubject(req.userId, subjectId, {
      totalClasses: subject.totalClasses + 1,
      attendedClasses: status === 'present' ? subject.attendedClasses + 1 : subject.attendedClasses,
      lastMarkedDate: new Date().toISOString(),
    });

    await UserModel.updateUser(req.userId, { lastMarkedDate: new Date().toISOString() });

    const attendancePercentage =
      updatedSubject.totalClasses > 0
        ? ((updatedSubject.attendedClasses / updatedSubject.totalClasses) * 100).toFixed(2)
        : 0;

    res.json({
      message: 'Attendance marked successfully',
      subject: {
        id: updatedSubject.id,
        subjectName: updatedSubject.subjectName,
        totalClasses: updatedSubject.totalClasses,
        attendedClasses: updatedSubject.attendedClasses,
        attendancePercentage,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const user = req.user;

    let totalClasses = 0;
    let totalAttended = 0;

    (user.subjects || []).forEach((subject) => {
      totalClasses += subject.totalClasses;
      totalAttended += subject.attendedClasses;
    });

    const overallPercentage =
      totalClasses > 0 ? ((totalAttended / totalClasses) * 100).toFixed(2) : 0;

    const isSafe = overallPercentage >= 75;

    let warningMessage = null;
    if (!isSafe && totalClasses > 0) {
      const classesNeeded = Math.ceil(
        (0.75 * totalClasses - totalAttended) / (1 - 0.75)
      );
      warningMessage = `You need ${classesNeeded} more classes to reach 75%`;
    }

    const subjectsWithPercentage = (user.subjects || []).map((subject) => ({
      id: subject.id,
      subjectName: subject.subjectName,
      totalClasses: subject.totalClasses,
      attendedClasses: subject.attendedClasses,
      attendancePercentage:
        subject.totalClasses > 0
          ? ((subject.attendedClasses / subject.totalClasses) * 100).toFixed(2)
          : 0,
    }));

    res.json({
      userName: user.name,
      overallPercentage: parseFloat(overallPercentage),
      isSafe,
      warningMessage,
      subjects: subjectsWithPercentage,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;

    await UserModel.deleteSubject(req.userId, subjectId);

    res.json({ message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

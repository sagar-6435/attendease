const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const auth = require('../middleware/auth');

router.post('/add', auth, subjectController.addSubject);
router.get('/list', auth, subjectController.getSubjects);
router.post('/mark-attendance', auth, subjectController.markAttendance);
router.get('/dashboard', auth, subjectController.getDashboard);
router.delete('/:subjectId', auth, subjectController.deleteSubject);

module.exports = router;

    const express = require('express');
    const authController = require('../controllers/authController');
    const courseController = require('../controllers/courseController');
    const moduleController = require('../controllers/moduleController');
    const lectureController = require('../controllers/lectureController');
    const { adminAuth } = require('../middleware/auth');
    // const { uploadSingle, uploadMultiple, default: upload } = require('../middleware/upload');
    const { uploadLectureFiles } = require('../middleware/pdfuload');
    const upload = require('../middleware/upload');

    const router = express.Router();
    

    // auth
    router.post('/register', authController.registerAdmin); // one-time only in dev
    router.post('/login', authController.login);

    // courses
    router.post('/courses', adminAuth, upload.single('thumbnail'), courseController.createCourse);
    router.get('/courses', courseController.listCourses);
    router.get('/courses/:id', courseController.getCourse);
    router.put('/courses/:id', adminAuth, upload.single('thumbnail'), courseController.updateCourse);
    router.delete('/courses/:id', adminAuth, courseController.removeCourse);

    // modules
    router.post('/modules', adminAuth, moduleController.createModule);
    router.get('/modules/:id', moduleController.listModules);
    router.put('/modules/:id', adminAuth, moduleController.updateModule);
    router.delete('/modules/:id', adminAuth, moduleController.deleteModule);

    // lectures
    router.post('/lectures', adminAuth, upload.single('notes'), lectureController.createLecture);
    router.get('/lectures/:id', lectureController.listLecturesByModule);
    router.put('/lectures/:id', adminAuth, uploadLectureFiles, lectureController.updateLecture);
    router.patch('/lectures/:id',  uploadLectureFiles, lectureController.updateCompleteLectureStatus);
    router.delete('/lectures/:id', adminAuth, lectureController.deleteLecture);
    router.get('/lectures', lectureController.listAllLectures);

    module.exports = router;
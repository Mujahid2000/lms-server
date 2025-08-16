const Course = require('../models/Course');
const courseService = require('../services/courseService');

exports.createCourse = async (req, res) => {
  try {
    const { title, price, description,course } = req.body;
    // console.log()
    let thumbnail = null;
    if (req.file) {
      thumbnail = req?.file?.path;
      // console.log(thumbnail)
    }

    const newCourse = new Course({
      title,
      price,
      description,
      thumbnail
    });

    await newCourse.save();
    res.status(201).json({ message: "Course created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.listCourses = async (_req, res) => {
  try {
    const courses = await courseService.getCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to list courses', error: error.message });
  }
};

exports.getCourse = async (req, res) => {
  console.log(req.params.id)
  try {
    const course = await courseService.getCourseById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get course', error: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (req.file) {
      // Convert file buffer to Base64
      payload.thumbnail = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    }
    const course = await courseService.updateCourse(req.params.id, payload);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update course', error: error.message });
  }
};

exports.removeCourse = async (req, res) => {
  try {
    await courseService.deleteCourse(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete course', error: error.message });
  }
};
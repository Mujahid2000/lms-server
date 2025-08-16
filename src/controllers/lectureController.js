const lectureService = require('../services/lectureService');


exports.createLecture = async (req, res) => {
  try {
    const { moduleId, title, duration, videoUrl } = req.body;

    if (!moduleId || !title) {
      return res
        .status(400)
        .json({ message: "moduleId and title are required" });
    }

    let notes = [];

    // Handle uploaded PDF notes (single or multiple files)
    if (req.file) { 
      notes = req?.file?.path;
     }
      // console.log(thumbnail) }

    const lecture = await lectureService.createLecture(moduleId, {
      title,
      videoUrl,
      duration,
      notes,
    });

    res.status(201).json(lecture);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listLecturesByModule = async (req, res) => {
  const lectures = await lectureService.getLecturesByModule(req.params.id);
  res.json(lectures);
};

exports.updateLecture = async (req, res) => {
  const id = req.params.id;
  const { moduleId, title, duration, videoUrl } = req.body;

  // Validate required fields
  if (!moduleId || !title || !duration || !videoUrl) {
    return res.status(400).json({ message: 'moduleId, title, duration, and videoUrl are required' });
  }

  let notes = [];

  // Handle uploaded PDF notes
  if (req.files && req.files.notes) {
    notes = req.files.notes.map(file => file.buffer.toString("base64"));
  } else if (req.body.notes) {
    // If no new files are uploaded, use existing notes if provided in the body
    notes = Array.isArray(req.body.notes) ? req.body.notes : [req.body.notes];
  }

  // Construct the payload object
  const payload = {
    moduleId,
    title,
    duration: Number(duration), // Ensure duration is a number
    videoUrl,
    notes,
  };

  try {
    const updated = await lectureService.updateLecture(id, payload);
    res.json(updated);
  } catch (error) {
    console.error("Error updating lecture:", error);
    res.status(500).json({ message: 'Failed to update lecture', error: error.message });
  }
};

exports.deleteLecture = async (req, res) => {
  await lectureService.deleteLecture(req.params.id);
  res.json({ message: 'Lecture deleted' });
};

exports.listAllLectures = async (req, res) => {
  const { courseId, moduleId } = req.query;
  const filter = {};
  if (moduleId) filter.module = moduleId;

  // when courseId provided, we filter after populate in service
  const lectures = await lectureService.getAllLectures(filter);
  if (courseId) {
    const filtered = lectures.filter((l) => l.module && l.module.course && String(l.module.course) === String(courseId));
    return res.json(filtered);
  }
  res.json(lectures);
};


exports.updateCompleteLectureStatus = async (req, res) => {
  const id = req.params.id;
  // console.log(id)
  const { isCompleted, isUnlocked } = req.body;
// console.log(isCompleted , isUnlocked)
  // Validate boolean fields
  if (typeof isCompleted !== "boolean" || typeof isUnlocked !== "boolean") {
    return res.status(400).json({
      message: "completed and isUnlocked must be boolean values (true/false)"
    });
  }

  try {
    const updated = await lectureService.updateLecture(id, {
      isCompleted,
      isUnlocked
    });

    res.json({
      message: "Lecture status updated successfully",
      data: updated
    });
  } catch (error) {
    console.error("Error updating lecture:", error);
    res.status(500).json({
      message: "Failed to update lecture",
      error: error.message
    });
  }
};
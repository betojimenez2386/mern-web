const course = require("../models/course");
const Course = require("../models/course");
const image = require("../utils/image");

async function crreateCourse(req, res) {
  const course = new Course(req.body);

  const imagePath = image.getFilePath(req.files.miniature);
  course.miniature = imagePath;

  try {
    const courseStored = await course.save();
    console.log(courseStored);
    res.status(201).send(courseStored);
  } catch (error) {
    res.status(400).send({ msg: "Error al crear el curso" });
    console.log(error);
  }
}

async function getCourse(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  try {
    const courses = await Course.paginate({}, options);
    console.log(courses);
    res.status(200).send(courses);
  } catch (error) {
    res.status(400).send({ msg: "Error al obtener los cursos" });
    console.log(error);
  }
}

async function updateCourse(req, res) {
  const { id } = req.params;
  const courseData = req.body;

  if (req.files.miniature) {
    const imagePath = image.getFilePath(req.files.miniature);
    courseData.miniature = imagePath;
  }

  try {
    const response = await Course.findByIdAndUpdate({ _id: id }, courseData);
    console.log(response);
    res.status(200).send({ msg: "Actualizacion Correcta " });
  } catch (error) {
    res.status(400).send({ msg: "Error al Actualizar el curso" });
    console.log(error);
  }
}

async function deleteCourse(req, res) {
  const { id } = req.params;
  try {
    const response = await Course.findByIdAndDelete({ _id: id });
    console.log(response);
    res.status(200).send({ msg: " Curso Eliminado" });
  } catch (error) {
    res.status(400).send({ msg: " Error al eliminar Curso" });
    console.log(error);
  }
}

module.exports = {
  crreateCourse,
  getCourse,
  updateCourse,
  deleteCourse,
};

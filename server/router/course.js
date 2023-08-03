const express = require("express");
const multiparty = require("connect-multiparty");
const CourseController = require("../controllers/course");
const md_auth = require("../middlewares/authenticate");

const md_upload = multiparty({ uploadDir: "./upload/course" });
const api = express.Router();

api.post(
  "/course",
  [md_auth.asureAuth, md_upload],
  CourseController.crreateCourse
);
api.get("/courses", CourseController.getCourse);
api.patch(
  "/course/:id",
  [md_auth.asureAuth, md_upload],
  CourseController.updateCourse
);
api.delete("/course/:id", [md_auth.asureAuth], CourseController.deleteCourse);

module.exports = api;

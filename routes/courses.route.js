const express = require('express');
const router = express.Router()

const {validationSchema} = require('../middleware/validationSchema');
const coursesController = require("../controllers/courses.controllers");

router.route("/")
            .get(coursesController.getAllCourses)
            .post(validationSchema(),coursesController.addCourse);

router.route("/:courseID")
            .get(coursesController.getCourse)
            .patch(coursesController.updateCoures)
            .delete(coursesController.deleteCoures);



module.exports = router;
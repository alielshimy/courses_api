const express = require('express');
const router = express.Router()

const validationSchema = require('../middleware/validationSchema');
// const coursesController = require("../controllers/coursesBasic.controllers");
const coursesController = require("../controllers/coursesMongo.controllers");
const verifiyToken = require("../middleware/verifyToken");

router.route("/")
            .get(coursesController.getAllCourses)
            .post(verifiyToken ,validationSchema.courseValidationSchema(),coursesController.addCourse);

router.route("/:courseID")
            .get(coursesController.getCourse)
            .patch(coursesController.updateCoures)
            .delete(coursesController.deleteCoures);



module.exports = router;
const express = require('express');
const router = express.Router()

const validationSchema = require('../middleware/validationSchema');
// const coursesController = require("../controllers/coursesBasic.controllers");
const coursesController = require("../controllers/coursesMongo.controllers");
const verifiyToken = require("../middleware/verifyToken");
const userRoles = require("../utils/userRoles");
const allowedTo = require("../middleware/allowedTo");

router.route("/")
            .get(coursesController.getAllCourses)
            .post(verifiyToken ,validationSchema.courseValidationSchema(),coursesController.addCourse);

router.route("/:courseID")
            .get(coursesController.getCourse)
            .patch(coursesController.updateCoures)
            .delete(verifiyToken , allowedTo(userRoles.ADMIN, userRoles.MANAGER),coursesController.deleteCoures);



module.exports = router;
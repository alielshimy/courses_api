const { validationResult } = require('express-validator');
const Course = require('../models/course.model');
const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middleware/asyncWrapper');
const appError = require('../utils/appError');

const getAllCourses = asyncWrapper(
    async (req, res) => {
        const limit = req.query.limit || 10;
        const page = req.query.page || 1;
        const skip = (page-1)*limit;
        const courses = await Course.find({},{"__v": false}).limit(limit).skip(skip);
        res.json({
            status: httpStatusText.SUCCESS,
            data: {courses}
        });
    }
);

const getCourse = asyncWrapper(
    async (req, res, next) => {
        const courseID = req.params.courseID;
        const course = await Course.findById(courseID);
        if (!course) {
            const error = appError.create('Course not found', 404, httpStatusText.FAIL);
            return next(error);
        }
        res.json({status: httpStatusText.SUCCESS, data: {course}});
    }
);
// return res.status(404).json({status: httpStatusText.FAIL, data: {course: null}});
// try {
// } catch (err) {
//     return res.status(400).json({status: httpStatusText.ERROR, message: err.message});
// }
    
const addCourse = asyncWrapper(
    async (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = appError.create(errors.array(), 404 , httpStatusText.FAIL);
            return next(error);
        }
        
        const newCourse = new Course(req.body);
        await newCourse.save();
        
        res.status(201).json({status: httpStatusText.SUCCESS ,data: {course: newCourse}});
    }
);
// return res.status(400).json({status: httpStatusText.FAIL ,data: errors.array()});
    
const updateCoures = asyncWrapper(
    async (req, res) => {
        const courseID = req.params.courseID;
        const updatedCourse = await Course.updateOne({ _id: courseID }, { $set: { ...req.body } });
        return res.status(200).json({status: httpStatusText.SUCCESS, data: {course: updateCoures}});
    }
);
// try {
// } catch (err) {
//     return res.status(400).json({status: httpStatusText.ERROR, message: err.message});
// }

const deleteCoures = asyncWrapper(
    async (req, res) => {
        const courseID = req.params.courseID;
        await Course.deleteOne({ _id: courseID });
        return res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
    }
);
// try {
// } catch (err) {
//     return res.status(400).json({status: httpStatusText.ERROR, message: err.message});
// }

module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCoures,
    deleteCoures
};
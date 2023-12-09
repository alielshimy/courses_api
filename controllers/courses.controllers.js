const {validationResult} = require('express-validator');
// const Course = require("../models/course.model");
let {courses} = require("../data/courses");

const getAllCourses = (req, res) => {
    res.json(courses);
};

const getCourse = (req, res) => {
    const courseID = +req.params.courseID;
    const course = courses.find( (course) => course.id === courseID);
    if(!course) {
        return res.status(404).json({msg: "course not found"});
    }
    res.json(course);
};

const addCourse = (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json(errors.array());
    }

    const course = {id: courses.length + 1, ...req.body};
    courses.push(course)
    res.status(201).json(course);
};

const updateCoures = (req, res) => {
    const courseID = +req.params.courseID;
    let course = courses.find( (course) => course.id === courseID);
    if(!course) {
        return res.status(404).json({msg: "course not found"});
    }
    course = {...course, ...req.body};

    res.json(course);
};

const deleteCoures = (req,res) => {
    const courseID = +req.params.courseID;
    courses = courses.filter( (course) => course.id !== courseID);
    res.status(200).json({success: true});
};

module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCoures,
    deleteCoures
};
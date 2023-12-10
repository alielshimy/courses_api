const {validationResult} = require('express-validator');
const Course = require('../models/course.model');


const getAllCourses = async (req,res) => {
    const courses = await Course.find();
    res.json(courses);
}

const getCourse = async (req, res) => {
    const courseID = req.params.courseID;
    try{
    const course = await Course.findById(courseID);
    if(!course) {
        return res.status(404).json({msg: "course not found"});
    }
    res.json(course);
    } catch (err) {
        return res.status(400).json({error: err});
    }   
};

const addCourse = async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const newCourse = new Course(req.body);
    await newCourse.save();
    
    res.status(201).json(newCourse);
};

const updateCoures = async (req, res) => {
    const courseID = req.params.courseID;
    try {
        const updatedCourse = await Course.updateOne({_id : courseID }, {$set: {...req.body}});
        return res.status(200).json(updatedCourse);
    } catch (err) {
        return res.status(400).json({error: err});
    }

};

const deleteCoures = async (req,res) => {
    const courseID = req.params.courseID;
    try {
        const response = await Course.deleteOne({_id: courseID});
        res.status(200).json({success: true, msg: response});
    } catch (err) {
        return res.status(400).json({error: err});
    }
};

module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCoures,
    deleteCoures
};
const { validationResult } = require('express-validator');
const asyncWrapper = require('../middleware/asyncWrapper');
const User = require('../models/user.model');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/generateJWT');

const getAllUsers = asyncWrapper(
    async (req, res) => {        
        const limit = req.query.limit || 10;
        const page = req.query.page || 1;
        const skip = (page-1)*limit;
        const users = await User.find({},{"__v": false, "password": false}).limit(limit).skip(skip);
        res.json({
            status: httpStatusText.SUCCESS,
            data: {users}
        });
    }
);

const register = asyncWrapper(
    async (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = appError.create(errors.array(), 404 , httpStatusText.FAIL);
            return next(error);
        }
        
        const {firstName, lastName, email, password, role} = req.body;

        const user = await User.findOne({email: email});

        if(user) {
            const error = appError.create('User already exists', 404, httpStatusText.FAIL);
            return next(error);
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            avatar: req.file.filename
        });

        const token = await generateJWT({email: newUser.email, id: newUser._id, role: newUser.role})
        newUser.token = token;
        await newUser.save();
        res.status(201).json({status: httpStatusText.SUCCESS, data: {user: newUser}});
    }
);

const login = asyncWrapper(
    async (req, res, next) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = appError.create(errors.array(), 404 , httpStatusText.FAIL);
            return next(error);
        }

        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        
        if(!user) {
            const error = appError.create('User does not exist', 404, httpStatusText.FAIL);
            return next(error);
        }
        
        const result = await bcrypt.compare(password, user.password);
        if(result){
            const token = await generateJWT({email: user.email, id: user._id, role: user.role});
            return res.status(200).json({status: httpStatusText.SUCCESS, data: {token}});
        } else {
            const error = appError.create('Wrong email and password combination', 404, httpStatusText.FAIL);
            return next(error);
        }

    }
);

module.exports = {
    getAllUsers,
    register,
    login
};
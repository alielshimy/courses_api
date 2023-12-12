const express = require('express');
const router = express.Router()

const validationSchema = require('../middleware/validationSchema');
const usersController = require('../controllers/users.controllers');
const verifiyToken = require('../middleware/verifyToken');

router.route("/")
            .get(verifiyToken, usersController.getAllUsers);

router.route("/register")
            .post(validationSchema.registerValidationSchema(), usersController.register);

router.route("/login")
            .post(validationSchema.loginValidationSchema(), usersController.login);


module.exports = router;
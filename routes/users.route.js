const express = require('express');
const multer = require('multer');

const router = express.Router()

const appError = require('../utils/appError');
const httpStatusText = require('../utils/httpStatusText');

const destStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        const extension = file.mimetype.split('/')[1];
        const fileName = `user-${Date.now()}.${extension}`;
        cb(null, fileName);
    }
})

const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0];
    if(imageType === 'image') {
        return cb(null,true);
    }else{
        return cb(appError.create("Invalid file type", 400, httpStatusText.FAIL),false);
    }
}

const upload = multer({
    storage: destStorage,
    fileFilter: fileFilter});

const validationSchema = require('../middleware/validationSchema');
const usersController = require('../controllers/users.controllers');
const verifiyToken = require('../middleware/verifyToken');

router.route("/")
            .get(verifiyToken, usersController.getAllUsers);

router.route("/register")
            .post(upload.single("avatar"), usersController.register);
            // validationSchema.registerValidationSchema(), 
router.route("/login")
            .post(validationSchema.loginValidationSchema(), usersController.login);


module.exports = router;
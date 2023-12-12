const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');
const User = require('../models/user.model');
const userRoles = require('../utils/userRoles');


module.exports = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.currentUser.role))
        {
            const error = appError.create("This role is not authorized", 401);
            return next(error);
        }
        return next();  
    }
}
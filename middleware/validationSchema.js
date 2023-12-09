const {body} = require("express-validator");

const validationSchema = () => {
    return [
        body('title')
            .notEmpty()
            .withMessage("Title is empty")
            .isLength({min: 2})
            .withMessage("Title is less than 2 characters") ,
        body('price')
            .notEmpty()
            .withMessage("Price is empty")
    ]
}

module.exports = {
    validationSchema
}
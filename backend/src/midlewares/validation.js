const { body, checkSchema, validationResult } = require('express-validator')

signUpValidation = checkSchema({
    email: {
        in: ['body'],
        isEmail: {
            errorMessage: "Enter Correct email",
        }
    }
})

// body('email')
//     .exists({
//         errorMessage: "Email is required"
//     })
//     .isEmail({
//         errorMessage: "Enter Correct email"
//     })


module.exports = {
    signUpValidation
}
const { body, validationResult } = require('express-validator');

async function validateResult(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    next();
}

const registerRules = [

    body("username").isString()
        .withMessage("username must string")
        .isLength({ min: 3, max: 20 })
        .withMessage("must be 3 or 20"),

    body("email")
        .isEmail()
        .withMessage("invalid email address")
    ,
    body("password")
        .isLength({ min: 6 })
        .withMessage("password must be 6 long"),

    validateResult


]

const loginRules = [
    body("username").isString().withMessage("username required")
    , body("password").isString().withMessage("password enter please")
,
    validateResult
]

module.exports = { registerRules,loginRules }
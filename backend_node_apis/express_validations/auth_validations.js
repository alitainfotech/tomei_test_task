/* input validation libraries */
const { check, validationResult } = require('express-validator');

module.exports = {

    async validate_login(req){
        await check('email')
            .notEmpty().withMessage('email is required')
            .isLength({ max: 200 }).withMessage('email maximum length 200').run(req);
        await check('password')
            .notEmpty().withMessage('password is required')
            .isLength({ max: 30 }).withMessage('password maximum length 30').run(req);

        /* format the errors */
        const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
            return `${msg}`;
        };

        const result = validationResult(req).formatWith(errorFormatter); // if no error return true else false

        return new Promise((resolve, reject) => {
            if (result.isEmpty()) {
                resolve({});
            } else {
                reject(result.mapped());
            }
        });
    },

    async validate_register(req){
        await check('name')
            .notEmpty().withMessage('username is required')
            .isLength({ max: 200 }).withMessage('name maximum length 200').run(req);
        await check('email')
            .notEmpty().withMessage('email is required')
            .isLength({ max: 200 }).withMessage('email maximum length 200').run(req);
        await check('password')
            .notEmpty().withMessage('password is required')
            .isLength({ max: 30 }).withMessage('password maximum length 30').run(req);
        await check('avatar')
            .notEmpty().withMessage('avatar is required').run(req);

        /* format the errors */
        const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
            return `${msg}`;
        };

        const result = validationResult(req).formatWith(errorFormatter); // if no error return true else false

        return new Promise((resolve, reject) => {
            if (result.isEmpty()) {
                resolve({});
            } else {
                reject(result.mapped());
            }
        });
    }

}
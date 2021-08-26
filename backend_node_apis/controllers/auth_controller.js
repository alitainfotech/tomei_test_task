/* model */
var model = require('../models/user');

/* input validation libraries */
const { check, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt = require('jsonwebtoken');
var jwtKey = process.env.JWT_SECRET;
var expiresTime = "1d";

class auth_controller {
    constructor() {
    }

    /* user login */
    async login(req,res){
        await check('email')
            .notEmpty().withMessage('email is required')
            .isEmail().withMessage('please enter valid email')
            .isLength({ max: 200 }).withMessage('email maximum length 200').run(req);
        await check('password')
            .notEmpty().withMessage('password is required')
            .isLength({ max: 30 }).withMessage('password maximum length 30').run(req);

        /* format the errors */
        const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
            return `${msg}`;
        };
        const result = validationResult(req).formatWith(errorFormatter); // if no error return true else false

        if (!result.isEmpty()) {
            res.status(200).json({
                message:'user login validation error',
                success:false,
                data:{
                    errors:result.mapped()
                }
            });
        } else {
            model.findOne({
                where:{
                    email:req.body.email
                }
            }).then(user=>{
                var result = bcrypt.compareSync(req.body.password,user.user_password); // admin/admin@123

                if(result){
                    jwt.sign({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    },jwtKey,{expiresIn: expiresTime},(err,token) => {
                        res.status(200).json({
                            message:'user login successfully',
                            success:true,
                            data:{ token:token }
                        });
                    });
                } else {
                    res.status(400).json({
                        message:'user credentials is wrong!',
                        success:false,
                        data:{}
                    });
                }
            }).catch(error=>{
                res.status(400).json({
                    message:'sorry this email is not found!',
                    success:false,
                    data:{}
                });
            })
        }
    }

    /* user register */
    async register(){
        await check('name')
            .notEmpty().withMessage('name is required')
            .isLength({ max: 200 }).withMessage('name maximum length 200').run(req);
        await check('email').not().isEmpty().withMessage('email is required')
            .isEmail().withMessage('email is not valid')
            .custom(value => {
                if(value){
                    return model.findOne({
                        where:{
                            email:value
                        }
                    }).then(user => {
                        if(user){
                            return Promise.reject('email already registered!')
                        }
                        return true;
                    })
                }
            }).run(req),
        await check('password')
            .notEmpty().withMessage('password is required')
            .isLength({ max: 30 }).withMessage('password maximum length 30')
            .custom((value, { req }) => {
                if(value !== req.body.confirm_password){
                    throw new Error('password is not match')
                } else {
                    return value;
                }
            }).run(req),
        await check('avatar').notEmpty().withMessage('avatar is required').run(req),
        await check('confirm_password').notEmpty().withMessage('confirm password is required').run(req)

        /* format the errors */
        const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
            return `${msg}`;
        };
        const result = validationResult(req).formatWith(errorFormatter); // if no error return true else false

        if (!result.isEmpty()) {
            res.status(200).json({
                message:'user register validation errors',
                success:false,
                data:{
                    errors: result.mapped()
                }
            });
        } else {
            model.create({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, saltRounds)
            }).then(user => {
                jwt.sign({
                    name:user.name,
                    email:user.email,
                },jwtKey,{expiresIn:expiresTime},(err,token)=>{
                    res.status(200).json({
                        message:'user register successfully',
                        success:true,
                        data:{token:token}
                    });
                })
            }).catch(err => {
                res.status(400).json({
                    message:'user register failed',
                    success:false,
                    data:{
                        errors:err
                    }
                });
            });
        }
    }
}

module.exports = new auth_controller();
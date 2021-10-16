import User from '../models/user'
import Course from '../models/course'
import UserCourse from '../models/userCourse'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import * as emailController from './email.controller.js'
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import user from '../models/user'
const path = require('path')

export const getCourseByUserId = async(req, res) =>{
    
    const {name, email, password, lastname} = req.body

    const newUser = new User({
        name,
        email,
        lastname,
        confirmation:1,
        password: await User.encryptPassword(password)
    })


    try {
      const userSaved = await newUser.save();
    } catch (error) {
      return res.json({error: error.message})
    }
    
    const token = jwt.sign({id: newUser._id}, config.SECRET, {expiresIn:'20m'});

    emailController.confirmationEmail(newUser.email, newUser.name, token, res)
}



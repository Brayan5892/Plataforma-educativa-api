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
import { ObjectId } from "mongodb";

export const getCourseByUserId = async(req, res) =>{
    
    var id=req.params.userId;

    try {
        const courses = await UserCourse.find({user:ObjectId(id)})
        if(courses){
            res.json(courses)
        }else{
            res.json({message:"No se han encontrado cursos para este usuario"})
        }
    } catch (error) {
        res.json({error:error})
    }

}



export const createCourse = async(req, res)=>{

    const {name, description} = req.body

    const newCourse = new Course({
        name, 
        description
    })
    console.log("Llega")
    

    try {
      const courseSaved = await newCourse.save();
      return res.json({course: courseSaved})
    } catch (error) {
      return res.json({error: error.message})
    }

}

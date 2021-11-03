import User from '../models/user'
import Course from '../models/course'
import UserCourse from '../models/userCourse'
import jwt from 'jsonwebtoken'
import * as emailController from './email.controller.js'
import nodemailer from 'nodemailer'
import config from '../config.js'
import user from '../models/user'
const path = require('path')
import { ObjectId } from "mongodb";

export const getCourseByUserId = async(req, res) =>{
    
    var id=req.params.userId;

    try {
        const courses = await UserCourse.find({user:ObjectId(id)}).populate('course')
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
        description,
        imageUrl
    })
 
    try {
      const courseSaved = await newCourse.save();
      return res.json({course: courseSaved})
    } catch (error) {
      return res.json({error: error.message})
    }

}

export const getNewCourses = async(req, res)=>{

    const token = req.headers["x-access-token"];

    var id;

    jwt.verify(token, config.SECRET, async function  (err, decoded) {
        if(err){
           res.json({message:"Token invalido"})
        }else{
           id = decoded.id;  
        }
    })

    var courses, coursesUser
    try {
        courses = await Course.find()
        coursesUser = await UserCourse.find({user:ObjectId(id)}).populate('course')
    } catch (error) {
        return res.json({error: error.message})
    }

    coursesUser.forEach(cu => {
        courses = courses.filter((c) => {return c._id != cu.course._id.toString()})
    });
    
    return res.json({courses})
}

export const getById = async(req, res)=>{

       
    var id=req.params.id;

    try {
        const courses = await Course.findById(id)
        if(courses){
            res.json(courses)
        }else{
            res.json({message:"No se han encontrado cursos para este usuario"})
        }
    } catch (error) {
        res.json({error:error})
    }
   
}

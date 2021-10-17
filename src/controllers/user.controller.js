import User from '../models/user'
import UserCourse from '../models/userCourse'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import * as emailController from './email.controller.js'
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import user from '../models/user'
const path = require('path')

export const getUserById = async(req, res) =>{

    try {
        const user = await User.findById(req.params.id)
        res.json({user})
    } catch (error) {
        res.json({message:"Usuario no encontrado"})
    }

}

export const getUserAuthenticate= async(req, res) =>{

    const token = req.headers["x-access-token"];
    
    if(!token) return res.json({message:"No token provided"})

    jwt.verify(token, config.SECRET, async function  (err, decoded) {
        if(err){
            res.json({message:"Token invalido"})
        }else{
            req.userId = decoded.id;  

            try {
                const user = await User.findById(req.userId,{password:0})
                res.json({user})
            } catch (error) {
                res.json({message: "Usuario no encontrado"})
            }

        }
    })

}

export const suscribeCourse= async(req, res) =>{

    const token = req.headers["x-access-token"];
    
    if(!token) return res.json({message:"No token provided"})

    jwt.verify(token, config.SECRET, async function  (err, decoded) {
        if(err){
            res.json({message:"Token invalido"})
        }else{
            req.userId = decoded.id;  

            const newUserCourse = new UserCourse({
                user:req.userId,
                course:req.courseId,
                fase:0,
                score:0
            })

            try {
                const userCourseSaved = await UserCourse.Save()
                res.json({userCourseSaved})
            } catch (error) {
                res.json({message: "Se ha producido un error"})
            }

        }
    })

}

export const beginCourse = async(req, res) =>{
    const token = req.headers["x-access-token"];

    jwt.verify(token, config.SECRET, async function  (err, decoded) {
        if(err){
            res.json({message:"Token invalido"})
        }else{
            req.userId = decoded.id;  

            try {
                const user = await User.findById(req.userId,{password:0})
                res.json({user})
            } catch (error) {
                res.json({message: "Usuario no encontrado"})
            }

        }
    })


}

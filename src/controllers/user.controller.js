import User from '../models/user'
import UserCourse from '../models/userCourse'
import ScoreHistory from '../models/scoreHistory'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import hbs from 'nodemailer-express-handlebars'
import user from '../models/user'
import e from 'express'
const path = require('path')
import { ObjectId } from "mongodb";
import * as emailController from './email.controller.js'
import { UV_FS_O_FILEMAP } from 'constants'
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
                course:req.body.courseId,
                fase:0,
                score:0,
                state:req.body.state
            })
            
            try {
                const userCourseSaved = await newUserCourse.save()
                res.json({userCourseSaved})
            } catch (error) {
                res.json({message: "Se ha producido un error: "+error.message})
            }

        }
    })

}

export const findSuscribe = async(req, res) =>{

    const token = req.headers["x-access-token"];
    
    if(!token) return res.json({message:"No token provided"})

    jwt.verify(token, config.SECRET, async function  (err, decoded) {
        if(err){
            res.json({message:"Token invalido"})
        }else{
            req.userId = decoded.id;  

            var id=req.params.courseId;
            
            try {
                const userCourse = await UserCourse.find({course:ObjectId(id), user:ObjectId(req.userId)})
                if(userCourse.length>0){
                    res.json({response:userCourse})
                }else{
                    res.json({response:userCourse})
                }
            } catch (error) {
                res.json({message: "Se ha producido un error: "+error.message})
            }

        }
    })

}

export const uptadeCourseById = async(req,res)=>{
    
    try {
        const UserCourseUpdate = await UserCourse.findByIdAndUpdate(ObjectId(req.params.courseId), req.body,{
            new : true
        })
        
        if(req.body.score){ 
            const newScoreHistory = new ScoreHistory({
                userCourse: UserCourseUpdate._id,
                score:req.body.score
            })    
            try{
                const scoreHistorySaved =  await newScoreHistory.save()
         
            }catch (error) {
                res.json({error: error})
            }
        }
        
        res.status(200).json(UserCourseUpdate)
    } catch (error) {
        res.json({error: error})
    }

}


export const contactMessage = async(req,res)=>{
    
    try {
        emailController.contactEmail(req.body.message, res)
    } catch (error) {
        res.json({error: error})
    }

}

export const updateUser= async(req, res) =>{  

    const userUpdate = await User.findByIdAndUpdate(ObjectId(req.params.userId), req.body,{
        new:true
    })
    
    if(userUpdate){
        res.json({message:"Se actualizaron sus datos satisfactoriamente"})
    }else{
        res.json('No se ha encontrado usuario')
    }
       
}
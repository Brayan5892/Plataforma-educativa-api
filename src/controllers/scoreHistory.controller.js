import User from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import * as emailController from './email.controller.js'
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import user from '../models/user'
import ScoreHistory from '../models/scoreHistory'
import { ObjectId } from "mongodb";
const path = require('path')

export const findByUserCourse = async(req, res) =>{

    var id=req.params.userCourseId;
    
    try {
        const scoreHistory = await ScoreHistory.find({userCourse:ObjectId(id)})

        if(scoreHistory){
            res.json({scoreHistory})
        }else{
            res.json({message:"No hay scores registrados"})
        }
        
        
    } catch (error) {
        res.json({message: "Se ha producido un error: "+error.message})
    }

}
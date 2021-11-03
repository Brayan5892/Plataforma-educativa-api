import User from '../models/user'
import UserCourse from '../models/userCourse'
import Question from '../models/question'
import jwt from 'jsonwebtoken'
import config from '../config.js'
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

export const create= async(req, res)=>{

    const {question, answer1,answer2,answer3,answer4,answerCorrect,explanation,course} = req.body

    const newQuestion = new Question({
        question, 
        answer1,
        answer2,
        answer3,
        answer4,
        answerCorrect,
        course,
        explanation
    })
    

    try {
      const questionSaved = await newQuestion.save();
      return res.json({question: questionSaved})
    } catch (error) {
      return res.json({error: error.message})
    }

}
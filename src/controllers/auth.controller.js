import User from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import * as emailController from './email.controller.js'
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import user from '../models/user'
const path = require('path')

export const signUp = async(req, res) =>{
  
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


export const login = async(req, res) =>{
    
    const userFound = await User.findOne({email: req.body.email})

    if(!userFound){
        return res.json({token: null, message: "User not found"})
    } 
 
    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if (!matchPassword){
        return res.json({token: null, message: 'Invalid password'})
    } 

    const token = jwt.sign({id: userFound._id}, config.SECRET,{expiresIn: 43200})

    res.json({token})
   
}

export const confirmationEmail = async(req, res) =>{
  const {token} = req.params;

  if(token){

      jwt.verify(token, config.SECRET, async function  (err, decoded) {
          if(err){
              res.json({message:"Token invalido"})
          }
         
          try {   

              const userUpdate = await User.findByIdAndUpdate(decoded.id,{
                confirmation: 2
              },{
                new:true
              })

              res.status(200).json({message:"Su cuenta se ha activado con exito"})

          } catch (error) {
              
              res.json(error)
          }

      })

  }else{
      res.json({message:"Token invalido"})
  }
}


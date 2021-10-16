import User from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
const path = require('path')


export const confirmationEmail = async(email, name, token, res) =>{

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secureConnection: false, 
        auth: {
            user: 'brayandelgado323@gmail.com',
            pass: 'brayanelcapo'
        },
        tls: {
          rejectUnauthorized: false
      }
      });
  
      transporter.use('compile', hbs({
        viewEngine: {
          extName: '.handlebars',
          partialsDir: path.join(__dirname, "views"),//your path, views is a folder inside the source folder
          layoutsDir: path.join(__dirname, "views"),
          defaultLayout: ''//set this one empty and provide your template below,
        },
        viewPath: path.join(__dirname, "views"),
        extName: '.handlebars',
      }));
  
      var mailOptions = { 
        from: 'brayandelgado323@gmail.com',
        to: email,
        subject: 'Confirmar correo',
        template:'confirmation',
    
        context: {
            link: `http://localhost:4002/ActivationAccount/${token}`,
            name: name
        } 

      };
   
      transporter.sendMail(mailOptions, function(error, info){
        if (error){
          return res.json({error: error.message})
        } else {
          return res.json({message:"Correo de activacion de cuenta enviado"})
        }
      });


}


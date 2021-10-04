import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/user'
import Role from '../models/role'

export const verifyToken = async (req, res, next) =>{
    try {
        const token = req.headers["x-access-token"];

        if(!token) return res.status(403).json({message:"No token provided"})

        const decoded = jwt.verify(token, config.SECRET)
        req.userId = decoded.id;

        const user = await User.findById(req.userId,{password:0})

        if(!user) return res.status(404).json({message: "No user found"})

        next()
    } catch (error) {
        return res.status(401).json({message:"Unauthorized"})
    }

}

export const isTeacher = async (req, res, next) =>{
    const user = await User.findById(req.userId)
    const roles = await Role.find({ _id : { $in: user.roles }})
    for (let i = 0; i < roles.length; i++) {     
        if(roles[i].name === "teacher"){
            next()
            return;
        }
    }

    return res.status(403).json({message: "Require teacher role"})
}

export const isStudent = async (req,res,next) =>{
    const user = await User.findById(req.userId)
    const roles = await Role.find({ _id : { $in: user.roles }})
    for (let i = 0; i < roles.length; i++) {     
        if(roles[i].name === "student"){
            next()
            return;
        }
    }
    return res.status(403).json({message: "Require student role"})
}


export const verifyEmail = async(req,res, next)=>{
    
}
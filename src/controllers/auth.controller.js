import User from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import Role from '../models/role'


export const signUp = async(req, res) =>{
  
    const {name, email, password, roles, lastname} = req.body
    const address=null;
    const telephone=null;
    const newUser = new User({
        name,
        email,
        lastname,
        address,
        telephone,
        password: await User.encryptPassword(password)
    })

    if(roles){
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(Role=>Role.id)
    }else{
        const role =  await Role.findOne({name: "user"})
        newUser.roles = [role.id]
    }

    const token = jwt.sign({user: newUser}, config.SECRET, {expiresIn:'20m'});

    
}


export const login = async(req, res) =>{
    
    const userFound = await User.findOne({email: req.body.email}).populate("roles");

    if(!userFound) return res.json({token: null, message: "User not found"})
 

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if (!matchPassword) return res.json({token: null, message: 'Invalid password'})

    for (let i = 0; i < userFound.roles.length; i++) {
      if(userFound.roles[i].name==='user'){
          const token = jwt.sign({id: userFound._id}, config.SECRET,{
              expiresIn: 43200
          })
      
          res.json({token})
      }
  }
  res.json({token: null, message: "User not found"})
   
}


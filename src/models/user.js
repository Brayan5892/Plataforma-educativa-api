import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    name: String,
    lastname: String,
    confirmation: Number,
    academic:String,
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
    
},{
    timestamps: true,
    versionKey: false
})

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, receivedPassword) =>{
   return await bcrypt.compare(password, receivedPassword)
}


export default model('User', userSchema);
import {Schema, model} from 'mongoose'


const courseSchema = new Schema({
    name: String,
    description: String,
    imageUrl: String,
    video: String
},{
    timestamps: true,
    versionKey: false
})




export default model('Course', courseSchema);
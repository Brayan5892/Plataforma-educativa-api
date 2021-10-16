import {Schema, model} from 'mongoose'


const userCourseSchema = new Schema({
    user: {
        ref: "User",
        type: Schema.Types.ObjectId
    },
    course: {
        ref: "Course",
        type: Schema.Types.ObjectId
    },
    fase:Number,
    score:Number
    
},{
    timestamps: true,
    versionKey: false
})




export default model('UserCourse',userCourseSchema);
import {Schema, model} from 'mongoose'


const questionSchema = new Schema({
    question: String,
    answer1: String,
    answer2: String,
    answer3: String,
    answer4: String,
    answerCorrect: Number,
    course_id: {
        ref: "Course",
        type: Schema.Types.ObjectId
    },
    explanation: String
},{
    timestamps: true,
    versionKey: false
})




export default model('Question', questionSchema);
import {Schema, model} from 'mongoose'

const scoreHistorySchema = new Schema({
    userCourse: {
        ref: "userCourse",
        type: Schema.Types.ObjectId
    },
    score:Number
    
},{
    timestamps: true,
    versionKey: false
})


export default model('scoreHistory', scoreHistorySchema);
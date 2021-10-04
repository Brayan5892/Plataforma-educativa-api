import mongoose from 'mongoose'
process.env.MONGODB_URI
mongoose.connect('mongodb+srv://proyecto_user:top123456@proyectofinal.b5aee.mongodb.net/ProyectoFinal?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
    
})
    .then(db=> console.log("Db is connected"))
    .catch(error=> console.log(error))
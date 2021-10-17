import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import {createRoles} from './libs/initialSetup'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import courseRoutes from './routes/course.routes'

const app=express();
createRoles();
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/auth',authRoutes)
app.use('/user',userRoutes)
app.use('/course',courseRoutes)

export default app
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import {createRoles} from './libs/initialSetup'
import authRoutes from './routes/auth.routes'

const app=express();
createRoles();
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/auth',authRoutes)

export default app
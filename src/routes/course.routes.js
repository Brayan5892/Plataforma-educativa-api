import {Router} from 'express'
const router = Router();
import * as courseController from '../controllers/course.controller'
import {authJwt} from '../middlewares/index.js'

router.post('/create', courseController.createCourse)

export default router;
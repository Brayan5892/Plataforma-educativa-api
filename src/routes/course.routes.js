import {Router} from 'express'
const router = Router();
import * as courseController from '../controllers/course.controller'
import {authJwt} from '../middlewares/index.js'

router.post('/create', courseController.createCourse)

router.get('/getByUserId/:userId', courseController.getCourseByUserId)

router.get('/getNewCourses', courseController.getNewCourses)

router.get('/getById/:id', courseController.getById)



export default router;
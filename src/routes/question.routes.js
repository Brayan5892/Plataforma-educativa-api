import {Router} from 'express'
const router = Router();
import * as questionController from '../controllers/questions.controller'
import {authJwt} from '../middlewares/index.js'

router.get('/:courseId', questionController.getQuestionsByCourseId)



export default router;
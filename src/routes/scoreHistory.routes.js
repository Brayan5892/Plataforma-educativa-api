import {Router} from 'express'
const router = Router();
import * as scoreHistoryController from '../controllers/scoreHistory.controller'
import {authJwt} from '../middlewares/index.js'

router.get('/:userCourseId', scoreHistoryController.findByUserCourse)


export default router;
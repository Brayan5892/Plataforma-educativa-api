import {Router} from 'express'
const router = Router();
import * as userController from '../controllers/user.controller'
import {authJwt} from '../middlewares/index.js'

router.get('/getUser/:id', userController.getUserById)

router.get('/getUser', userController.getUserAuthenticate)

router.post('/suscribe', userController.suscribeCourse)

router.get('/findSuscribe/:courseId', userController.findSuscribe)

router.put('/usercourse/:courseId', userController.uptadeCourseById)

router.put('/:userId', userController.updateUser)

router.post('/message', userController.contactMessage)

export default router;
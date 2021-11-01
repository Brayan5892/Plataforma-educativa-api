import {Router} from 'express'
const router = Router();
import * as userController from '../controllers/user.controller'
import {authJwt} from '../middlewares/index.js'

router.get('/getUser/:id', userController.getUserById)

router.get('/getUser', userController.getUserAuthenticate)

router.post('/suscribe', userController.suscribeCourse)

export default router;
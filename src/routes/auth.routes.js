import {Router} from 'express'
const router = Router();
import * as authController from '../controllers/auth.controller'
import {authJwt} from '../middlewares/index.js'

router.post('/signup', authController.signUp)

router.post('/signin', authController.login)


export default router;
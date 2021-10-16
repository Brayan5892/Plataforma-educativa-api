import {Router} from 'express'
const router = Router();
import * as authController from '../controllers/auth.controller'
import {authJwt} from '../middlewares/index.js'

router.post('/signup', authController.signUp)

router.post('/login', authController.login)

router.get('/email/:token', authController.confirmationEmail)

export default router;
import {Router} from "express"
import UserController from '../controllers/user.controller.js';
import authenticate from "../config/jwt.config.js";

const router = Router();

router.route('/register')
.post(UserController.registerUser)
router.route('/login')
.post(UserController.loginUser)
router.route('/logout')
.get(authenticate,UserController.logoutUser)



router.route('/users')
.get(authenticate,UserController.getUser)



export default router
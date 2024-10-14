import {Router} from "express"
import UserController from '../controllers/user.controller.js';

const router = Router();

router.route('/users')
.post(UserController.createUser)

export default router
import {Router} from 'express'
import authenticate from '../config/jwt.config.js'
import SongController from '../controllers/song.controller.js'
const router = Router();

router.route('/songs')
.post(authenticate,SongController.create)
.get(authenticate,SongController.getSongs)
router.route('/songs/:_id')
.get(authenticate,SongController.getSong)
.put(authenticate,SongController.updateSong)
.delete(authenticate,SongController.deleteSong)
export default router
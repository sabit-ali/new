import {Router} from 'express'
import { logoutUser, UserRegister ,loginUser, updateAvatarProfile, updateAccountDetails,} from '../controllers/user.controller.mjs'
import { upload } from '../middleware/multer.middleware.mjs';

import { verifyJWT } from '../middleware/auth.middleware.mjs';


const router = Router()

router.route("/register").post(
    upload.single('avatar'),
    UserRegister
    )
router.route('/login').post(loginUser)
router.route('/logout-user').post( verifyJWT, logoutUser)
router.route('/profile-update').post( verifyJWT, updateAccountDetails)
router.route('/avatar-update').post( verifyJWT,
    upload.single("avatar")
    ,
     updateAvatarProfile)



export default router
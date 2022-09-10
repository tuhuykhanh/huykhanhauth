const express =require('express')
const router = express.Router();
const userController = require('../app/controller/userController')
const auth = require('../app/middleware/auth')
const authAdmin = require('../app/middleware/authAdmin')

router.post('/register',userController.register)
router.post('/activation',userController.activeEmailAccount)
router.post('/login',userController.login)
router.post('/refresh_token',userController.getAccessToken)
router.post('/forgot',userController.forgotPassword)
router.post('/reset',auth,userController.resetPassword)
router.get('/info',auth,userController.getInfoUser)
router.get('/allinfo',auth,authAdmin,userController.getAllInfoUser)
router.get('/logout',userController.logOut)
router.patch('/update',auth,userController.updateUser)
router.patch('/updaterole/:id',auth,authAdmin,userController.updateUserRole)
router.delete('/deleteuser/:id',auth,authAdmin,userController.deleteUser)

module.exports = router
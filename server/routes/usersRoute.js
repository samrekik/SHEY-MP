const express=require('express');
const { userController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const route=express.Router();
route.post('/register',userController.register)
route.post('/login',userController.login)
route.get('/get-current-user',authMiddleware,userController.currentUser)
module.exports.userRouter=route
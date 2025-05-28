const express=require('express');
const { userController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const route=express.Router();
route.post('/register',userController.register)
route.post('/login',userController.login)
route.get('/get-users',authMiddleware,userController.getAllUser)
route.get('/get-current-user',authMiddleware,userController.currentUser)
route.put('/update-status-user/:id',authMiddleware,userController.editUsers)
module.exports.userRouter=route
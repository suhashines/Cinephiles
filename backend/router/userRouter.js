const express = require('express');

const userRouter = express.Router() ;

const userController = require('../controller/userController');

const authController = require('../controller/authController');

const vt = require('../utils');

userRouter.route("/")
.get(userController.getAllUsers);


userRouter.route("/login").post(authController.loginUser);

userRouter.route("/signup").post(userController.signupUser) ;


userRouter.route("/bookings/:id").get(userController.getAllBookingOfUser);    

userRouter.route("/details")
.get(vt.verifyToken,userController.getUserDetails);



module.exports = userRouter;
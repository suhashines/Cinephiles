const express = require('express');

const userRouter = express.Router() ;

const userController = require('../controller/userController');

const authController = require('../controller/authController');

userRouter.route("/")
.get(userController.getAllUsers);


userRouter.route("/login").post(authController.loginUser);

userRouter.route("/signup").post(userController.signupUser) ;


userRouter.route("/bookings/:id").get(userController.getAllBookingOfUser);    



module.exports = userRouter;
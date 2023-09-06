const express = require('express');

const userRouter = express.Router() ;

const userController = require('../controller/userController');

const authController = require('../controller/authController');

const vt = require('../utils');

userRouter.route("/")
.get(userController.getAllUsers);


userRouter.route("/login").post(authController.loginUser);

userRouter.route("/signup").post(userController.signupUser) ;
  

userRouter.route("/details/:id")
.get(userController.getUserDetails)
.patch(userController.editDetails);


userRouter.route("/signout")
.get(userController.signOut);


userRouter.route("/changePassword/:id")
.post(userController.changePassword);


module.exports = userRouter;
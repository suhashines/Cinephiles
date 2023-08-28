const express = require('express');

const adminRouter = express.Router();

const adminController = require('../controller/adminController');

adminRouter.route('/signup')
.post(adminController.signupAdmin)

adminRouter.route('/login')
.post(adminController.loginAdmin);

adminRouter.route('/')
.get(adminController.getAllManagers);

module.exports = adminRouter;
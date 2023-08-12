const express = require('express');

const adminRouter = express.Router();

const adminController = require('../controller/adminController');

adminRouter.route('/signup')
.post(adminController.signupAdmin)

adminRouter.route('/login')
.post(adminController.loginAdmin);

module.exports = adminRouter;
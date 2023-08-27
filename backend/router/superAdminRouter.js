const express = require('express');

const vt = require('../utils');

const superRouter = express.Router();

const superController = require('../controller/superAdminController');


superRouter.route("/login")
.post(superController.login);

superRouter.route("/addTheatre")
.post(vt.verifyToken,superController.addTheatre);

superRouter.route("/assign")
.post(superController.assignManager);


module.exports = superRouter ;
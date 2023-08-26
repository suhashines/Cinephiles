const express = require('express');

const superRouter = express.Router();

const superController = require('../controller/superAdminController');

superRouter.route("/")
.post();
const express = require('express');

const directorRouter = express.Router();

const directorController = require('../controller/directorController');

directorRouter.route("/")
.get(directorController.getAllDirectors) 
.post()


module.exports = directorRouter;
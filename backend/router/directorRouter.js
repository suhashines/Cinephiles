const express = require('express');

const directorRouter = express.Router();

const directorController = require('../controller/directorController');

directorRouter.route("/")
.get(directorController.getAllDirectors) 


directorRouter.route("/:name")
.get(directorController.getMoviesByDirector) ;





module.exports = directorRouter; 
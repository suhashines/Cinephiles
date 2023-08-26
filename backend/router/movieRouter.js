const express = require('express');

const movieRouter = express.Router();

const movieController = require('../controller/movieController');

const verify = require('../utils');

const directorController = require('../controller/directorController');


movieRouter.route("/").post(verify.verifyToken,movieController.addMovie);
movieRouter.route("/").get(movieController.getAllMovies);
movieRouter.route("/:id").get(movieController.getMovieById);
movieRouter.route("/date/coming-soon").get(movieController.comingSoon);

module.exports = movieRouter;
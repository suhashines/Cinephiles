const express = require('express');

const movieRouter = express.Router();

const movieController = require('../controller/movieController');

movieRouter.route("/").post(movieController.addMovie);
movieRouter.route("/").get(movieController.getAllMovies);
movieRouter.route("/:id").get(movieController.getMovieById);

module.exports = movieRouter;
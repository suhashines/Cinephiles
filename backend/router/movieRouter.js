const express = require('express');

const movieRouter = express.Router();

const movieController = require('../controller/movieController');

const verify = require('../utils');

const directorController = require('../controller/directorController');


movieRouter.route("/")
.post(verify.verifyToken,movieController.addMovie);


movieRouter.route("/")
.get(movieController.getAllMovies);

movieRouter.route("/find/:id")
.get(movieController.getMovieById);

movieRouter.route("/date/upcoming")
.get(movieController.comingSoon);

movieRouter.route("/date/current")
.get(movieController.getCurrent);

movieRouter.route("/find")
.get(movieController.getCitiesAndTheatres) ;

movieRouter.route("/review/:id")
.get(movieController.getMovieReviews);

module.exports = movieRouter;
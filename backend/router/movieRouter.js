const express = require('express');

const movieRouter = express.Router();

const movieController = require('../controller/movieController');


movieRouter.route("/")
.post(movieController.addDirector,movieController.addMovie,movieController.addGenres);


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
.get(movieController.getMovieReviews)
.post(movieController.addMovieReview)
.patch(movieController.editReview)
.delete(movieController.deleteReview);


movieRouter.route("/rating/:id")
.get(movieController.getRating)
.post(movieController.addRating);

module.exports = movieRouter;
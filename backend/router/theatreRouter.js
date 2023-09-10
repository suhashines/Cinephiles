const express = require('express');

const theatreRouter = express.Router();
const theatreController = require('../controller/theatreController');

theatreRouter.route("/")
.get(theatreController.getTheatreByCity)
.post(theatreController.addTheatre)
.patch(theatreController.editTheatre)
.delete(theatreController.deleteTheatre);


theatreRouter.route("/add-movie")
.post(theatreController.addMovieToTheatre)
.delete(theatreController.deleteMovie);


theatreRouter.route("/gallery")
.post(theatreController.addGallery,theatreController.addSeats)
.patch(theatreController.addPremium);

theatreRouter.route("/cities")
.get(theatreController.getAllCities);

theatreRouter.route("/movies/:id")
.get(theatreController.getTheatreMovies);

theatreRouter.route("/current/:id")
.get(theatreController.getCurrentMovies)

theatreRouter.route("/showtimes")
.get(theatreController.getMovieGalleries)
.post(theatreController.addMovieShowtimes);

theatreRouter.route("/upcoming/:id")
.get(theatreController.getComingSoonMovies);

theatreRouter.route("/details/:id")
.get(theatreController.getTheatreDetails);


theatreRouter.route("/stats")
.get(theatreController.movieStat);


module.exports = theatreRouter;
const express = require('express');

const theatreRouter = express.Router();
const theatreController = require('../controller/theatreController');

theatreRouter.route("/")
.get(theatreController.getTheatreByCity);

theatreRouter.route("/cities")
.get(theatreController.getAllCities);

theatreRouter.route("/:id")
.get(theatreController.getTheatreMovies);

theatreRouter.route("/current/:id")
.get(theatreController.getCurrentMovies)

theatreRouter.route("/nextweek/:id")
.get(theatreController.getNextWeekMovies);

theatreRouter.route("/upcoming/:id")
.get(theatreController.getComingSoonMovies);


module.exports = theatreRouter;
const express = require('express');

const searchRouter = express.Router();

const searchController = require('../controller/searchController');


searchRouter.route("/genre")
.post(searchController.genre);


searchRouter.route("/director")
.post(searchController.director);


searchRouter.route("/range")
.post(searchController.range);


searchRouter.route("/title")
.post(searchController.title);

searchRouter.route("/title/all")
.post(searchController.getAllMovies);



searchRouter.route("/actor")
.post(searchController.actor);

module.exports = searchRouter;
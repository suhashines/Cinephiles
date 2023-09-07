const express = require('express');

const searchRouter = express.Router();

const searchController = require('../controller/searchController');


searchRouter.route("/genre")
.get(searchController.genre);


searchRouter.route("/director")
.post(searchController.director);


searchRouter.route("/range")
.post(searchController.range);


searchRouter.route("/title")
.get(searchController.title);



searchRouter.route("/actor")
.get(searchController.actor);

module.exports = searchRouter;
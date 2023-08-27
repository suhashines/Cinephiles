const express = require('express');

const theatreRouter = express.Router();
const theatreController = require('../controller/theatreController');

theatreRouter.route("/")
.get(theatreController.getAllTheatres);


module.exports = theatreRouter;
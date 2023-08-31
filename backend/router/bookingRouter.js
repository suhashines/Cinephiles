const express = require('express');

const bookingRouter = express.Router();

const bookingController = require('../controller/bookingController');

const vt = require('../utils');

bookingRouter.route("/").post(vt.verifyToken,bookingController.addBooking);

bookingRouter.route("/:id")
.get(bookingController.getBookingById)
.delete(bookingController.deleteBookingById);

bookingRouter.route("/galleries")
.post(bookingController.getGalleries)

module.exports = bookingRouter;
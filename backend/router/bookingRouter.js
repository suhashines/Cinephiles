const express = require('express');

const bookingRouter = express.Router();

const bookingController = require('../controller/bookingController');

bookingRouter.route("/").post(bookingController.addBooking);

bookingRouter.route("/:id")
.get(bookingController.getBookingById)
.delete(bookingController.deleteBookingById);

module.exports = bookingRouter;
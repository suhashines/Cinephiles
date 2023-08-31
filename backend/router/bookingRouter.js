const express = require('express');

const bookingRouter = express.Router();

const bookingController = require('../controller/bookingController');

const vt = require('../utils');

bookingRouter.route("/").post(vt.verifyToken,bookingController.addBooking);

bookingRouter.route("/find/:id")
.get(bookingController.getBookingById)
.delete(bookingController.deleteBookingById);

bookingRouter.route("/galleries")
.post(bookingController.getGalleries)
.get(bookingController.getGallerySeats)

bookingRouter.route("/seats")
.post(bookingController.total);

bookingRouter.route("/confirm")
.post(bookingController.addBooking);


module.exports = bookingRouter;
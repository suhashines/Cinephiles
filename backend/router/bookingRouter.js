const express = require('express');

const bookingRouter = express.Router();

const bookingController = require('../controller/bookingController');

const vt = require('../utils');



bookingRouter.route("/find/:id")
.get(bookingController.getBookingById)
.delete(bookingController.deleteBookingById);

bookingRouter.route("/galleries")
.get(bookingController.getGallerySeats)

bookingRouter.route("/galleries/:id")
.get(bookingController.getPrice)

bookingRouter.route("/seats")
.post(bookingController.total);

bookingRouter.route("/confirm") 
.post(bookingController.addBooking);

bookingRouter.route("/all")  // booking/all?token
.get(bookingController.getAllBookings);


module.exports = bookingRouter;
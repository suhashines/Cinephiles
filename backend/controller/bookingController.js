const database = require('../database/database');

const jwt = require('jsonwebtoken');

async function addBooking(req,res){
    
    
    //user is verified. Now he can add movie here 


    let data = req.body ;

    let sql,bookings;


    try{
        
        sql = 'select * from bookings order by booking_id desc' ;

        bookings = (await database.execute(sql,{})).rows ;

        console.log("got the bookings table ",bookings);


    }catch(err){
        return console.log(err);
    }

    const booking_id = bookings[0].BOOKING_ID + 1 ;

    console.log("new booking id ",booking_id);

    try{

        sql = 'INSERT INTO Bookings(booking_id,user_id, movie_id, seat_number, booking_date) values(:booking_id,:user_id,:movie_id,:seat_number,:booking_date)';

        (await database.execute(sql,{booking_id:booking_id,user_id:user_id,movie_id:data.movie_id,seat_number:data.seat_number,booking_date:data.booking_date})).rowsAffected ;


    }catch(err){
        return console.log(err);
    }

    return res.json({success:true,message:"booked successfully"});
}


async function getBookingById(req,res){

    let booking_id = req.params.id ;

    console.log("req for fetching booking_id ",booking_id);


    let sql,booking ;


    try{

sql = 'SELECT (SELECT name FROM users u WHERE u.user_id=b.user_id) user_name , (SELECT title FROM movies m WHERE m.movie_id=b.movie_id) movie_title,seat_number,booking_date FROM bookings b WHERE booking_id = :booking_id ' ;

    booking = (await database.execute(sql,{booking_id:booking_id})).rows ;

    console.log('got booking for id ',booking_id);
    console.log(booking);

    }catch(err){
        return res.status(404).json({message:"unable to get booking by id"});
    }

    return res.json({booking_info:booking[0]});
}


async function deleteBookingById(req,res){


    let booking_id = req.params.id ;

    console.log('req for deleting booking_id ',booking_id);

    let sql ;

    try{

        sql = 'DELETE FROM BOOKINGS b WHERE booking_id =:booking_id ';

        const output = await database.execute(sql,{booking_id:booking_id}).rowsAffected;

        console.log(output," rows affected");

    }catch(err){
        return res.json({message:"unable to delete movie"});
    }


    return res.json({message:"movie deleted successfully"});
}


module.exports = {addBooking,getBookingById,deleteBookingById};
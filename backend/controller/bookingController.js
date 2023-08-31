const { all } = require('axios');
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



async function getGalleries(req,res){

   const {t_id,m_id,date,time} = req.body ;


   console.log('data received for fetching galleries');


   let sql = 
   `
   SELECT s.G_ID,(SELECT name FROM GALLERIES g WHERE g.G_ID=s.G_ID) name, show_id
   FROM SHOWTIMES s,MOVIETHEATRES mt
   WHERE s.MT_ID = mt.MT_ID 
   AND mt.M_ID = :m_id AND mt.T_ID = :t_id AND 
   
   to_char(s.date_time,'DD-MON-YY')= '${date}' AND
   
   to_char(s.date_time,'HH24:MI') = TO_CHAR(TO_TIMESTAMP('${time}','HH12:MI AM'),'HH24:MI') ` ;


   let galleries = (await database.execute(sql,{m_id:m_id,t_id:t_id})).rows;


   return res.json({galleries});

}


async function getGallerySeats(req,res){

    const {g_id,show_id,category} = req.query ;


    //first I fetch all the seats

     let sql = 
     `
     SELECT s_id,category,price,
     (SELECT tiers FROM GALLERIES g WHERE g.G_ID=s.g_id) tiers , 
     (SELECT columns FROM GALLERIES g WHERE g.G_ID=s.g_id)columns
     FROM seats s
     WHERE g_id = :g_id and lower(category) = lower(:category)
     ORDER BY TO_NUMBER(REGEXP_SUBSTR(s_id, '\d+')),s_id `

     result = (await database.execute(sql,{g_id:g_id,category:category})).rows ;

     const rows = result[0].TIERS ;

     const columns = result[0].COLUMNS ;

     const price = result[0].PRICE ;

     console.log(rows,columns);

     const allSeats = result ;


     // now I fetch the unbooked seats 


     sql = 
     `
     SELECT s_id,category,price
FROM seats s
WHERE g_id = :g_id AND lower(category) = lower(:category)
AND NOT EXISTS (

SELECT *
FROM bookings b
WHERE b.show_id = :show_id 
AND b.s_id = s.s_id

) 
oRDER BY TO_NUMBER(REGEXP_SUBSTR(s_id, '\d+')),s_id `

     result = (await database.execute(sql,{g_id:g_id,category:category,show_id:show_id})).rows ;

     const available = result ;


     return res.json({
    allSeats:allSeats,
    available:available,
    rows : rows ,
    columns : columns, 
    price : price
    
    }) ;

}



async function total(req,res){


    const {seats,g_id} = req.body ;

    let price = 0 ;

    for(let i=0;i<seats.length;i++){

        let sql = 
        `SELECT price
        FROM seats 
        WHERE s_id = :s_id
        AND g_id = :g_id `

        let s_id = seats[i] ;

        result = (await database.execute(sql,{s_id:s_id,g_id:g_id})).rows ;

        price += result[0].PRICE ;
    }

    res.json({total:price});

    
}


async function confirmBooking(req,res){

    
}


module.exports =
 {addBooking,
getBookingById,
deleteBookingById,
getGalleries,
getGallerySeats,
total};
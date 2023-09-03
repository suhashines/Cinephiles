const { all } = require('axios');
const database = require('../database/database');

const jwt = require('jsonwebtoken');


async function checkBooking(req,res,next){


}

async function addBooking(req,res){
    
    
    //user is verified. Now he can confirm booking 

    let seats = req.body.seats ;

    let g_id = req.body.g_id ;

    let show_id = req.body.show_id ;

    console.log(seats,g_id,show_id);

    let u_id = req.access_id ;

    let sql,bookings;


    try{
        
        sql = 'select * from bookings order by book_id desc' ;

        bookings = (await database.execute(sql,{})).rows ;

        console.log("got the bookings table ",bookings);


    }catch(err){
        return console.log(err);
    }

    let book_id ;

    if(bookings.length==0){
        book_id = 0 ;
    }else{
        book_id = bookings[0].BOOK_ID + 1 ;
    }

    

    console.log("new booking id ",book_id);


    for(let i=0;i<seats.length;i++){

        let s_id = seats[i] ;

        console.log(s_id);

        sql = 
        `INSERT INTO Bookings(book_id,show_id ,s_id, g_id, u_id,book_date)
        values(:book_id,:show_id,'${s_id}',:g_id,:u_id,sysdate)`;

        console.log("before database execution");

        binds = {book_id:book_id,show_id:show_id,g_id:g_id,u_id:u_id} ;

        (await database.execute(sql,binds)) ;

        book_id = book_id + 1 ;
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

    const {g_id,show_id} = req.query ;


    //first I fetch all the seats

     let sql = 
     ` SELECT s_id,category,price,
        (SELECT tiers FROM GALLERIES g WHERE g.G_ID=s.g_id) tiers , 
        (SELECT columns FROM GALLERIES g WHERE g.G_ID=s.g_id)columns,
        (SELECT 1-count(*)
        FROM bookings b 
        WHERE b.g_id=s.g_id AND b.show_id=:show_id AND b.s_id = s.s_id) available  
        FROM seats s
        WHERE g_id = :g_id
        -- ORDER BY TO_NUMBER(REGEXP_SUBSTR(s_id, '\d+')),s_id `

     result = (await database.execute(sql,{g_id:g_id,show_id:show_id})).rows ;

     console.log(result);

     const rows = result[0].TIERS ;

     const columns = result[0].COLUMNS ;

     console.log(rows,columns);

     const allSeats = result ;



     return res.json({
    rows : rows ,
    columns : columns, 
    allSeats:allSeats,
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



module.exports =
 {addBooking,
getBookingById,
deleteBookingById,
getGallerySeats,
total};
const { all } = require('axios');
const database = require('../database/database');

const jwt = require('jsonwebtoken');

async function addBooking(req,res){ 
    
    
    //user is verified. Now he can confirm booking 

    console.log("user is trying to confirm booking");

    let seats = req.body.seats ;

    let g_id = req.body.g_id ;

    let show_id = req.body.show_id ;

    let u_id = req.body.token ;

    console.log(seats,g_id,show_id,"user id",u_id);

    let sql,bookings;


    try{
        
        sql = 'select book_id from bookings order by book_id desc' ;

        bookings = (await database.execute(sql,{})).rows ;
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

    let successful = [];
    let failed = [] ;


    for(let i=0;i<seats.length;i++){

        let s_id = seats[i] ;

        console.log(s_id);

        sql = 
        `INSERT INTO Bookings(book_id,show_id ,s_id, g_id, u_id,book_date)
        values(:book_id,:show_id,'${s_id}',:g_id,:u_id,sysdate)`;

        binds = {book_id:book_id,show_id:show_id,g_id:g_id,u_id:u_id} ;
 
        (await database.execute(sql,binds)) ;

        let check = (await database.execute('select book_id from bookings where book_id=:book_id',{book_id:book_id})).rows;

        if(check.length==0){
            failed.push(s_id);
        }else{
            successful.push(s_id);
        }

        book_id = book_id + 1 ;
}

    return res.json({successful:successful,failed:failed});
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


    let book_id = req.params.id ;

    console.log('req for deleting booking_id ',book_id);

    let sql ;

    try{

        sql = 'DELETE FROM BOOKINGS b WHERE book_id =:book_id ';

        const output = await database.execute(sql,{book_id:book_id}).rowsAffected;

        console.log(output," rows affected");

    }catch(err){
        return res.json({message:"unable to delete movie"});
    }


    return res.json({success:true,message:"booking canceled successfully"});
}


async function getPrice(req,res){

    let reg,pre ;

    let g_id = req.params.id ;

    sql = 
    `select DISTINCT price
    from seats where 
    g_id=:g_id
    and 
    category='Regular' ` ;

    reg = (await database.execute(sql,{g_id:g_id})).rows[0].PRICE ;


    sql = 
    `
    select DISTINCT price
    from seats where 
    g_id=:g_id
    and 
    category='Premium' `

    pre = (await database.execute(sql,{g_id:g_id})).rows[0].PRICE ;



    res.json({regular:reg,premium:pre});
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
        ORDER BY SUBSTR(s_id, 1, 1), TO_NUMBER(SUBSTR(s_id, 2)) `

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


async function getAllBookings(req,res){

    let u_id = req.query.token;

    let movies,sql ;

   sql =
     `SELECT DISTINCT m.title,m.m_id
    FROM bookings b,showtimes s,MOVIETHEATRES mt,movies m
    WHERE b.show_id = s.SHOW_ID AND 
    s.mt_id=mt.mt_id 
    AND mt.m_id = m.m_id AND 
    b.u_id = :u_id ` 

    movies = (await database.execute(sql,{u_id:u_id})).rows ;

    for(let i=0;i<movies.length;i++){

        let m_id = movies[i].M_ID ;

        let history ;

        sql = 
        `
        
            SELECT s_id,
            (SELECT category FROM seats st WHERE st.s_id=b.s_id AND b.g_id=st.g_id) category,
            (SELECT price FROM seats st WHERE st.s_id=b.s_id AND b.g_id=st.g_id) price,
            to_char(b.BOOK_DATE,'DD-MON-YY') showtime ,
            b.BOOK_ID, EXTRACT(DAY FROM (s.date_time-SYSDATE)) difference
            FROM bookings b,showtimes s,MOVIETHEATRES mt,movies m
            WHERE b.show_id = s.SHOW_ID AND 
            s.mt_id=mt.mt_id AND 
            mt.m_id = m.m_id AND 
            b.u_id = :u_id 
            AND m.m_id = :m_id
            order by showtime desc ` 

        history = (await database.execute(sql,{m_id:m_id,u_id:u_id})).rows ;

        movies[i].details = history ;
    }


    res.json({movies});



}

module.exports =
 {addBooking,
getBookingById,
deleteBookingById,
getGallerySeats,
getPrice,
total,
getAllBookings};
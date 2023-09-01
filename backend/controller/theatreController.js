const database = require('../database/database');
// get all cities

async function getAllCities(req,res){

    let sql,result;

    sql = `select distinct city from theatres` ;

    result = (await database.execute(sql,{})).rows ;

    res.json({result});
}


async function getTheatreByCity(req,res){

    sql = `select * from theatres where lower(city)=lower(:city)` ;

    result = (await database.execute(sql,{city:req.query.city})).rows ;

    res.json({result});
}


async function getTheatreMovies(req,res){

    let sql,result ;

    let t_id = req.params.id ;

    sql = `SELECT * 
    FROM movies
    WHERE m_id IN 
    (SELECT m_id FROM MOVIETHEATRES WHERE t_id = :t_id ) ` ;

    result = (await database.execute(sql,{t_id:t_id})).rows ;


    console.log("all movies ",result.length);


    res.json({movies:result});

}


async function getCurrentMovies(req,res){


    let t_id = req.params.id ;

    let sql,movies ;

    sql =
        `SELECT * 
        FROM movies
        WHERE m_id IN 
        (SELECT m_id FROM MOVIETHEATRES mt WHERE mt.MT_ID  in
        (SELECT mt_id FROM SHOWTIMES s WHERE s.DATE_TIME>=sysdate and s.DATE_TIME <= sysdate + 14)
        AND mt.t_id = :t_id )`;

    movies = (await database.execute(sql,{t_id:t_id})).rows ;

    console.log("currently showing ",movies.length);

    res.json({movies:movies});
}




async function getComingSoonMovies(req,res){

    
    let t_id = req.params.id ;

    let sql,movies ;

    sql = 
    `SELECT *
    FROM movies m
    
    WHERE NOT EXISTS (
    
    SELECT *
    FROM SHOWTIMES s,MOVIETHEATRES mt
    WHERE s.MT_ID = mt.MT_ID 
    AND mt.t_id = :t_id
    AND s.DATE_TIME >=sysdate AND s.DATE_TIME <=sysdate+14
    AND mt.M_ID = m.m_id
    ) 
    
    AND EXISTS (
    
    
    SELECT *
    FROM SHOWTIMES s,MOVIETHEATRES mt
    WHERE s.MT_ID = mt.MT_ID 
    AND mt.t_id = :t_id
    AND s.DATE_TIME >sysdate+14
    AND mt.M_ID = m.m_id
    
    )`

    movies = (await database.execute(sql,{t_id:t_id})).rows ;

    console.log("coming soon ",movies.length);

    res.json({movies:movies});

}


async function getMovieShowtimes(req,res){

   const {t_id,m_id,date} = req.query ;

  

   if(!date){
    console.log("no date given");

    // now I have to process only t_id and m_id 

    let sql,dates ;

    sql= 
    `SELECT to_char(DATE_TIME,'DD-MON-YY') extracted_date 
    FROM SHOWTIMES s,MOVIETHEATRES mt 
    WHERE s.MT_ID = mt.MT_ID AND mt.m_id = :m_id AND mt.T_ID = :t_id AND s.DATE_TIME <= SYSDATE +14`;

    dates = (await database.execute(sql,{t_id:t_id,m_id:m_id})).rows ;

    return res.json({dates});

   }

   console.log("date was given ,type",typeof(date),date);

   // hence I've to process t_id,m_id and date 

   let sql,showtimes ;

   sql = 
   
   `SELECT to_char(DATE_TIME,'HH12:MI AM') extracted_TIME 
   FROM SHOWTIMES s,MOVIETHEATRES mt 
   WHERE s.MT_ID = mt.MT_ID AND 
   mt.m_id = :m_id AND 
   mt.T_ID = :t_id AND 
   TO_CHAR(s.DATE_TIME,'DD-MON-YY') = '${date}'  ` ;

   showtimes = (await database.execute(sql,{t_id:t_id,m_id:m_id})).rows;

   res.json({showtimes}); 


}


module.exports = 
{getAllCities,
getTheatreByCity,
getTheatreMovies,
getCurrentMovies,
getComingSoonMovies,
getMovieShowtimes};
const database = require('../database/database');

const jwt = require('jsonwebtoken');


async function addMovie(req,res){

    console.log("got my access_id :",req.access_id);

    let movie = req.body ;


    console.log("movie received: ",movie);

        let sql ;


        const result = (await database.execute('select * from movies where title=:title and release_date=:release_date',{title:movie.title,release_date:movie.release_date})).rows;

        if(result.length!=0){
            res.json({success:false,message:"Movie already exists"});
        }

        const movies = (await database.execute('select * from movies order by movie_id desc',{})).rows;

        console.log(movies);

        const newId = movies[0].M_ID + 1 ;

        console.log(newId);

    try{

        sql = 'insert into movies(movie_id,title,description,release_date,poster_url,admin_id) values(:movie_id,:title,:description,:release_date,:poster_url,:admin_id) ' ;
        binds = {movie_id:newId,title:movie.title,description:movie.description,release_date:movie.release_date,poster_url:movie.poster_url,admin_id:req.access_id} ;

        let output = (await database.execute(sql,binds)).rowsAffected;

        console.log(output," row affected");

    }catch(err){

         console.log(err) ;

         return res.json({success:false,message:"database error"}) ;
    }


    return res.json({"success":true, "message":"movie added successfully"}) ;


}



async function getAllMovies(req,res){

   
    let func = `
    CREATE OR REPLACE FUNCTION getAllActors(id IN NUMBER) RETURN VARCHAR2 IS
       actor_names VARCHAR2(1000); 
      
    BEGIN
       
       actor_names := '';
    
       
       FOR actor_rec IN (SELECT a.name 
                            FROM actors a,MOVIEACTORS ma
                            WHERE a.A_ID = ma.A_ID 
                            AND ma.m_id = id) 
       LOOP
          
          actor_names := actor_names || ', ' || actor_rec.name;
       END LOOP;
    
       
       IF LENGTH(actor_names) > 2 THEN
          actor_names := SUBSTR(actor_names, 3);
       END IF;
    
       
       RETURN actor_names;
    END` ;

    const sql =
    ` SELECT m_id,title,getAllActors(m_id) actors ,
    release_date,duration,poster_url FROM MOVIES m ORDER BY RELEASE_DATE DESC fetch first 100 rows only`

    console.log('req recieved for fetching all movies');

    let result;


    try{


        result = (await database.execute(sql,{})).rows ;

    }catch(err){

    return res.json({success:false,message:"database error"});
       console.log(err);
    }

    console.log('all the movies ',result.length);

    res.json({success:true,result});
}


async function getMovieById(req,res){

    const movie_id = req.params.id ; 

    console.log(movie_id);

    let sql,movie ;

    try{
        sql = 'select * from movies where m_id=:movie_id';
        binds={movie_id} ;

        movie = (await database.execute(sql,binds)).rows ;

    }catch(err){
        console.log(err); 
    }

    if(movie.length==0){
        return res.json({success:false,message:"no movie exists with this id"});
    }

    return res.json({success:true,movie});
}

async function getCurrent(req,res){

    let sql,movies ;

    sql = `SELECT * 
    FROM movies 
    WHERE m_id IN 
    (SELECT m_id FROM MOVIETHEATRES mt WHERE mt.MT_ID  in 
    (SELECT mt_id FROM SHOWTIMES s WHERE s.DATE_TIME>=sysdate and s.date_time <= sysdate + 14) )`;

    movies = (await database.execute(sql,{})).rows ;

    console.log("all the current movies ",movies.length);

    res.json({movies:movies});

}

async function comingSoon(req,res){

    let sql,result ;

    sql =
    
    `SELECT *
    FROM movies m
    
    WHERE NOT EXISTS (
    
    SELECT *
    FROM SHOWTIMES s,MOVIETHEATRES mt
    WHERE s.MT_ID = mt.MT_ID 
    AND s.DATE_TIME >=sysdate AND s.DATE_TIME <=sysdate+14
    AND mt.M_ID = m.m_id
    ) 
    
    AND EXISTS (
    
    
    SELECT *
    FROM SHOWTIMES s,MOVIETHEATRES mt
    WHERE s.MT_ID = mt.MT_ID 
    AND s.DATE_TIME >sysdate+14
    AND mt.M_ID = m.m_id
    
    )` ;

    movies = (await database.execute(sql,{})).rows ;

    console.log("all the coming soon count ",movies.length);

    res.json({movies:movies});
}



async function getCitiesAndTheatres(req,res){


    const {m_id,city} = req.query;

    if(!city){

        // i need to find those cities in the theatre of which the movie is showing

        let sql = 

        `SELECT t.city
        FROM THEATRES t,MOVIETHEATRES mt
        WHERE t.t_id = mt.T_ID 
        AND mt.m_id = :m_id 
        AND exists(
        
        SELECT * 
        FROM showtimes s
        WHERE s.MT_ID = mt.mt_id
        AND s.DATE_TIME >=sysdate AND s.DATE_TIME <=sysdate+14) `


        let cities = (await database.execute(sql,{m_id:m_id})).rows ;

        return res.json({cities});
    }


    // I have m_id and city, now need to find theatres info

    let sql = 

    `
    SELECT t.t_id,(name||' '||building || ','||road||','||city) location 
    FROM THEATRES t,MOVIETHEATRES mt
    WHERE t.t_id = mt.T_ID AND lower(t.city)=lower(:city)
    AND mt.m_id = :m_id 
    AND exists(
    
    SELECT * 
    FROM showtimes s
    WHERE s.MT_ID = mt.mt_id
    AND s.DATE_TIME >=sysdate AND s.DATE_TIME <=sysdate+14) ` ;

    theatres = (await database.execute(sql,{m_id:m_id,city:city})).rows ;

    res.json({theatres});
}


module.exports = 
{addMovie,
getAllMovies,
getMovieById,
getCurrent,
comingSoon,
getCitiesAndTheatres};
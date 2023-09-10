const database = require('../database/database');

const jwt = require('jsonwebtoken');


async function addDirector(req,res,next){

    const name = req.body.name ;

    const country = req.body.country ;

    const dob = req.body.dob; 

    console.log("trying to add director,name ",name);

    let sql,result ;

        sql = 
        `select d_id 
        from directors 
        where lower(name) = lower('${name}')` ;

        result = (await database.execute(sql,{})).rows ;

    let d_id ;

    if(result.length!=0){

        console.log('hence the director already exists, no need to add him')
        d_id = result[0].D_ID;

        req.d_id = d_id ;

        next();
    }else{

        //this is a new director ,  I need to add him 

        console.log('new director found');

        sql = 
        `
        SELECT d_id 
        FROM DIRECTORS
        ORDER BY D_ID DESC
        
        `

        result = (await database.execute(sql,{})).rows ;

        d_id = result[0].D_ID+1 ;

        req.d_id = d_id ;

        console.log("new director with id ",d_id);


        sql =
        `
        INSERT INTO DIRECTORS(D_ID,NAME,COUNTRY,DOB) 
        VALUES(${d_id},'${name}','${country}',to_date('${dob}','DD-MON-YY'))
        
        `

        await database.execute(sql,{});

        console.log("director is added, forwarding to movie");

        next();


    }

}


async function addMovie(req,res,next){

    //before anything first I retrive director_id 

    const d_id = req.d_id ;

    console.log('d_id found: ',d_id);
 
    const ad_id = req.body.manager_id ;

    const title = req.body.title ;

    const release_date = req.body.release_date;


    let sql,result ;


        sql =
        `select m_id
        from movies 
        where title='${title}'
        and release_date=to_date('${release_date}','DD-MON-YY')
        `


         result = (await database.execute(sql,{})).rows;

        let m_id ;

        if(result.length!=0){
           
            //this means movie already exists , hence I retrive the m_id

            m_id = result[0].M_ID ;

            console.log("movie already exists with id ",m_id);

            req.movie = true ;

            //

            req.m_id = m_id ;

            console.log("no need to insert anything,forwarding to genre");

            next();

        }else{

            //now I've to insert information

            result = (await database.execute('select m_id from movies order by m_id desc',{})).rows;
    
            m_id = result[0].M_ID + 1 ;

            req.m_id = m_id ;

            req.movie = false;

            console.log("new movie with m_id ",m_id);

            const duration = req.body.duration;

            const synopsis = req.body.synopsis;

            const poster_url = req.body.poster_url;

            const back_poster_url = req.body.back_poster_url;

            sql = 
            `
            insert into movies(m_id,title,release_date,duration,synopsis,poster_url,ad_id,d_id,back_poster_url)
            values(${m_id},'${title}',to_date('${release_date}','DD-MON-YY'),${duration},'${synopsis}','${poster_url}',${ad_id},${d_id},'${back_poster_url}')
            `

            await database.execute(sql,{});

            console.log("new movie added,forwarding to genre");

            next();
        }

        
}


async function addGenres(req,res){

    const genres = req.body.genres.split(',') ;

    const m_id = req.m_id ;

    console.log("got the genres array ",genres); 

    for(let i=0;i<genres.length;i++){

        let name = genres[i];

        let sql,result,gn_id ;

        sql = 
        `select gn_id from genres
        where lower(name) = lower('${name}') ` 

        result = (await database.execute(sql,{})).rows;

        if(result.length!=0){

            console.log(name," genre already exists");

            gn_id = result[0].GN_ID ;

        }else{

            console.log("wow new genre ");

            sql = 
            `
            select gn_id
            from genres
            order by gn_id desc

            `

            result = (await database.execute(sql,{})).rows;

            gn_id = result[0].GN_ID + 1;

            console.log("new genre id ",gn_id);

            sql = 
            `
            
            insert into genres
            values(${gn_id},'${name}')
            
            `

            await database.execute(sql,{});
        }


        sql = 
        `
        select * from 
        movieGenres 
        where m_id = ${m_id} and gn_id = ${gn_id}
        `

        result = (await database.execute(sql,{})).rows;

        if(result.length!=0){
            continue;
        }


        sql =
        `
        insert into movieGenres
        values(${m_id},${gn_id})
        `

        await database.execute(sql,{});
    }

    res.json({message:"Everything added successfully"});

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
    release_date,duration,poster_url,back_poster_url FROM MOVIES m ORDER BY RELEASE_DATE DESC`

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
        sql = 
        `
        SELECT m_id,title,RELEASE_DATE ,DURATION ,SYNOPSIS ,POSTER_URL ,BACK_POSTER_URL ,
        getallactors(m_id) actor ,getmoviedirector(d_id) director,getmoviegenres(m_id) genre,
        (select round(avg(rating),1) from ratings r where r.m_id=m.m_id) rating
        FROM movies m
        where m_id = :movie_id `

        movie = (await database.execute(sql,{movie_id:movie_id})).rows ;

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



async function getMovieReviews(req,res){

    const m_id = req.params.id ;

    sql = 
    `
    SELECT rev_id,review,(SELECT name FROM users u WHERE u.U_ID=r.u_id)name
    FROM REVIEWS r 
    WHERE m_id=:m_id
    `

    const reviews = (await database.execute(sql,{m_id:m_id})).rows;

    res.json(reviews);
}


async function addMovieReview(req,res){

    const m_id = req.params.id ;

    const {review,u_id}=req.body ;

    let sql =
    ` insert into reviews(review,u_id,m_id)
        values(:review,:u_id,:m_id)
    
    `

    await database.execute(sql,{review:review,u_id:u_id,m_id:m_id}) ;

    res.json({message:"posted"});

}


async function editReview(req,res){

    const m_id = req.params.id ;

    const {rev_id,review}=req.body ;

    let sql =
    ` update reviews
    set review = '${review}' 
    where rev_id = :rev_id `

    await database.execute(sql,{rev_id:rev_id}) ;

    res.json({message:"edited"});

}

async function deleteReview(req,res){

    const m_id = req.params.id ;

    const {rev_id} = req.body ;

    console.log(rev_id);

    let sql =
    ` delete from reviews where rev_id = ${rev_id} and m_id = ${m_id} `

     try{

        await database.execute(sql,{}) ;

     }catch(err){
        console.log(err);
     }
    

    res.json({message:"deleted"});
}


async function addRating(req,res,next){

    let m_id = req.params.id ;

    const {rating,u_id} = req.body ;

    let sql;

    sql = 
    `
    select * from ratings where m_id=:m_id and u_id=:u_id
    
    `

    let result = (await database.execute(sql,{m_id:m_id,u_id:u_id})).rows;

    console.log(result);

    if(result.length==0){ 

        console.log("user is giving the rating first time");

        sql =
        `
        insert into ratings(rating,u_id,m_id)
        values(:rating,:u_id,:m_id)
        
        `
    
        await database.execute(sql,{rating:rating,u_id:u_id,m_id:m_id});
    
       next();
    }else{
        
        let r_id = result[0].R_ID ;

        console.log("rating has already been given, so updating")

        sql =
        `
        update ratings
        set rating=:rating
        where r_id = :r_id
        `
    
        await database.execute(sql,{rating:rating,r_id:r_id});
    
        next();
    
    }

   
    // res.json({message:"rating edited"});
}


async function getRating(req,res){

    let m_id = req.params.id;

    let sql = `select avg(rating) rating from ratings where m_id=:m_id` ;

    let result = (await database.execute(sql,{m_id:m_id})).rows;

    res.json({rating:result[0].RATING});
}



async function getCitiesAndTheatres(req,res){


    const {m_id,city} = req.query;

    if(!city){

        // i need to find those cities in the theatre of which the movie is showing

        let sql = 

        `SELECT distinct t.city name
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
    SELECT t.t_id,(name||','||building || ','||road||','||city) location 
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


async function topMovie(req,res){

    let sql,result,earning,total_booking ;

    sql=
    `
    CREATE OR REPLACE VIEW top_movie
	as
    SELECT mt.m_id,sum(s.PRICE) earning,count(*) total_booking
	FROM bookings b,SHOWTIMES sh,MOVIETHEATRES mt,seats s
	WHERE b.SHOW_ID = sh.SHOW_ID
	AND sh.MT_ID = mt.MT_ID
	AND b.S_ID = s.S_ID 
	AND sh.G_ID = s.G_ID 
	GROUP BY mt.m_id
	ORDER BY earning DESC
	FETCH FIRST 1 ROW only
    `

    await database.execute(sql,{});

    result = (await database.execute('select * from top_movie',{})).rows;

    let m_id = result[0].M_ID ;
    earning = result[0].EARNING;
    total_booking = result[0].TOTAL_BOOKING;

    sql = 
    `select * from 
     movies
     where m_id=${m_id} `

    result = (await database.execute(sql,{})).rows;

    res.json({
        movie:result,
        earning:earning,
        total_booking:total_booking
    })
}


module.exports = 
{addMovie,
getAllMovies,
getMovieById,
getCurrent,
comingSoon,
getCitiesAndTheatres,
getMovieReviews,
addMovieReview,
editReview,
deleteReview,
addRating,
getRating,
addDirector,
addGenres,
topMovie}; 
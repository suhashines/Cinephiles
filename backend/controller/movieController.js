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

    // const sql = ` SELECT m_id,title,release_date,duration,SUBSTR(synopsis, 1, INSTR(synopsis,'.') - 1) AS synopsis,poster_url,back_poster_url FROM MOVIES m ORDER BY RELEASE_DATE DESC FETCH FIRST 100 ROWS ONLY `
    const sql = ` SELECT m_id,title,release_date,duration,SUBSTR(synopsis, 1, INSTR(synopsis,'.') - 1) AS synopsis,poster_url FROM MOVIES m ORDER BY RELEASE_DATE DESC FETCH FIRST 100 ROWS ONLY `
    console.log('req recieved for fetching all movies');

    let result;


    try{


        result = (await database.execute(sql,{})).rows ;

    }catch(err){

    return res.json({success:false,message:"database error"});
       console.log(err);
    }

    console.log(result);

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

    let sql,result ;

    try{
        sql = `select * from movies where `
    }catch(err){

    }

}

async function comingSoon(req,res){

    let sql,result ;

    try{

        sql = `select * from movies where release_date > sysdate+7` ;

        result = (await database.execute(sql,{})).rows;
        
    }catch(err){

        return res.json({success:false,message:"database error"});

    }

    res.json({
        success:false,
        movies: result
    });
}


module.exports = {addMovie,getAllMovies,getMovieById,getCurrent,comingSoon};
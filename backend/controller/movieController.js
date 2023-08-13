const database = require('../database/database');

const jwt = require('jsonwebtoken');


async function addMovie(req,res){


    //first we need to verify the admin

    const extractedToken = req.cookies.access_token ;  //we'll put the token inside bearer token

    if(!extractedToken){
        return res.json({success:false,message:"token not found"})
    }

    console.log("extracted token",extractedToken);


    let admin_id ;

    //verification steps 

    jwt.verify(extractedToken, process.env.secretKey, (err, decrypted) => {

        if (err) {
            return res.status(400).json({ success: false, message: "authorization failed" });
        }
        // decrypt the token , store admin_id from the decrypted token
        admin_id = decrypted.id;
        console.log("admin with id ", admin_id);

        return;
    })
    
    
    //admin has been verified. Now he can add movie here 



    let movie = req.body ;


    console.log("movie received: ",movie);

        let sql ;

        const movies = (await database.execute('select * from movies order by movie_id desc',{})).rows;

        console.log(movies);

        const newId = movies[0].M_ID + 1 ;

        console.log(newId);

    try{

        sql = 'insert into movies(movie_id,title,description,release_date,poster_url,admin_id) values(:movie_id,:title,:description,:release_date,:poster_url,:admin_id) ' ;
        binds = {movie_id:newId,title:movie.title,description:movie.description,release_date:movie.release_date,poster_url:movie.poster_url,admin_id:admin_id} ;

        let output = (await database.execute(sql,binds)).rowsAffected;

        console.log(output," row affected");

    }catch(err){

         console.log(err) ;

         return res.json({success:false,message:"database error"}) ;
    }


    return res.json({"success":true, "message":"movie added successfully"}) ;


}



async function getAllMovies(req,res){

    const sql = 'select * from movies';

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


module.exports = {addMovie,getAllMovies,getMovieById};
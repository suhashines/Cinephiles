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

    sql = `SELECT * FROM movies WHERE m_id IN (SELECT m_id FROM MOVIETHEATRES WHERE t_id = :t_id ) ` ;

    result = (await database.execute(sql,{t_id:t_id})).rows ;


    res.json({result});

}


async function getCurrentMovies(req,res){

}

async function getNextWeekMovies(req,res){


}

async function getComingSoonMovies(req,res){

}


module.exports = {getAllCities,getTheatreByCity,getTheatreMovies,getCurrentMovies,getNextWeekMovies,getComingSoonMovies};
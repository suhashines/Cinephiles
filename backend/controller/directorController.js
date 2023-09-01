const database = require('../database/database');


async function getAllDirectors(req,res){

    let result ;
    const sql = 'select * from directors' ;
    const binds = {} ;

    try{

        result = (await database.execute(sql,binds)).rows ;
        console.log(result);

    }catch(e){
        console.error(e);
        return res.json({"message":"unknown error occured"});
    }

    res.json({"message":"fetched data successfully", 
               "directors":result}) ;

}


async function getDirectorById(req,res){

    const d_id = req.params.id ;

    console.log("trying to fetch director id: "+d_id) ;

    let sql, result ;

    try{

        sql = 'select * from directors where d_id = :d_id' ;

        result = (await database.execute(sql,{d_id:d_id})).rows ;

    }catch(err){

        console.log(err) ;
        return res.json({"message":"database error"});

    }finally{

        if(result.length==0){
            return res.json({success:false,message:"No such director"});
        }

        res.json({success:true,director:result[0]}) ;
    }

}


async function getMoviesByDirector(req,res){

    let name = req.params.name ;

    // this name must be like this 'quntin-trntino' 


    console.log(typeof(name)) ;

    console.log(name) ;

    // console.log(`'${name}'`) ;

    let sql, result ;

    try{


        sql = 
        
        `SELECT * FROM movies
         WHERE d_id = (SELECT d_id FROM directors where utl_match.edit_distance(lower(name),replace(:name,'-',' ')) <= 10 ) ` 

        result = (await database.execute(sql,{name:name})).rows ;
        
    }catch(err){

        console.log(err) ;
 
        return res.json({success: false, "message":"database error"}) ; 
    }


    res.json({success:true,
        movies : result}) ;

}



async function addDirector(req,res){
    
    let sql, result ;

    const {name,country,dob} = req.body ;

    if(!name || !country ){

        return res.json({success:false,message:"all fields are required"}) ;
    }

    try{

        sql = `select * from directors where name=:name and country=:country ` ;

        result = (await database.execute(sql,{name:name,country:country,dob:dob})).rows ;

    }catch(err){
        console.log(err);
    }
   

    if(result.length!=0){
        return res.json({success:true,directorId:result[0].D_ID});
    }


    let pk ;


     try{

        sql =  `SELECT * FROM DIRECTORS ORDER BY D_ID DESC` ;

        result = (await database.execute(sql,{})).rows ;

         pk = result[0].D_ID + 1 ;


        sql = `INSERT INTO DIRECTORS(D_ID,NAME,COUNTRY,DOB) VALUES(:id,:name,:country,:dob)` ;

        (await database.execute(sql,{id:pk,name:name,country:country,dob:dob})) ;

     }catch(err){
        console.log(err);
     }

     return res.json({success:true,directorId:pk}) ;

}


module.exports = {getAllDirectors,getDirectorById,getMoviesByDirector,addDirector};
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
        res.json({"message":"unknown error occured"});
    }

    res.json({"message":"fetched data successfully", 
               "directors":result}) ;

}


module.exports = {getAllDirectors};
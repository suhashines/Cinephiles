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





module.exports = {getAllDirectors,getDirectorById};
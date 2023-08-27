const database = require('../database/database');

async function getAllTheatres(req,res){

    let sql,result ;

    try{

        sql = 'select * from theatres' ;

         result = (await database.execute(sql,{})).rows; 

    }catch(err){
        console.log(err);
    }

    return res.json({success:true,result:result});
}

module.exports = {getAllTheatres};
const database = require('../database/database');


async function login(req,res){

const {email,password} = req.body ;

if(!email || !password){
    return res.json({success:false,message:"All fields are required"});
}

let sql , result ;

    try{

        sql = 'Select * from superAdmin where email=:email';

        result = (await database.execute(sql,{email:email})).rows;
    }catch(err){
        console.log(err);
    }

    if(result.length==0){
        return res.json({success:false,message:"Wrong email"});
    }

    if(password!=result[0].password){
        return res.json({success:false,message:"Wrong password"});
    }

    // here we've to create jwt

    

}


module.exports = {login};
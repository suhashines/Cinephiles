const database = require('../database/database');
const jwt = require('jsonwebtoken');

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

    if(password!=result[0].PASSWORD){
        return res.json({success:false,message:"Wrong password"});
    }

    // here we've to create jwt

    const token = jwt.sign({id:result[0].ID},process.env.secretKey,{
        expiresIn:"1d"
    }) ;

    res.cookie('access_token',token,{httpOnly:true});

    return res.json({success:true,message:"Super Admin logged in successfully"});

}


async function addTheatre(req,res){

    const{building,road,city} = req.body ;


    if(!building || !city || !road){
        return res.json({success:false,message:"All fields are required"});
    }

    let sql , id , result ;


    try{
        sql = `select * from theatres where lower(building) = lower(:building) and lower(road) = lower(:road) and lower(city) = lower(:city)` ;

        result = (await database.execute(sql,{building:building,road:road,city:city})).rows;

    }catch(err){
        console.log(err);
    }

    if(result.length!=0)
        return res.json({success:false,message:"Theatre already exists"});



    try{
        sql = `select * from theatres order by t_id desc` ;

        result = (await database.execute(sql,{})).rows ;
    }catch(err){
        console.log(err);
    }

    id = result[0].T_ID + 1 ;

    try{

        sql = `INSERT INTO theatres(t_id,building,road,city) VALUES(:id,:building,:road,:city)` ;

        await database.execute(sql,{id:id,building:building,road:road,city:city});

    }catch(err){
        console.log(err);
    }

    res.json({success:true,message:"Theatre added successfully"});
}


async function getAllManagers(req,res){

    let sql,result ;

    sql = `select * from admins` ;

    result = (await database.execute(sql,{})).rows ;

    return res.json({success:true,result:result});
}

async function assignManager(req,res){

    
}


module.exports = {login,addTheatre,assignManager,getAllManagers};
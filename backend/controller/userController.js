const database = require('../database/database');
const bcrypt = require('bcrypt');

async function getAllUsers(req,res){

    let result;

    const sql = 'select * from users' ;
    const binds = {};

    try{

        result = (await database.execute(sql,binds)).rows ;

        console.log(result);

    }catch(e){

        console.log(e);
        res.json({success:false})

    }

    res.json({success:true,result}) ;
}

async function signupUser(req,res){

    console.log("req received for registering user");
  
    let data = req.body;

    console.log(data);

    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
        return res.status(400).json({ error: 'All fields are required.' });
      }  //here return means now we're going to exit from the function as well

    let sql,result ;
  
    if (data.password != data.confirmPassword) {
      res.json({
        success: false,
        message: "password doesn't match",
      });
    } else {

      sql = 'SELECT * FROM USERS WHERE EMAIL = :email' ;

      result = (await database.execute(sql,{email:data.email})).rows ;

      console.log(result);
  
      if (result.length!=0) {
        return res.json({
          success: false,
          message: "User already exists",
        });
      } else {

      

        let salt = await bcrypt.genSalt() ;

        let hashedString = await bcrypt.hash(data.password,salt) ;

        data.password = hashedString ;

        console.log('hashed password',data.password);

        // set id for the new user using users_seq.nextval 
        // but this approach is problematic 

        // we try a new approach

        try{

          result = (await database.execute('select * from users order by u_id desc',{})).rows ;

        }catch(err){
          console.log(err)
          return res.json("error occured while setting pk")
        }


        let userId ;

        if(result.length!=0){

          userId = result[0].U_ID + 1 ;
        }else{

          userId = 0 ;
        }

        sql = 'INSERT INTO USERS(U_ID,NAME,EMAIL,PASSWORD) VALUES(:u_id,:name,:email,:password)' ;

        let rowsAffected ;
        
        try{
            
           (await database.execute(sql,{u_id:userId,name:data.name,email:data.email,password:data.password})) ;

            

        }catch(e){
            console.log(e);
            return res.json({message:"Error occured while registering user"})
        }finally{

          return res.json({"success":true,"message":"user registered successfully"});
        }


      }
    }


}


async function getAllBookingOfUser(req,res){

    let user_id = req.params.id ;

    console.log('fetching all bookings of user ',user_id);

    let allBookings ;

    try{
      const sql = 'select * from bookings where user_id=:user_id' ;
      const binds = {user_id:user_id};

      allBookings = (await database.execute(sql,binds)).rows ;

    }catch(err){
      return res.json({message:"unable to get all bookings"});
    }

    return res.json({allBookings});
}


module.exports={getAllUsers,signupUser,getAllBookingOfUser} ;
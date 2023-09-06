const database = require('../database/database');
const bcrypt = require('bcrypt');

async function getAllUsers(req,res){

    let result;

    const sql = `select * from users ` ;
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
        return res.json({ success:false, message: 'All fields are required.' });
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

async function getUserDetails(req,res){

    console.log("got access_id : ",req.params.id) ;

    let u_id = req.params.id;

    let sql,result ;

    try{
      sql = `select * from users where u_id=:u_id` ;

      result = (await database.execute(sql,{u_id:req.params.id})).rows;
    }catch(err){
      console.log(err);
    }

    return res.json({success:true,result:result[0]});
}




async function signOut(req,res){

  res.cookie('access_token','');

  res.json({success:true});

}


async function changePassword(req,res){

  let {u_id,oldPassword,newPassword,confirmPassword} = req.body ;

  if(newPassword!=confirmPassword)
    return res.json({success:false,message:"password and confirm password doesn't match"});

  let sql,result ;

  try{

    sql = 'select password from users where u_id=:u_id' ;

    result = (await database.execute(sql,{u_id:u_id})).rows; 

  }catch(err){
    console.log(err);
  }

  let user = result[0] ;


  let isCorrectPassword = await bcrypt.compare(oldPassword, user.PASSWORD);

  if(!isCorrectPassword)
    return res.json({success:false,message:"Please Enter Correct Password"});

  // now we hash the new Password 

  let salt = await bcrypt.genSalt() ;

  let hashedString = await bcrypt.hash(newPassword,salt) ;

  newPassword = hashedString ;

  console.log("my new password ",newPassword);


  try{

    sql = `update users set password=:newPassword where u_id = :u_id` ;

    (await database.execute(sql,{newPassword:newPassword,u_id:u_id}));

  }catch(err){
    console.log(err);
  }

  res.json({success:true,message:"password changed successfully"});


}


async function editDetails(req,res){

    const user_id = req.params.id ;

    console.log("got the user id",user_id);

    console.log(req.body);

    const {name,email,gender,mobile} = req.body;

    let sql,result ;

    sql = 
    `select * 
    from users u 
    where u.u_id <> ${user_id} and email = '${email}' ` ;

    result = (await database.execute(sql,{})).rows;

    console.log(result);

    if(result.length!=0){
      return res.json({success:false,message:"This email already exists"}) ;
    }

    sql = 
    `
    update users u 
    set name=:name,email = :email, gender = :gender,mobile = :mobile
    where u.u_id = :user_id
     ` 

    await database.execute(sql,{name:name,email:email,gender:gender,mobile:mobile});

    res.json({success:true,message:"Edited"});

}


module.exports=
{getAllUsers,signupUser,getUserDetails,signOut,changePassword,editDetails} ;
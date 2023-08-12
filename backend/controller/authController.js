const database = require('../database/database');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');



async function loginUser(req,res){

    console.log("req received for postLogin");

    let sql,result ;
  
    const data = req.body;
  
    console.log("data received from frontend", data); 
  
    // let user = await userModel.findOne({ email: data.email });

    sql = 'SELECT * FROM USERS WHERE EMAIL = :email' ;

    result = (await database.execute(sql,{email:data.email})).rows ;

    console.log(result);
  
  
    if (result.length==0) {
      return res.json({
        success: false,
        message: "invalid username",
      });
    } else {
      

      let user = result[0] ;

      console.log(user.PASSWORD);

      //the function returns a result which is either true or false
  
      let isCorrectPassword = await bcrypt.compare(data.password, user.PASSWORD);
  
      if (isCorrectPassword) {

        console.log("password matched,authenticated");
  
       // remember to create a jwt token for the user

        const token = jwt.sign({id:user.U_ID},process.env.secretKey,{
          expiresIn:"1d"
      })

       res.cookie('jwt',token,{httpOnly:true}) ;

       res.json({
          success: true,
          message: "Login Successful",
          userToken: token
        });

        console.log('response has been sent'); 


      } else {
        res.json({
          success: false,
          message: "incorrect password"
        });
      }
    }
}


module.exports = {loginUser}
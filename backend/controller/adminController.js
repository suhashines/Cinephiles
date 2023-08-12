const database = require('../database/database');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


async function signupAdmin(req,res){

    console.log("req received for registering admin");
  
    let data = req.body;

    console.log(data);

    if (!data.email || !data.password || !data.confirmPassword) {
        return res.status(400).json({ error: 'All fields are required.' });
      }  //here return means now we're going to exit from the function as well

    let sql,result ;
  
    if (data.password != data.confirmPassword) {
      res.json({
        success: false,
        message: "password doesn't match",
      });
    } else {

      sql = 'SELECT * FROM ADMIN WHERE EMAIL = :email' ;

      result = (await database.execute(sql,{email:data.email})).rows ;

      console.log(result);
  
      if (result.length!=0) {
        return res.json({
          success: false,
          message: "Admin already exists",
        });
      } else {


        let salt = await bcrypt.genSalt() ;

        let hashedString = await bcrypt.hash(data.password,salt) ;

        data.password = hashedString ;

        console.log('hashed password',data.password);

        // set id for the new admin

        const admin = (await database.execute('select * from admin',{})).rows;

        console.log(admin);

        const len = admin.length ;

        const prevId = admin[len-1].ADMIN_ID ;  //this is hell of a error, always be aware of this

        // console.log(typeof(prevId));

        const newId = prevId + 1 ;

        // console.log(newId);

        sql = 'INSERT INTO ADMIN(ADMIN_ID,EMAIL,PASSWORD) VALUES(:admin_id,:email,:password)' ;
        
        try{
            
            const output = (await database.execute(sql,{admin_id:newId,email:data.email,password:data.password})).rowsAffected;

            console.log(output);

        }catch(e){
            console.log(e);
            return res.json({message:"Error occured while registering admin"})
        }

        if(rowsAffected){

            res.json({
                success: true ,
                message: "admin registered successfully" 
            })
        }else{

          res.json({
               success: false,
              message: "find out why no row is affected"
            })
            
        }


      }
    }

}


async function loginAdmin(req,res){

    console.log("req received for admin Login");

    let sql,result ;
  
    const data = req.body;
  
    console.log("data received from frontend", data);
  
    // let user = await userModel.findOne({ email: data.email });

    sql = 'SELECT * FROM ADMIN WHERE EMAIL = :email' ;

    result = (await database.execute(sql,{email:data.email})).rows ;

    console.log(result);
  
  
    if (result.length==0) {
      return res.json({
        success: false,
        message: "invalid username",
      });
    } else {
      

      let admin = result[0] ;

      console.log(admin.PASSWORD);

      //the function returns a result which is either true or false
  
      let isCorrectPassword = await bcrypt.compare(data.password, admin.PASSWORD);
  
      if (isCorrectPassword) {

        console.log("password matched,authenticated");
  
        //res.cookie("isLoggedIn", true, { httpOnly: true });
  
        // before using cookies we will create jwt
  
        // first we need payload which is a unique id, in that case we can use our admin_id
        // then we need a secret key
        //and finally we set an expiry time
  
        const token = jwt.sign({id:admin.ADMIN_ID},process.env.secretKey,{
            expiresIn:"1d"
        })
  
        // let token = jwt.sign({ payload: uid }, secretKey); // by default the algorithm is defined here
  
        //token contains an important thing , signature

        console.log('cookie is made');

        res.cookie("isLoggedIn", 'true');

    

       res.json({
          success: true,
          message: "Login Successful",
          token,
          id:admin.ADMIN_ID
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


module.exports = {signupAdmin,loginAdmin};
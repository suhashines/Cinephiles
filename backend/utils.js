const jwt = require('jsonwebtoken');

function verifyToken(req,res,next){

    console.log(req.cookies);

    const extractedToken = req.cookies.access_token ;  

    console.log("extracted token",extractedToken);


    //verification steps 

    jwt.verify(extractedToken, process.env.secretKey, (err, decrypted) => {

        if (err) {
            return res.status(400).json({ success: false, message: "authorization failed" });
        }
        // decrypt the token , store user_id from the decrypted token
         req.access_id = decrypted.id;
         console.log("user with id ", req.access_id);

        next();
    })
    
}

module.exports = {verifyToken};
const express = require('express'); 

const app = express() ;

const cors = require('cors');

const cookieParser = require('cookie-parser'); 

app.use(cors());

app.use(express.json());    

app.use(cookieParser());
 
const directorRouter = require('./router/directorRouter');

const userRouter = require('./router/userRouter'); 

const authRouter = require('./router/authRouter');

const adminRouter = require('./router/adminRouter'); 

const movieRouter = require('./router/movieRouter');

const bookingRouter = require('./router/bookingRouter');


const port = 5000 ;       


app.listen(port,()=>{
    console.log("server is listening at port ",port);
})



app.use("/director",directorRouter);
app.use("/user",userRouter);
app.use('/auth',authRouter);  
app.use('/manager',adminRouter);
app.use('/movie',movieRouter);
app.use('/booking',bookingRouter); 


app.use("/",(req,res,next)=>{ 

    res.send("hi");     
});




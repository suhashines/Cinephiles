const express = require('express'); 

const app = express() ;

app.use(express.json());         
 
const directorRouter = require('./router/directorRouter');

const userRouter = require('./router/userRouter'); 

const authRouter = require('./router/authRouter');

const adminRouter = require('./router/adminRouter'); 

const movieRouter = require('./router/movieRouter');

const bookingRouter = require('./router/bookingRouter');


const port = 3000 ;       


app.listen(port,()=>{
    console.log("server is listening at port ",port);
})



app.use("/director",directorRouter);
app.use("/user",userRouter);
app.use('/auth',authRouter);  
app.use('/admin',adminRouter);
app.use('/movie',movieRouter);
app.use('/booking',bookingRouter);


app.use("/",(req,res,next)=>{

    res.send("hi");     
});




import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieById } from '../api-helpers/api-helpers';
import { Box, Button, Typography } from '@mui/material';

const Bookings = () => {
    const [movie, setMovie] = useState([]);
    const id = useParams().id;
    console.log(id);

    useEffect(()=>{
        getMovieById(id)
        .then((res) => setMovie(res.movie))
        .catch((err) => console.log(err));
    },[id]);
    console.log(movie[0]);

  return (    
    <Box
        display={"flex"}
        flexDirection={"column"}
        justifycontents={"center"}
        alignItems={"center"}        
        width={"100vw"}
        height={"265vh"}
        margin={"auto"}
        // marginTop={4}
    >
      <Box
        // display={"flex"}
        // flexDirection={"column"}
        style={{position:"relative"}}
        justifyContent={"left"}
        alignItems={"left"}        
        width={"98%"}
        height={"66vh"}
        margin={"auto"}
        marginTop={0}
        // padding={1}
        // borderRadius={10}
      >
        <img
          margin={"auto"}
          // marginTop={10}
          // marginLeft={4}
          style={{
            position:"absolute",
            left:"15%",
            top:"65%", 
            zIndex:2,
            border:"solid",
            borderColor:"white",
            borderWidth:2
        }} 
          src={movie[0]?.POSTER_URL} 
          alt={movie?.TITLE} 
          width={"22%"} 
          height={"85%"}
        >
        </img>
        <img
          justifyContent={"center"}
          margin={"auto"}
          // marginLeft={40}
          style={{
            position:"absolute",
            left:"10%", 
            zIndex:1
        }} 
          src={movie[0]?.BACK_POSTER_URL} 
          alt={movie?.TITLE} 
          width={"80%"} 
          height={"90%"}>
        </img>
        <Typography
          style={{            
            position:"absolute",
            left:"39%", 
            top:"95%", 
            zIndex:3,
            color:"#7c4699",
            fontWeight:"bold",
            fontSize:"35px",
            whiteSpace: "wrap", // Add this property to allow text wrapping
            maxWidth: "45%" // Set a maximum width to control wrapping behavior
            // transform:"translate(0%, 0%)"
          }}
          variant='h6'
        >
          {movie[0]?.TITLE}
        </Typography>
        <Box
          style={{
            position:"absolute",
            left:"39%", 
            top:"115%", 
            zIndex:3,
            // transform:"translate(0%, -50%)"
            // color:"white",
            
          }}
        >
          <Typography
          style={{
            // fontWeight:"bold",
            fontSize:"20px"
            
          }}            
          >
          <b>Release Date:</b> {new Date(movie[0]?.RELEASE_DATE).toDateString()}
          </Typography>
          <Typography
          style={{
            // fontWeight:"bold",
            fontSize:"20px",
            
          }}            
          >
          <b>Genre:</b> {new Array(movie[0]?.GENRE).toString()}
          </Typography>
          <Typography
            style={{
              // fontWeight:"bold",
              fontSize:"20px",            
            }}            
          >
          <b>Actors:</b> {new Array(movie[0]?.ACTOR).toString()}
          </Typography>
          <Typography
            style={{
              // fontWeight:"bold",
              fontSize:"20px",            
            }}            
          >
          <b>Director:</b> {movie[0]?.DIRECTOR}
          </Typography>
          <Typography
            style={{
              // fontWeight:"bold",
              fontSize:"20px",            
            }}            
          >
          <b>Duration:</b> {movie[0]?.DURATION} minutes
          </Typography>
          <Button 
              variant={"outlined"} 
              sx={{
                position:"absolute",
                left:"0%",
                top:"110%",
                margin:"auto", 
                color:"white", 
                bgcolor:"#7c4699", 
                fontSize:"12px", 
                borderColor:"#7c4699",
                width:"100%",
                '&:hover': {
                  backgroundColor: '#900c3f', 
                  borderColor: '#900c3f', 
                  color:"#e3e4e6"}}}                
          >
              Book
          </Button>
        </Box>
      </Box>
      {/* <Box>
        <Typography variant='h4'>
          {movie[0]?.TITLE}
        </Typography>
      </Box> */}
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifycontent={"center"}
        // alignItems={"center"}        
        width={"70%"}
        height={"100vh"}
        margin={"auto"}
        marginTop={-15}
        padding={1}
        // borderRadius={10}
      >
        <Typography
          color={"#7c4699"}
          textAlign={"left"}
          fontWeight={"bold"} 
          variant='h5'
        >
          SYNOPSIS
        </Typography>
        <Typography 
          variant='h5'
          marginTop={2}
          // textAlign={"center"}
        >
          {movie[0]?.SYNOPSIS}
        </Typography>
      </Box>
    </Box>
    
  )
}

export default Bookings
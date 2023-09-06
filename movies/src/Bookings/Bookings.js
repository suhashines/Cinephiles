import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieById } from '../api-helpers/api-helpers';
import { Box, Typography } from '@mui/material';

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
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}        
        width={"100vw"}
        height={"165vh"}
        margin={"auto"}
        // marginTop={4}
    >
      <Box
        // display={"flex"}
        // flexDirection={"column"}
        style={{position:"relative"}}
        justifyContent={"left"}
        alignItems={"left"}        
        width={"65%"}
        height={"40%"}
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
            left:"8%",
            top:"55%", 
            zIndex:2,
            border:"solid",
            borderColor:"white",
            borderWidth:2
        }} 
          src={movie[0]?.POSTER_URL} 
          alt={movie?.TITLE} 
          width={"30%"} 
          height={"70%"}>
        </img>
        <img
          justifyContent={"center"}
          margin={"auto"}
          style={{position:"absolute", zIndex:1}} 
          src={movie[0]?.BACK_POSTER_URL} 
          alt={movie?.TITLE} 
          width={"100%"} 
          height={"100%"}>
        </img>
      </Box>
      {/* <Box>
        <Typography variant='h4'>
          {movie[0]?.TITLE}
        </Typography>
      </Box> */}
    </Box>
  )
}

export default Bookings
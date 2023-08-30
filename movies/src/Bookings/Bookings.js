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
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}        
        width={"65vw"}
        height={"75vh"}
        margin={"auto"}
        marginTop={4}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"left"}
        alignItems={"left"}        
        width={"45%"}
        height={"100%"}
        margin={"auto"}
        // padding={1}
        // borderRadius={10}
      >
        <img src={movie[0]?.POSTER_URL} alt={movie?.TITLE} width={"100%"} height={"100%"}></img>
      </Box>
      <Box>
        <Typography variant='h4'>
          {movie[0]?.TITLE}
        </Typography>
      </Box>
    </Box>
  )
}

export default Bookings
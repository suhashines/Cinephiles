import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllMovies } from '../../api-helpers/api-helpers';
// import ShowTimeItems from './ShowTimeItem';
import MovieDetails from './MovieDetails';

const ShowTimes = () => {
  const [movies, setMovies] = useState([]);
  useEffect(()=>{
    getAllMovies()
    .then((data)=>setMovies(data.result))
    .catch((err)=>console.log(err))
  },[])
  return (
    <Box 
        margin={"auto"} 
        margintop={4}    
    >
      <Typography variant='h4'
       padding={4} 
       width={"96.2%"} 
       bgcolor={"#900c3f"}         
       color={"white"} 
       align='center'>
        ShowTimes
      </Typography>
      <Box display={"flex"}
        width={"100%"}
        flexWrap={"wrap"}
        // justifyContent={"center"}
        >
        {movies && movies.map((movie,index)=>(
          <MovieDetails movie={movie} key={index}/>
        ))}
      </Box>
    </Box>
  )
}

export default ShowTimes
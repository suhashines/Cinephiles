import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieItem from './MovieItem';
import { getAllMovies } from '../../api-helpers/api-helpers';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  useEffect(()=>{
    getAllMovies()
    .then((data)=>setMovies(data.movies))
    .catch((err)=>console.log(err))
  },[])
  return (
    <Box margin={"auto"} margintop={4}>
      <Typography variant='h4'
       padding={4} 
       width={"100%"} 
       bgcolor={"#900c3f"} 
       color={"white"} 
       align='center'>
        All Movies
      </Typography>
      <Box display={"flex"}
        width={"100%"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        margin={"auto"}>
        {movies && movies.map((movie,index)=>(
          <MovieItem id={movie.id} 
          title={movie.title} 
          posterurl={movie.posterurl} 
          releaseDate={movie.posterurl} 
          key={index}
          />
        ))}
      </Box>
    </Box>
  )
}

export default Movies
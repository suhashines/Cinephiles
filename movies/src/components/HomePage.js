import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieItem from './Movies/MovieItem'
import { Link } from 'react-router-dom'
import { getAllMovies } from '../api-helpers/api-helpers'

const HomePage = () => {
  const [movies, setMovies] = useState([])
  useEffect(()=>{
    getAllMovies().then((data)=>setMovies(data.movies)).catch((err)=>console.log(err))
  },[])
  return (
    <Box width={"100%"} height={"100%"} marginTop={2} margin={"auto"}>
      <Box width={"80%"} height={"40vh"} padding={2} margin={"auto"}>
        <img
          src='https://www.thestatesman.com/wp-content/uploads/2022/06/maxresdefault-1-1.jpg'
          alt='Bramhastra'
          width={"100%"}
          height={"100%"}
        />
      </Box>
      <Box padding={5} margin={"auto"}>
        <Typography variant='h4' align='center'>Latest Releases</Typography>
      </Box>
      <Box display={"flex"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        margin={"auto"}
        width={"80%"}>
        {movies && movies.slice(0,4).map((movie,index)=>(
          <MovieItem id={movie.id} 
          title={movie.title} 
          posterurl={movie.posterurl} 
          releaseDate={movie.releaseDate} 
          key={index}
          />
        ))}
      </Box>
      <Box display={"flex"} padding={5} margin={"auto"}>
        <Button LinkComponent={Link} to="/movies" 
        variant={"outlined"} 
        sx={{margin:"auto", color:"#2b2d42"}}>
          View All Movies
        </Button>
      </Box>
    </Box>
  )
}

export default HomePage
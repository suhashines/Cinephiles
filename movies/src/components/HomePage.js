import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieItem from './Movies/MovieItem'
import { Link } from 'react-router-dom'
import { getAllMovies } from '../api-helpers/api-helpers'

const HomePage = () => {
  const [movies, setMovies] = useState([])
  useEffect(()=>{
    getAllMovies().then((data)=>setMovies(data.result)).catch((err)=>console.log(err))
  },[])
  return (
    <Box width={"100%"} height={"100%"} marginTop={2} margin={"auto"}>
      <Box width={"80%"} height={"40vh"} padding={2} margin={"auto"}>
        <img
          src='https://today.thefinancialexpress.com.bd/uploads/1606038247.jpg'
          alt='Good Films Make Your Life Better'
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
          <MovieItem id={movie.M_ID} 
          title={movie.TITLE} 
          posterurl={movie.POSTER_URL}
          releaseDate={movie.RELEASE_DATE} 
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
import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieItem from './Movies/MovieItem'
import { getAllMovies } from '../api-helpers/api-helpers'

const HomePage = ({setValue, setView, view}) => {
  const [movies, setMovies] = useState([])
  
  useEffect(()=>{
    getAllMovies()
    .then((data)=>setMovies(data.result))
    .catch((err)=>console.log(err))
  },[])
  return (
    <Box width={"100%"} height={"100%"} marginTop={2} margin={"auto"}>
      <Box width={"80%"} height={"40vh"} padding={2} margin={"auto"}>
        <img
          src="https://prodimage.images-bn.com/pimages/0681410981006_p0_v1_s1200x630.jpg"
          alt='Theatre'
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
        {view? movies && movies.map((movie,index)=>(
            <MovieItem id={movie.M_ID} 
            title={movie.TITLE} 
            posterurl={movie.POSTER_URL} 
            releaseDate={movie.RELEASE_DATE} 
            key={index}
            />
        ))
          :movies && movies.slice(0,4).map((movie,index)=>(
            <MovieItem id={movie.M_ID} 
            title={movie.TITLE} 
            posterurl={movie.POSTER_URL} 
            releaseDate={movie.RELEASE_DATE} 
            key={index}
            />
          ))
        }
        
      </Box>
      <Box display={"flex"} padding={5} margin={"auto"}>
        <Button 
        variant={"outlined"}
        onClick={()=>setView(!view)} 
        sx={{margin:"auto", color:"#2b2d42"}}>
          { view ? "View Less" : "View More" }
        </Button>
      </Box>
    </Box>
  )
}

export default HomePage
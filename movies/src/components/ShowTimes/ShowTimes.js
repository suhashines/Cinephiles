import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllMovies, getCurrent } from '../../api-helpers/api-helpers';
// import ShowTimeItems from './ShowTimeItem';
import MovieDetails from './MovieDetails';
// import CircularProgress from '@mui/material/CircularProgress';
import CircularProgress from '@mui/joy/CircularProgress';


const ShowTimes = () => {
  const [movies, setMovies] = useState([]);
  useEffect(()=>{
    getCurrent()
    .then((data)=>setMovies(data.movies))
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
      
      <Box
        // justifyContent={"center"}
        display="flex"
        width="100%"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center" 
        minHeight="calc(100vh - 64px)" 
        position="relative"
      >
          {movies.length===0 && (<>
            <CircularProgress
              color="primary"
              determinate={false}
              size="lg"
              value={15}
              variant="solid"
            />
          </>)}
        {movies && movies.map((movie,index)=>(
          <MovieDetails movie={movie} key={index}/>
        ))}
      </Box>
    </Box>
  )
}

export default ShowTimes
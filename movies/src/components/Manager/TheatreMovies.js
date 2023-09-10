import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import MovieItems from '../Movies/MovieItem';
import { getCurrent, getTheatreMovies } from '../../api-helpers/api-helpers';
import TheatreMoviesCard from './TheatreMovieCard';

const TheatreMovies = ({setTabValue}) => {
    const id = useParams().id;
    const [movies, setMovies] = useState([]);
    useEffect(()=>{
    //   getTheatreMovies(id)
      getCurrent()
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
        <Box 
          display={"flex"}
          width={"100%"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          margin={"auto"}>
          {movies && movies.map((movie,index)=>(
            <TheatreMoviesCard 
                id={movie.M_ID} 
                title={movie.TITLE} 
                posterurl={movie.POSTER_URL} 
                releaseDate={movie.RELEASE_DATE}
                t_id={id} 
                key={index}
            />
          ))}
        </Box>
      </Box>
    )
}

export default TheatreMovies
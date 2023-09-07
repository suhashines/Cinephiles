import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieItem from './Movies/MovieItem'
import { getAllMovies, getCurrent } from '../api-helpers/api-helpers'

const HomePage = ({setValue, setView, view}) => {
  const [movies, setMovies] = useState([])
  
  useEffect(()=>{
    getCurrent()
    .then((data)=>setMovies(data.movies))
    .catch((err)=>console.log(err))
  },[])

  
    const [age, setAge] = React.useState('');
  
    const handleChange = (event) => {
      setAge(event.target.value);
    };
  return (
    <Box 
      width={"98vw"} 
      height={"100%"} 
      // marginTop={2} 
      margin={"auto"}
      
      // display={"flex"}
      // flexDirection={"row"}
    >
      <Box width={"80%"} height={"40vh"} padding={0} margin={"auto"}>
        <img
          src="https://prodimage.images-bn.com/pimages/0681410981006_p0_v1_s1200x630.jpg"
          alt='Theatre'
          width={"100%"}
          height={"100%"}
        />
      </Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
      >
        <form 
          // onSubmit={handleSearch}
        >
            <Box display="flex" alignItems="center" width={"100%"}>
              <Box padding={5} width="45%">
                <Typography variant="h4" align="center">
                  Latest Releases
                </Typography>
              </Box>
              <Box width="15%" padding={2}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={filter}
                    label="Filter"
                    // onChange={handleChangeFilter}
                  >
                    <MenuItem value="Title">Title</MenuItem>
                    <MenuItem value="Actor">Actor</MenuItem>
                    <MenuItem value="Director">Director</MenuItem>
                    <MenuItem value="Genre">Genre</MenuItem>
                    <MenuItem value="Duration">Duration</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box width="30%">
                <TextField
                  fullWidth
                  // width={"100%"}
                  required
                  id="outlined-required"
                  label="Search"
                  // value={search}
                  // onChange={(e) => setSearch(e.target.value)}
                />
              </Box>
              <Box width="5%" fontSize={10} paddingLeft={2}>
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{
                    margin: 'auto',
                    color: 'white',
                    bgcolor: '#7c4699',
                    fontSize: '12px',
                    '&:hover': {
                      backgroundColor: '#e3e4e6',
                      borderColor: '#7c4699',
                      color: '#7c4699',
                    },
                  }}
                >
                  Search
                </Button>
              </Box>
            </Box>
          </form>
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
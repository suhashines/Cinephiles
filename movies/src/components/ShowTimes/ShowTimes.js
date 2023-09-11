import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllCities, getAllMovies, getAllTheatres, getCurrent, getTheatreMovies } from '../../api-helpers/api-helpers';
// import ShowTimeItems from './ShowTimeItem';
import MovieDetails from './MovieDetails';
// import CircularProgress from '@mui/material/CircularProgress';
import CircularProgress from '@mui/joy/CircularProgress';
// import { getTheatreByCity } from '../../../../backend/controller/theatreController';
import BasicMenu from '../../Bookings/BasicMenu';


const ShowTimes = () => {
  const [movies, setMovies] = useState([]);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState('');
  const [locationId, setLocationId] = useState();

  useEffect(()=>{
    getAllCities()
    .then((data)=>setCities(data.cities))
    .catch((err)=>console.log(err))

    // getAllTheatres(city)
    // .then((data)=>setLocations(data.result))
    // .catch((err)=>console.log(err))

    // getTheatreMovies(locationId)
    // .then((data)=>setMovies(data.movies))
    // .catch((err)=>console.log(err))
  },[])

  const handleCityChange = (e) => {
    setCity(e.target.value)
    console.log(city)
    getAllTheatres(e.target.value)
    .then((data)=>setLocations(data.result))
    .catch((err)=>console.log(err))
  }

  const handleLocationChange = (e) => {
    setLocation(e.target.value)
    console.log(location)
    getTheatreMovies(e.target.value)
    .then((data)=>setMovies(data.movies))
    .catch((err)=>console.log(err))
  }

  return (
    <Box 
        margin={"auto"} 
        margintop={4}
        align="center"
        width={'100vw'}    
    >
      
      <Typography variant='h4'
       padding={4} 
       width={"100%"} 
       bgcolor={"#900c3f"}         
       color={"white"} 
       align='center'>
        ShowTimes
      </Typography>

      <Box
        display={"flex"}
        flexDirection={"column"}
        align="center"
        alignItems={"center"}
        justifyContent={"center"}
        width={"40%"}
      >
      <FormControl fullWidth sx={{mt:2}}>
        <InputLabel id="demo-simple-select-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          required
          label="City"
          name="city"
          type="text"
          onChange={handleCityChange}
        >
          {cities && cities.map((city,index)=>(
            <MenuItem key={index} value={city}>{city}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Theatre</InputLabel>
        <Select
          id="demo-simple-select"
          value={location}
          required
          label="Theatre"
          name="theatre"
          type="text"
          onChange={handleLocationChange}
        >
          {locations && locations.map((location,index)=>(
            <MenuItem key={index} value={location?.T_ID} onClick={()=>{setLocationId(location?.T_ID)}}>{location?.LOCATION}</MenuItem>
          ))}
        </Select>
      </FormControl>
        <hr></hr>
      </Box>
      
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
          <MovieDetails movie={movie} key={index} t_id={location}/>
        ))}
      </Box>
    </Box>
  )
}

export default ShowTimes
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieItem from './Movies/MovieItem'
import { getAllMovies, getCurrent, getTop, getUpcoming, search } from '../api-helpers/api-helpers'

const HomePage = ({setValue, setView, view}) => {
  const [movies, setMovies] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [top, setTop] = useState()
  const [earning, setEarning] = useState(0)
  const [booking, setBooking] = useState(0)
  const [Currentnputs, setCurrentInputs] = useState({
    filter:"",
    query:"",
  })
  const [UpcomingInputs, setUpcomingInputs] = useState({
    filter:"",
    query:"",
  })

  const dummyArray = [0, 1, 2];
  
  useEffect(()=>{
    getCurrent()
    .then((data)=>setMovies(data.movies))
    .catch((err)=>console.log(err))

    getUpcoming()
    .then((data)=>setUpcoming(data.movies))
    .catch((err)=>console.log(err))

    getTop()
    .then((data)=>{setTop(data.movie[0]);
                    setEarning(data.earning);
                    setBooking(data.booking);
                  })
    .catch((err)=>console.log(err))
  },[])
  
  const handleCurrentChange = (e) => {
    setCurrentInputs((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
    }))
  }

  const handleUpcomingChange = (e) => {
    setUpcomingInputs((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
    }))
  }

    const handleCurrentSearch = (e) => {
      e.preventDefault();
      search(Currentnputs.filter, Currentnputs.query)
      .then((data)=>setMovies(data.current))
      .catch((err)=>console.log(err))
    }

    const handleUpcomingSearch = (e) => {
      e.preventDefault();
      search(UpcomingInputs.filter, UpcomingInputs.query)
      .then((data)=>setUpcoming(data.upcoming))
      .catch((err)=>console.log(err))
    }

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
      {
        dummyArray.map((item, index) => (
        
          <>
            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              width={"100%"}
              key={index}
            >
              <form 
                onSubmit={item==0? handleCurrentSearch : handleUpcomingSearch}
              >
                  <Box display="flex" alignItems="center" width={"100%"}>
                    <Box padding={5} width="30vw">
                      <Typography variant="h4" align="center">
                        {item==0 &&"Latest Releases"}
                        {item==1 &&"Upcoming Movies"}
                        {item==2 &&"Top Movie of the Month"}
                      </Typography>
                    </Box>
                    {
                      (item== 0 || item==1) && (                      
                        <>
                          <Box width="15vw" padding={2}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={item==0? Currentnputs.filter : UpcomingInputs.filter}
                                required
                                label="Filter"
                                name="filter"
                                type="text"
                                onChange={item==0? handleCurrentChange : handleUpcomingChange}
                              >
                                <MenuItem value="title">Title</MenuItem>
                                <MenuItem value="actor">Actor</MenuItem>
                                <MenuItem value="director">Director</MenuItem>
                                <MenuItem value="genre">Genre</MenuItem>
                                <MenuItem value="duration">Duration</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                          <Box width="30vw%">
                            <TextField
                              fullWidth
                              // width={"100%"}
                              required
                              id="outlined-required"
                              label="Search"
                              value={item==0? Currentnputs.query : UpcomingInputs.query}
                              name="query"
                              type="text"
                              onChange={item==0? handleCurrentChange : handleUpcomingChange}
                            />
                          </Box>
                          <Box width="10vw" fontSize={10} paddingLeft={2}>
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
                      
                        </>
                      )
                    }
                    
                  </Box>
                </form>
              </Box>
            
                <Box display={"flex"}
                  justifyContent={"center"}
                  flexWrap={"wrap"}
                  margin={"auto"}
                  width={"80%"}>
                  {
                    item==0? 
                      movies && movies.slice(0,4).map((movie,hash)=>(
                        <MovieItem id={movie.M_ID} 
                        title={movie.TITLE} 
                        posterurl={movie.POSTER_URL} 
                        releaseDate={movie.RELEASE_DATE} 
                        key={hash}
                        />
                    ))
                      :item==1?
                        upcoming && upcoming.slice(0,4).map((movie,hash)=>(
                          <MovieItem id={movie.M_ID} 
                          title={movie.TITLE} 
                          posterurl={movie.POSTER_URL} 
                          releaseDate={movie.RELEASE_DATE} 
                          key={hash}
                          />
                        ))
                        :item==2 && (
                          <MovieItem id={top?.M_ID} 
                          title={top?.TITLE} 
                          posterurl={top?.POSTER_URL} 
                          releaseDate={top?.RELEASE_DATE} 
                          />
                        )
                  }
                    {/* {view? 
                      movies && movies.map((movie,index)=>(
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
                  } */}
                  
                </Box>
                <Box display={"flex"} padding={5} margin={"auto"}>
                  <Button
                    // key={index} 
                    variant={"outlined"}
                    onClick={()=>setView(!view)} 
                    sx={{margin:"auto", color:"#2b2d42"}}>
                      { view ? "View Less" : "View More" }
                  </Button>
                </Box>
              
                </>
              ))
            }
            
          </Box>
  )
}

export default HomePage
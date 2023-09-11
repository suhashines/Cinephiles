import React, { useEffect, useState } from 'react'
import { getCurrent, getMovieByTitle } from '../../api-helpers/api-helpers';
import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import TheatreMoviesCard from './TheatreMovieCard';
import { useParams } from 'react-router-dom';
import MovieCards from './MovieCards';

const AddShowTimes = () => {
    const [movies, setMovies] = useState([])
    const [movieTitles, setMovieTitles] = useState([])
    const [query, setQuery] = useState("")

    const id = useParams().id;
    
    useEffect(()=>{
    //   getMovieByTitle(query)
        getCurrent()
      .then((data)=>{setMovies(data.movies); setMovieTitles(data.movies.map((movie)=>movie.TITLE)) })
      .catch((err)=>console.log(err))

      setMovies(movies);
    },[])
    
    const handleChange = (e) => {
      setQuery(e.target.value)
      console.log(query)
    }
  
    const handleSearch = (e) => {
        e.preventDefault();
        getMovieByTitle(query)
        .then((data)=>setMovies(data.movies))
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
        <Box
            display={"flex"}
            flexDirection={"row"}
            align="center"
            alignItems={"center"}
            justifyContent={"center"}
            width={"100%"}
        >
        <form onSubmit={handleSearch}>
            <Box display="flex" alignItems="center" width={"80%"}>
                <Box paddingTop={5} paddingBottom={5} width="30vw">
                    <Typography variant="h4" align="left">
                        Search Movie By Title
                    </Typography>
                </Box>
                <Box width="15vw" padding={2}>
                    <FormControl fullWidth>
                        {/* <InputLabel id="demo-simple-select-label">Title</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={query}
                            required
                            label="Filter"
                            name="filter"
                            type="text"
                            onChange={handleChange}
                        >
                            {
                                movies.map((movie, index) => (
                                    <MenuItem key={index} value={movie.TITLE}>{movie.TITLE}</MenuItem>
                                ))
                            }
                        </Select> */}
                        {/* <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={movieTitles}
                            sx={{ width: 300 }}
                            value={query}
                            renderInput={(params) => <TextField {...params} label="Movie" />}
                            onChange={(event, newValue) => {
                                setQuery(newValue);
                            }}
                        /> */}
                        <Box width="15vw">
                            <TextField
                              fullWidth
                              // width={"100%"}
                              required
                              id="outlined-required"
                              label="Search"
                              value={query}
                              name="query"
                              type="text"
                              onChange={handleChange}
                            />
                        </Box>
                    </FormControl>
                </Box>
                {/* <Box width="30vw">
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
                </Box> */}
                <Box width="10vw" fontSize={10} paddingLeft={0} align={"right"}>
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
        <Box
            display={"flex"}
            flexDirection={"row"}
        >
        {
            movies?.map((movie, hash) => (
        
                <Box 
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    flexWrap={"wrap"}
                    margin={"auto"}
                    width={"80%"}
                    key={hash}
                >            
                    <MovieCards 
                        id={movie.M_ID} 
                        title={movie.TITLE} 
                        posterurl={movie.POSTER_URL} 
                        releaseDate={movie.RELEASE_DATE}
                        t_id={id}                         
                    />                
                </Box>
            
            ))}
            </Box>
        </Box>
    )
}

export default AddShowTimes
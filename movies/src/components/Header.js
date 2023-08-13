import React, { useEffect, useState } from 'react'
import MovieIcon from '@mui/icons-material/Movie';
import { AppBar, Autocomplete, Tab, Tabs, TextField, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system';
import { getAllMovies } from '../api-helpers/api-helpers';
import { Link } from 'react-router-dom';
import { MovieItem } from './Movies/MovieItem';


const Header = () => {
    const [value,setValue] = useState(0)
    
    useEffect(()=>{
        getAllMovies()
        .then((data)=>setMovies(data.result))  //  previously it was data.movies
        .catch((err)=>console.log(err))
    },[]);
    const [movies, setMovies] = useState([]);
  return (
    <AppBar position='sticky' sx={{bgcolor:"#2b2d42"}}>
        <Toolbar>
            <Box width={"20%"}>
                <MovieIcon/>
            </Box>
            <Box width={"30%"} margin={"auto"}>
            <Autocomplete
                freeSolo
                disableClearable
                options={movies && movies.map((option) => option.TITLE)}
                renderInput={(params) => (
                <TextField
                    {...params}
                    sx={{input: {color:"white"}, label: {color:"white"}}}
                    variant='standard'
                    label="Search"
                    placeholder="Search Across Movies & Theatres"
                    InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    }}
                />
                )}
            />
            </Box>
            <Box display={"flex"}>
                <Tabs textColor='inherit' 
                indicatorColor='secondary' 
                value={value} 
                onChange={(e,val)=>setValue(val)}>
                    <Tab LinkComponent={Link} to={"/movies"} label="Movies"/>
                    <Tab LinkComponent={Link} to={"/admin"} label="Admin"/>
                    <Tab LinkComponent={Link} to ={"/auth"} label="Auth"/>
                </Tabs>
            </Box>
        </Toolbar>
    </AppBar>
  )
};

export default Header
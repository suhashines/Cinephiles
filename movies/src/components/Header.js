import React, { useEffect, useState } from 'react'
import MovieIcon from '@mui/icons-material/Movie';
import { AppBar, Autocomplete, Button, IconButton, Tab, Tabs, TextField, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system';
import { getAllMovies } from '../api-helpers/api-helpers';
import { Link, useNavigate } from 'react-router-dom';
import { MovieItem } from './Movies/MovieItem';
import AuthForm from './Auth/AuthForm';


const Header = (props) => {   
    useEffect(()=>{
        getAllMovies()
        .then((data)=>setMovies(data.result))  //  previously it was data.movies
        .catch((err)=>console.log(err))
    },[]);

    const [movies, setMovies] = useState([]);

    const handleTabChange = (newValue) => {
        props.setPrevValue(props.value);
        props.setValue(newValue);
    };

    const navigate = useNavigate();

    const handleMovieIconClick = () => {
        props.setValue(0);
        navigate('/'); // Redirect to the base directory when the movie icon is clicked
    };

  return (
    <AppBar position='sticky' sx={{bgcolor:"#2b2d42"}}>
        <Toolbar>                
            <Button onClick={handleMovieIconClick} style={{color:'white'}}>
                <MovieIcon style={{color:'white'}}/>
                <span style={{ paddingLeft: '8px' }}>Cinephiles</span>
            </Button>
                            
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
                value={props.value} 
                onChange={(e,val)=>handleTabChange(val)}>
                    <Tab LinkComponent={Link} to={"/"} label="Home"/>
                    <Tab LinkComponent={Link} to={"/movies"} label="Movies"/>
                    <Tab LinkComponent={Link} to={"/admin"} label="Manager"/>
                    <Tab LinkComponent={Link} to ={"/auth"} label="User"/>
                </Tabs>
            </Box>
        </Toolbar>
    </AppBar>
  )
};

export default Header
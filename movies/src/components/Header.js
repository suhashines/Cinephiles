import React, { useEffect, useState } from 'react'
import MovieIcon from '@mui/icons-material/Movie';
import { AppBar, Autocomplete, Button, Tab, Tabs, TextField, Toolbar } from '@mui/material'
import { Box } from '@mui/system';
import { getAllMovies, getUserDetails } from '../api-helpers/api-helpers';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from '../store';


const Header = (props) => {
    const [user, setUser] = useState(null);

    // const dispatch = useDispatch();
    // const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
    // const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const [uid, setUid] = useState(localStorage.getItem('userId'));
    // const id = useParams().id;

    
    
    useEffect(() => {
        // if(isUserLoggedIn)
        if(localStorage.getItem('userId')) 
        getUserDetails(localStorage.getItem('userId'))
        .then((data) => {setUser(data);})
        .catch((err) => {console.log(err);});
      }, [localStorage.getItem('userId')]);
    console.log(user);

    const dispatch = useDispatch();
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

    useEffect(()=>{
        getAllMovies()
        .then((data)=>setMovies(data.result))  //  previously it was data.movies
        .catch((err)=>console.log(err))
    },[]);

    const logout = (isAdmin) => {
        dispatch(isAdmin ? adminActions.logout() : userActions.logout());
    }

    const [movies, setMovies] = useState([]);

    const handleTabChange = (newValue) => {
        props.setPrevValue(props.value);
        props.setValue(newValue);
    };

    const navigate = useNavigate();

    const handleMovieIconClick = () => {
        props.setValue(0);
        props.setView(false);
        navigate('/'); // Redirect to the base directory when the movie icon is clicked
        window.location.reload();
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
                onClick={() => {
                    props.setValue(0);
                    props.setView(false);
                    
                }}
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
                    <Tab value={0} LinkComponent={Link} to={"/"} label="Home"/>
                    <Tab value={1} LinkComponent={Link} to={"/showtimes"} label="ShowTimes"/>
                    <Tab 
                        value={2} 
                        LinkComponent={Link}
                        // to={!isAdminLoggedIn && !isUserLoggedIn ? "/auth" : isUserLoggedIn? `/profile` : "/manager/{id}"} 
                        // label={!isAdminLoggedIn && !isUserLoggedIn ? "Login" : "Profile"} 
                        to={!isAdminLoggedIn && !isUserLoggedIn ? "/auth" : isUserLoggedIn? "/profile" : "/manager"} 
                        label={!isAdminLoggedIn && !isUserLoggedIn ? "Login" : isUserLoggedIn? `${user?.NAME}` : "Manager"}
                        
                        onClick={() => {
                            // if(isAdminLoggedIn) dispatch(adminActions.logout());
                            // else if(isUserLoggedIn) dispatch(userActions.logout());
                            props.setMessage("");
                            // if(isAdminLoggedIn || isUserLoggedIn){
                            //     props.setValue(0);                                
                            // }
                            
                        }}
                    />
                    {/* {!isAdminLoggedIn && !isUserLoggedIn && (
                        <>
                            <Tab value={2} LinkComponent={Link} to={"/admin"} label="Manager"/>
                            <Tab value={3} LinkComponent={Link} to ={"/auth"} label="User"/>
                        </>
                    )}
                    {isUserLoggedIn && (
                        <>
                            <Tab value={2} LinkComponent={Link} to={"/profile/:id"} label="Profile"/>
                            <Tab value={3} onClick={() => logout(false)} LinkComponent={Link} to={"/"} label="Signout"/>
                        </>
                    )}
                    {isAdminLoggedIn && (
                        <>
                            <Tab value={2} LinkComponent={Link} to={"/add"} label="Add Movie"/>
                            <Tab value={3} LinkComponent={Link} to={"/manager"} label="Profile"/>
                            <Tab value={4} onClick={() => logout(true)} LinkComponent={Link} to={"/"} label="Signout"/>
                        </>
                    )}                     */}
                </Tabs>
            </Box>
        </Toolbar>
    </AppBar>
  )
};

export default Header
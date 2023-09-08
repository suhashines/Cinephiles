import { Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { adminActions, userActions } from '../../store';

const Manager = ({setTabValue}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {setTabValue(2)}, [])
  return (
    <Box>
        <Box
            display={"flex"}
            flexDirection={"column"}
            // justifyContent={"center"}
            alignItems={"center"}
            width={'30vw'}
            height={'65vh'}
            margin={"auto"}
            marginTop={10}
            bgcolor={"#edeef0"}
            borderRadius={5}
        >
            <Box
                marginTop={7}
            >
                <Typography
                    variant={"h4"}
                    fontWeight={'bold'}
                    color={"#7c4699"}
                >
                    Manager
                </Typography>
            </Box>
            <Box
                width={'75%'}
            >
                <Button 
                    variant={"outlined"}
                    LinkComponent={Link} 
                    to={`/addmovie`} 
                    sx={{                        
                        margin:"auto",
                        marginTop:5,
                        height:60, 
                        color:"white", 
                        bgcolor:"#7c4699", 
                        fontSize:"20px", 
                        borderColor:"#7c4699",
                        width:"100%",
                        borderRadius:10,
                        '&:hover': {
                        backgroundColor: '#900c3f', 
                        borderColor: '#900c3f', 
                        color:"#e3e4e6"}}}                
                >
                    Add Movie
                </Button>
            </Box>
            <Box
                width={'75%'}
            >
                <Button 
                    variant={"outlined"} 
                    sx={{
                        margin:"auto",
                        marginTop:5,
                        height:60, 
                        color:"white", 
                        bgcolor:"#7c4699", 
                        fontSize:"20px", 
                        borderColor:"#7c4699",
                        width:"100%",
                        borderRadius:10,
                        '&:hover': {
                        backgroundColor: '#900c3f', 
                        borderColor: '#900c3f', 
                        color:"#e3e4e6"}}}                
                >
                    Add Theater
                </Button>
            </Box>
            <Box
                width={'75%'}
            >
                <Button 
                    variant={"outlined"} 
                    sx={{
                        margin:"auto",
                        marginTop:5,
                        height:60, 
                        color:"white", 
                        bgcolor:"#7c4699", 
                        fontSize:"20px", 
                        borderColor:"#7c4699",
                        width:"100%",
                        borderRadius:10,
                        '&:hover': {
                        backgroundColor: '#900c3f', 
                        borderColor: '#900c3f', 
                        color:"#e3e4e6"}}}                
                >
                    Show Theaters
                </Button>
            </Box>
            <Box
                width={'75%'}
            >
                <Button 
                    variant={"outlined"}
                    LinkComponent={Link}
                    to={`/`}
                    onClick={()=>{
                        dispatch(adminActions.logout());
                        setTabValue(0);
                    }} 
                    sx={{
                        margin:"auto",
                        marginTop:5,
                        height:60, 
                        color:"white", 
                        bgcolor:"#7c4699", 
                        fontSize:"20px", 
                        borderColor:"#7c4699",
                        width:"100%",
                        borderRadius:10,
                        '&:hover': {
                        backgroundColor: '#900c3f', 
                        borderColor: '#900c3f', 
                        color:"#e3e4e6"}}}                
                >
                    Sign Out
                </Button>
            </Box>
        </Box>
    </Box>
  )
}

export default Manager
import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BasicInfo from './BasicInfo';
import ChangePass from './ChangePass';
import { getUserDetails } from '../../api-helpers/api-helpers';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const [value, setValue] = useState(0);
    const [user, setUser] = useState(null);
    // const id = useParams().id;
    
    useEffect(() => {
        getUserDetails(localStorage.getItem('userId'))
        .then((data) => {setUser(data);})
        .catch((err) => {console.log(err);});
      }, []);
    console.log(user);

  return (
    <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}        
        width={"65%"}
        height={"70vh"}
        margin={"auto"}
        marginTop={4}   
    >
        <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}        
            width={"30%"}
            height={"100%"}
            margin={"auto"}
            marginRight={1}
            borderRadius={10}
        >
            <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}        
                width={"95%"}
                height={"45%"}
                margin={"auto"}
                padding={1}
                boxShadow={2}
                bgcolor={"#edeef0"}
            >
                <Box
                    height={"50%"}
                    padding={1}
                >
                    <AccountCircleRoundedIcon style={{ fontSize: '150' }}/>
                </Box>
                <Box
                    padding={0.5}
                >
                    <Typography fontWeight={'bold'}>
                        {user?.NAME}
                    </Typography>                    
                </Box>
                <Box
                    padding={0.5}
                >
                    {user?.EMAIL}
                </Box>
                <Box padding={1}>
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{margin:"auto", color:"#7c4699", bgcolor:"#edeef0", fontSize:"12px", borderColor:"#7c4699",
                        '&:hover': {backgroundColor: '#900c3f', borderColor: '#900c3f', color:"#e3e4e6"}}}
                        size="small"
                        // className={classes.button}
                        // startIcon={<EditIcon />}
                    >
                        Edit Profile
                    </Button>
                </Box>

            </Box>

            <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}        
                width={"95%"}
                height={"10%"}
                margin={"auto"}
                padding={1}
                // boxShadow={2}
                bgcolor={"#d2d3d4"}
            >
                <Typography variant="h6" textAlign={"center"} width={"100%"} fontWeight={'bold'}>
                    Profile Menu
                </Typography>
            </Box>

            <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"left"}        
                width={"95%"}
                height={"45%"}
                margin={"auto"}
                padding={1}
                // boxShadow={2}
                bgcolor={"#edeef0"}
            >
                <Box height={'20%'} sx={{ "&:hover": { boxShadow: 10 } }}>
                    <Button onClick={()=>setValue(0)} style={{color:'black', width: '100%', height: '100%', justifyContent: 'left'}}>
                        <HomeIcon style={{color:'#7c4699'}}/>
                        <span style={{ paddingLeft: '8px' }}>Home</span>
                    </Button>
                </Box>
                <Box height={'20%'} sx={{ "&:hover": { boxShadow: 10 } }}>
                    <Button onClick={()=>setValue(1)}  style={{color:'black', width: '100%', height: '100%', justifyContent: 'left'}}>
                        <PersonIcon style={{color:'#7c4699'}}/>
                        <span style={{ paddingLeft: '8px' }}>Profile</span>
                    </Button>
                </Box>
                <Box height={'20%'} sx={{ "&:hover": { boxShadow: 10 } }}>
                    <Button onClick={()=>setValue(2)}  style={{color:'black', width: '100%', height: '100%', justifyContent: 'left'}}>
                        <LockOpenIcon style={{color:'#7c4699'}}/>
                        <span style={{ paddingLeft: '8px' }}>Change Password</span>
                    </Button>
                </Box>
                <Box height={'20%'} sx={{ "&:hover": { boxShadow: 10 } }}>
                    <Button onClick={()=>setValue(3)}  style={{color:'black', width: '100%', height: '100%', justifyContent: 'left'}}>
                        <ConfirmationNumberIcon style={{color:'#7c4699'}}/>
                        <span style={{ paddingLeft: '8px' }}>Tickets</span>
                    </Button>
                </Box>
                <Box height={'20%'} sx={{ "&:hover": { boxShadow: 10 } }}>
                    <Button onClick={()=>setValue(4)}  style={{color:'black', width: '100%', height: '100%', justifyContent: 'left'}}>
                        <ExitToAppIcon style={{color:'#7c4699'}}/>
                        <span style={{ paddingLeft: '8px' }}>Signout</span>
                    </Button>
                </Box>
            </Box>

        </Box>

        <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"left"}
            alignItems={"left"}        
            width={"50%"}
            height={"90%"}
            margin={"auto"}
            marginLeft={1}
            marginTop={0}
            padding={4}
            // boxShadow={2}
            borderRadius={1}
            bgcolor={"#edeef0"}
            // sx={{ "&:hover": { boxShadow: 10 } }}
        >
            {(value === 1) && <><BasicInfo/></>}
            {(value === 2) && <><ChangePass/></>}
            {/* {value === 2 && <><BasicInfo/></>}
            {value === 3 && <><BasicInfo/></>}
            {value === 4 && <><BasicInfo/></>} */}
        </Box>
    </Box>
  )
}

export default Profile
import React, { useEffect, useState } from 'react'
import { editProfile, getUserDetails } from '../../api-helpers/api-helpers';
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';

const EditProfile = (props) => {
    const labelStyle = {mt:1, mb:1}

    const [inputs, setInputs] = useState({
        u_id:localStorage.getItem('userId'),
        name:props.user.NAME,
        email:props.user.EMAIL,
        gender:props.user.GENDER,
        mobile:props.user.MOBILE
    })

    useEffect(() => {
        // if(isUserLoggedIn)
        if(localStorage.getItem('userId')) 
        getUserDetails(localStorage.getItem('userId'))
        .then((data) => {props.setUser(data);})
        .catch((err) => {console.log(err);});
      }, []);
    // console.log(user);

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    useEffect(() => {
        setMessage(message);
    }, [message]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            let editSuccess;
            editSuccess = await editProfile(inputs);
            setMessage(editSuccess.message);

            if(editSuccess.success){
                setInputs({
                    u_id:localStorage.getItem('userId'),
                    name:inputs.name,
                    email:inputs.email,
                    gender:inputs.gender,
                    mobile:inputs.mobile
                });
            }
        }catch(err){
            console.log(err);
        }

        
        
        // console.log("Change", changeSuccess);
    };

  return (
    <form onSubmit={handleSubmit}>
        <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            width={'100%'}
            // height={'100%'}
            margin={"auto"}
            // marginTop={10}
            // padding={6}
            >
            <FormLabel sx={{labelStyle}}>Name</FormLabel>
            <TextField
                value={inputs.name}
                onChange={handleChange}
                sx={{bgcolor:'white', width:'60%'}}
                variants={"standard"} 
                margin={"normal"}  
                type={"text"} 
                name="name"
            />
            <FormLabel sx={labelStyle}>Email</FormLabel>
            <TextField
                value={inputs.email}
                onChange={handleChange}
                sx={{bgcolor:'white', width:'60%'}} 
                variants={"standard"} 
                margin={"normal"}  
                type={"email"} 
                name="email"
            />
            <FormLabel sx={labelStyle}>Gender</FormLabel>
            <select
                id="gender"
                name="gender"
                value={inputs.gender}
                onChange={handleChange}
                style={{
                    width:'60%',
                    height: 60,
                    paddingLeft: 8,
                    fontSize: 16,
                }}
            >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            <FormLabel sx={labelStyle}>Mobile</FormLabel>
            <TextField
                value={inputs.mobile}
                onChange={handleChange}
                sx={{bgcolor:'white', width:'60%'}} 
                variants={"standard"} 
                margin={"normal"}  
                type={"text"} 
                name="mobile"
            />
            
            <Button 
                sx={{mt:2, borderRadius:10, bgcolor:"#2b2d42", color:"white", marginTop:4,
                '&:hover': {backgroundColor: '#7c4699', borderColor: '#7c4699', color:"#e3e4e6"}}} 
                type='submit'
                variant={"contained"}
                 
                // width={"200%"}
                >
                    {"Confirm Submission"}
            </Button>

            <Typography variant="h6" color={'red'} textAlign={"center"} marginTop={2}>
                {message}
            </Typography>                                
        </Box>
    </form>
  )
}

export default EditProfile
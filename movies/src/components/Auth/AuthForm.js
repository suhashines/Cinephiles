import React, {useEffect, useState} from 'react'
import {Box, Button, Dialog, FormLabel, IconButton, TextField, Typography} from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {useNavigate} from "react-router-dom";

const labelStyle = {mt:1, mb:1}

const AuthForm = ({onSubmit, 
                    setValue, 
                    prevValue, 
                    isAdmin, 
                    setIsAdmin, 
                    isAdminLoggedIn, 
                    isUserLoggedIn,
                    message,
                    success,
                    setMessage,
                    setSuccess}) => {

    useEffect(()=>{
        setMessage(message);
        setSuccess(success);
    },[message, success])
                        
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false)
    const [user, setUser] = useState(isUserLoggedIn)
    const [admin, setAdmin] = useState(isAdminLoggedIn)
    const [inputs, setInputs] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    useEffect(()=>{
        setAdmin(isAdminLoggedIn);
        setUser(isUserLoggedIn);
    },[isAdminLoggedIn, isUserLoggedIn])

    const handleChange = (e) => {
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!isUserLoggedIn && !isAdminLoggedIn){        
            const loginSuccess = await onSubmit({ inputs, signup: isSignup });
            console.log("loginSuccess", loginSuccess);
            if (loginSuccess && !isSignup) {
                console.log("loginSuccess", loginSuccess);            
                handleClose(); // Close the dialog on successful login
            }
        } else{setMessage("Already Logged In")}
        // setSuccess(await onSubmit({ inputs, signup: isSignup }));
        // if (success) {
        //     handleClose(); // Close the dialog on successful login
        // }
    };

    const handleClose = async () => {        
        navigate(-1);
        setValue(prevValue);
        setMessage("");                                     
    }
    const handleAction = () => {
        if(admin || user){
            handleClose();
        }
    }

  return (
    <Dialog PaperProps={{style:{borderRadius:20}}} open={true}>
        <Box sx={{ml:"auto", padding:1}}>
            <IconButton onClick={handleClose}>
                <CloseRoundedIcon/>
            </IconButton>
        </Box>
        <Typography variant="h4" textAlign={"center"}>
            {isSignup ? "Signup" : "Login"} as
        </Typography>
        <Typography variant="h4" textAlign={"center"}>
            {isAdmin ? "Manager" : "User"}
        </Typography>
        <form onSubmit={handleSubmit}>
            <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                width={400}
                margin={"auto"}
                padding={6}>
                {isSignup && (
                    <>
                    {" "}
                    <FormLabel sx={labelStyle}>Name</FormLabel>
                    <TextField 
                        value={inputs.name}
                        onChange={handleChange}
                        variants={"standard"} 
                        margin={"normal"}
                        type={"text"} 
                        name="name"/>
                    </>
                )}
                <FormLabel sx={labelStyle}>Email</FormLabel>
                <TextField
                    value={inputs.email}
                    onChange={handleChange} 
                    variants={"standard"} 
                    margin={"normal"} 
                    type={"email"} 
                    name="email"/>
                <FormLabel sx={labelStyle}>Password</FormLabel>
                <TextField
                    value={inputs.password}
                    onChange={handleChange} 
                    variants={"standard"} 
                    margin={"normal"}  
                    type={"password"} 
                    name="password"/>
                {isSignup && (
                    <>
                    <FormLabel sx={labelStyle}>Confirm Password</FormLabel>
                    <TextField
                    value={inputs.confirmPassword}
                    onChange={handleChange} 
                    variants={"standard"} 
                    margin={"normal"}  
                    type={"password"} 
                    name="confirmPassword"/>
                    </>
                )}
                
                <Button
                    // onClick={()=>handleAction()} 
                    sx={{mt:2, borderRadius:10, bgcolor:"#2b2d42", color:"white"}} 
                    type='submit'
                    variant={"contained"} 
                    fullWidth>
                        {isSignup ? "Signup" : "Login"}
                </Button>

                <Typography variant="h6" color={'red'} textAlign={"center"}>
                    {message}
                </Typography>

                <Button
                    onClick={()=>{setIsSignup(!isSignup);
                                    setMessage("");}} 
                    sx={{mt:2, borderRadius:10}} fullWidth>
                        Switch To {isSignup ? "Login" : "Signup"}
                </Button>
                
                <Button
                    onClick={()=>{setIsAdmin(!isAdmin);
                                    setMessage("");}} 
                    sx={{mt:2, borderRadius:10}} fullWidth>
                        {!isSignup ? "Login" : "Signup"} as {isAdmin ? "User" : "Manager"}
                </Button>
                
            </Box>
        </form>
    </Dialog>
  )
}

export default AuthForm
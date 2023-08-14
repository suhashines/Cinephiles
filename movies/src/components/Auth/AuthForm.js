import React, {useState, useEffect} from 'react'
import {Box, Button, Dialog, FormLabel, IconButton, TextField, Typography} from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {useNavigate} from "react-router-dom";

const labelStyle = {mt:1, mb:1}

const AuthForm = ({onSubmit, isAdmin, setValue, prevValue}) => {
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false)
    const [inputs, setInputs] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const handleChange = (e) => {
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignup){
            console.log("signup")
        }else{
            console.log("login")
        }
        onSubmit({inputs, signup : isAdmin ? false : isSignup});
    }
    const handleClose = () => {
        navigate(-1);
        setValue(prevValue);
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
                    sx={{mt:2, borderRadius:10, bgcolor:"#2b2d42", color:"white"}} 
                    type='submit'
                    variant={"contained"} 
                    fullWidth>
                        {isSignup ? "Signup" : "Login"}
                </Button>                
                <Button
                    onClick={()=>setIsSignup(!isSignup)} 
                    sx={{mt:2, borderRadius:10}} fullWidth>
                        Switch To {isSignup ? "Login" : "Signup"}
                </Button>
                
                
            </Box>
        </form>
    </Dialog>
  )
}

export default AuthForm
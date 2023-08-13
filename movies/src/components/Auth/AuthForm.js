import React, {useState, useEffect} from 'react'
import {Box, Button, Dialog, FormLabel, IconButton, TextField, Typography} from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
const labelStyle = {mt:1, mb:1}

const AuthForm = ({onSubmit, isAdmin}) => {
    const [isSignup, setIsSignup] = useState(false)
    const [inputs, setInputs] = useState({
        name:"",
        email:"",
        password:""
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
  return (
    <Dialog PaperProps={{style:{borderRadius:20}}} open={true}>
        <Box sx={{ml:"auto", padding:1}}>
            <IconButton>
                <CloseRoundedIcon/>
            </IconButton>
        </Box>
        <Typography variant="h4" textAlign={"center"}>
            {isSignup ? "Signup" : "Login"}
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
                {isAdmin && isSignup && (
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
                <Button 
                    sx={{mt:2, borderRadius:10, bgcolor:"#2b2d42", color:"white"}} 
                    type='submit'
                    variant={"contained"} 
                    fullWidth>
                        Login
                </Button>
                {!isAdmin && (
                    <Button
                        onClick={()=>setIsSignup(!isSignup)} 
                        sx={{mt:2, borderRadius:10}} fullWidth>
                            Switch To {isSignup ? "Login" : "Signup"}
                    </Button>
                )}
                
            </Box>
        </form>
    </Dialog>
  )
}

export default AuthForm
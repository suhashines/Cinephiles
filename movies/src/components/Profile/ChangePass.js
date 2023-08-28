import { Box, Button, FormLabel, TextField } from '@mui/material'
import React from 'react'

const ChangePass = () => {
  return (
    <form>
        <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            width={'100%'}
            // height={'100%'}
            margin={"auto"}
            marginTop={10}
            // padding={6}
            >
            <FormLabel>Old Password</FormLabel>
            <TextField
                // value={inputs.password}
                // onChange={handleChange}
                sx={{bgcolor:'white'}} 
                variants={"standard"} 
                margin={"normal"}  
                type={"password"} 
                name="old password"
            />
            <FormLabel>New Password</FormLabel>
            <TextField
                // value={inputs.password}
                // onChange={handleChange}
                sx={{bgcolor:'white'}} 
                variants={"standard"} 
                margin={"normal"}  
                type={"password"} 
                name="new password"
            />
            <FormLabel>Confirm Password</FormLabel>
            <TextField
                // value={inputs.confirmPassword}
                // onChange={handleChange}
                sx={{bgcolor:'white'}} 
                variants={"standard"} 
                margin={"normal"}  
                type={"password"} 
                name="confirmPassword"
            />
            
            <Button 
                sx={{mt:2, borderRadius:10, bgcolor:"#2b2d42", color:"white",
                '&:hover': {backgroundColor: '#7c4699', borderColor: '#7c4699', color:"#e3e4e6"}}} 
                type='submit'
                variant={"contained"}
                 
                // width={"200%"}
                >
                    {"Confirm Submission"}
            </Button>                                
        </Box>
    </form>
  )
}

export default ChangePass
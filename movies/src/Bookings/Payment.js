import { Box, Button, Dialog, IconButton, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const Payment = (props) => {
    const navigate = useNavigate();

    const handleClose = async () => {        
        navigate(-1);                                     
    }

    return (
        <Dialog PaperProps={{style:{borderRadius:20, padding:30}}} open={true}>
            <Box sx={{ml:"auto", padding:1}}>
                <IconButton onClick={handleClose}>
                    <CloseRoundedIcon/>
                </IconButton>
            </Box>
            <Typography variant="h4" textAlign={"center"}>
                Booking Summary
            </Typography>
            <Typography variant="h4" textAlign={"center"}>
                <br></br>
            </Typography>
            <Typography variant="h6" textAlign={"center"}>
                Successfully Booked: {props.booking?.successful?.join(", ")}
                {console.log(props.booking)}
            </Typography>
            <Typography variant="h6" textAlign={"center"}>
                Failed to Book: {props.booking?.failed?.join(", ")}
            </Typography>
            <Typography variant="h4" textAlign={"center"}>
                <br></br>
            </Typography>
            <Button
                onClick={()=>handleClose()} 
                sx={{mt:2, borderRadius:10, bgcolor:"#2b2d42", color:"white"}} 
                variant={"contained"} 
                // fullWidth
            >
                    OK
            </Button>
        </Dialog>
      )
}

export default Payment
import { Box, Button, Typography } from '@mui/material'
// import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';
// import LabelRoundedIcon from '@mui/icons-material/LabelRounded';
import React from 'react'
// import PlaneTicketCardDemo from './Ticket';

const ShowTimeItems = ({releaseDate, title}) => {
    const dummyArray = [0, 1, 2, 3];
  return (
    <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}        
        width={"100%"}
        height={"78%"}
        margin={"auto"}
        marginLeft={2}
        marginRight={2}
        padding={4}
        // border={"1px solid #4d4e4f"}
        boxShadow={2}
        // bgcolor={"#e6e355"}
        bgcolor={"#d2d3d4"}
        sx={{ "&:hover": { boxShadow: 10 } }}
    >
        <Box
            display={"flex"}
            // padding={1}
            width={"150%"}
            height={"20%"}
            marginBottom={"10%"}
            // marginTop={-2}
        >            
            <Typography variant="h6" textAlign={"center"} width={"100%"}>
                {new Date(releaseDate).toDateString().split(" ")[0]}{", "} 
                {new Date(releaseDate).toDateString().split(" ")[1]}
                {" "}{new Date(releaseDate).toDateString().split(" ")[2]}                
            </Typography>
        </Box>

        <Box
            display={"flex"}
            flexDirection={"row"}
            flexWrap={"wrap"}
            justifyContent={"center"}
            width={"100%"}
            height={"50%"}
            padding={1}
        >
        {dummyArray.map((index)=>(
                <Box
                    display={"flex"}
                    flexDirection={"row"}
                    padding={0.9}
                    margin={"2%"}
                    bgcolor={"#e3e4e6"}
                    width={"auto"}
                    height={"13%"}
                    textAlign={"center"}
                    borderRadius={1}
                    key={index}
                    sx={{ "&:hover": { boxShadow: 10 } }}
                >
                    <Typography variant="p" textAlign={"center"} color={"black"} fontSize={13} width={"100%"} margin={"auto"}>
                        7:30 PM
                    </Typography>
                </Box>
            ))}    
        </Box>
        <Box margin={"2"} display={"flex"} fontSize={10} width={"100%"}>
            <Button 
                variant={"outlined"} 
                sx={{margin:"auto", marginTop:"15%", color:"white", bgcolor:"#7c4699", fontSize:"12px", 
                '&:hover': {backgroundColor: '#e3e4e6', borderColor: '#7c4699', color: '#7c4699'}}}                
            >
                 Get Tickets
            </Button>
        </Box>
                       
    </Box>
  )
}

export default ShowTimeItems
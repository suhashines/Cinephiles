import { Box, Button, Typography } from '@mui/material'
import React from 'react'
// import { getAllMovies } from '../../api-helpers/api-helpers';
import ShowTimeItems from './ShowTimeItem';
import ImageButton from '../ImageButton';

const MovieDetails = (props) => {
    const dummyArray = [0, 1, 2, 3];
  return (
    <Box margin={"auto"} width={"100%"} margintop={2}>
      <Box
        display={"flex"}
        
        width={"90%"}
        height={300}
        margin={"auto"}
        marginTop={2}
        bgcolor={"#e3e4e6"}
        border={"1px solid #c5c7c9"}
        padding={2}
        sx={{ "&:hover": { boxShadow: 10 } }}
      >
            <Box
                width={"700px"}
            >
                <ImageButton
                    // onClick={handleImageClick}
                    src={props.movie.POSTER_URL}
                    alt={props.movie.TITLE}
                />
            </Box>            
            {/* <img src={props.movie.POSTER_URL} alt={props.movie.TITLE} width={200} height={300} margin={"auto"}/> */}
            <Box
                width={"40%"}
                alignItems={"center"}
                padding={3}
                textAlign={"center"}
            >
                <Typography 
                    variant='h5'
                    align={"center"}
                    textOverflow={"ellipsis"}
                    width={"100%"}
                >
                    {props.movie.TITLE}
                </Typography>
                <br></br>
                <Typography 
                    variant='p'
                    textOverflow={"ellipsis"}
                    width={"70%"}
                >
                    {props.movie.SYNOPSIS}
                </Typography>
                <Box margin={"2"} marginTop={5} display={"flex"} fontSize={10} width={"100%"} alignItems={"flex-end"}>
                    <Button 
                        variant={"outlined"} 
                        sx={{margin:"auto", color:"#7c4699", bgcolor:"#e3e4e6", fontSize:"12px", borderColor:"#7c4699"}}                
                    >
                        Watch Trailer
                    </Button>
                </Box>                
            </Box>                    
        <Box 
            display={"flex"}
            flexDirection={"row"}
            width={"250%"}
            justifyContent={"left"}
        >
        {dummyArray.map((index)=>(
            <ShowTimeItems key={index} releaseDate={props.movie.RELEASE_DATE} title={props.movie.TITLE}/>
        ))} 
        </Box>
      </Box>
               
    </Box>
  )
}

export default MovieDetails
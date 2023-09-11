import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
// import { getAllMovies } from '../../api-helpers/api-helpers';
import ShowTimeItems from './ShowTimeItem';
import ImageButton from '../ImageButton';
import { getMovieShowdates } from '../../api-helpers/api-helpers';

const MovieDetails = (props) => {
    const [dates, setDates] = useState([]);

    useEffect(()=>{
        getMovieShowdates(props.movie.M_ID, props.t_id)
        .then((data)=>setDates(data.dates))
        .catch((err)=>console.log(err))
    },[])
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
                display={"flex"}
                flexDirection={"column"}
                width={"35vw"}
                height={"60vh"}
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
                    Duration: {props.movie.DURATION} mins
                    
                </Typography>
                <Typography>
                    <br></br>
                </Typography>
                <Typography 
                    variant='p'
                    textOverflow={"ellipsis"}
                    width={"70%"}
                >
                    Release Date: {new Date(props.movie.RELEASE_DATE).toDateString().split(" ")[0]}{", "} 
                    {new Date(props.movie.RELEASE_DATE).toDateString().split(" ")[1]}
                    {" "}{new Date(props.movie.RELEASE_DATE).toDateString().split(" ")[2]}                
                </Typography>
                {/* <Box margin={"2"} marginTop={5} display={"flex"} fontSize={10} width={"100%"} alignItems={"flex-end"}>
                    <Button 
                        variant={"outlined"} 
                        sx={{margin:"auto", color:"#7c4699", bgcolor:"#e3e4e6", fontSize:"12px", borderColor:"#7c4699",
                        '&:hover': {backgroundColor: '#900c3f', borderColor: '#900c3f', color:"#e3e4e6"}}}                
                    >
                        Watch Trailer
                    </Button>
                </Box>                 */}
            </Box>                    
        <Box 
            display={"flex"}
            flexDirection={"row"}
            width={"250%"}
            justifyContent={"left"}
        >
        {dates.map((date, index)=>(
            <ShowTimeItems key={index} releaseDate={date} title={props.movie.TITLE} id={props.movie.M_ID}/>
        ))} 
        </Box>
      </Box>
               
    </Box>
  )
}

export default MovieDetails
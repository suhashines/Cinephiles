import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieById, getReviews } from '../api-helpers/api-helpers';
import { Box, Button, Dialog, IconButton, Rating, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import Textarea from '@mui/joy/Textarea/Textarea';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const Bookings = () => {
    const [movie, setMovie] = useState([]);
    const id = useParams().id;
    console.log(id);

    const [value, setValue] = useState(movie[0]?.RATING);
    const [userValue, setUserValue] = useState(1);
    const [open, setOpen] = useState(false);
    const [reviewOpen, setReviewOpen] = useState(false);
    const [review, setReview] = useState("");
    const [reviews, setReviews] = useState([])

    const handleYesClick = () => {
        setOpen(false);
        setReviewOpen(true);
    }

    const handleNoClick = () => {
        setOpen(false);
        window.location.reload();
    }

    const handleClose = () => {
        setReviewOpen(false);
        window.location.reload();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(review);
        setReviewOpen(false);
        window.location.reload();
    }

    const handleChange = (e) => {
        setReview(e.target.value);
    }

    useEffect(()=>{
        getMovieById(id)
        .then((res) => setMovie(res.movie))
        .catch((err) => console.log(err));

        getReviews(id)
        .then((res) => setReviews(res))
        .catch((err) => console.log(err));
    },[id]);
    console.log(movie[0]);

    useEffect(()=>{
      setValue(movie[0]?.RATING)
    },[1])

    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (    
    <Box
        display={"flex"}
        flexDirection={"column"}
        justifycontents={"center"}
        alignItems={"center"}        
        width={"100vw"}
        height={"265vh"}
        margin={"auto"}
        // marginTop={4}
    >
      <Box
        // display={"flex"}
        // flexDirection={"column"}
        style={{position:"relative"}}
        justifyContent={"left"}
        alignItems={"left"}        
        width={"98%"}
        height={"66vh"}
        // margin={"auto"}
        marginTop={0}
        // padding={1}
        // borderRadius={10}
      >
        <img
          margin={"auto"}
          // marginTop={10}
          // marginLeft={4}
          style={{
            position:"absolute",
            left:"15%",
            top:"65%", 
            zIndex:2,
            border:"solid",
            borderColor:"white",
            borderWidth:2
        }} 
          src={movie[0]?.POSTER_URL} 
          alt={movie?.TITLE} 
          width={"22%"} 
          height={"85%"}
        >
        </img>
        <img
          justifyContent={"center"}
          margin={"auto"}
          // marginLeft={40}
          style={{
            position:"absolute",
            left:"10%", 
            zIndex:1
        }} 
          src={movie[0]?.BACK_POSTER_URL} 
          alt={movie?.TITLE} 
          width={"80%"} 
          height={"90%"}>
        </img>
        <Typography
          style={{            
            position:"absolute",
            left:"39%", 
            top:"95%", 
            zIndex:3,
            color:"#7c4699",
            fontWeight:"bold",
            fontSize:"35px",
            whiteSpace: "wrap", // Add this property to allow text wrapping
            maxWidth: "45%" // Set a maximum width to control wrapping behavior
            // transform:"translate(0%, 0%)"
          }}
          variant='h6'
        >
          {movie[0]?.TITLE}
        </Typography>
        <Box
          style={{
            position:"absolute",
            left:"39%", 
            top:"115%", 
            zIndex:3,
            // transform:"translate(0%, -50%)"
            // color:"white",
            
          }}
        >
          <Typography
          style={{
            // fontWeight:"bold",
            fontSize:"20px"
            
          }}            
          >
          <b>Release Date:</b> {new Date(movie[0]?.RELEASE_DATE).toDateString()}
          </Typography>
          <Typography
          style={{
            // fontWeight:"bold",
            fontSize:"20px",
            
          }}            
          >
          <b>Genre:</b> {new Array(movie[0]?.GENRE).toString()}
          </Typography>
          <Typography
            style={{
              // fontWeight:"bold",
              fontSize:"20px",            
            }}            
          >
          <b>Actors:</b> {new Array(movie[0]?.ACTOR).toString()}
          </Typography>
          <Typography
            style={{
              // fontWeight:"bold",
              fontSize:"20px",            
            }}            
          >
          <b>Director:</b> {movie[0]?.DIRECTOR}
          </Typography>
          <Typography
            style={{
              // fontWeight:"bold",
              fontSize:"20px",            
            }}            
          >
          <b>Duration:</b> {movie[0]?.DURATION} minutes
          </Typography>
          {localStorage.getItem("userId") && (
            <>
            <Button 
              variant={"outlined"} 
              sx={{
                position:"absolute",
                left:"0%",
                top:"110%",
                margin:"auto", 
                color:"white", 
                bgcolor:"#7c4699", 
                fontSize:"12px", 
                borderColor:"#7c4699",
                width:"100%",
                '&:hover': {
                  backgroundColor: '#900c3f', 
                  borderColor: '#900c3f', 
                  color:"#e3e4e6"}}}                
            >
                Book
            </Button>
          </>)}          
        </Box>
      </Box>
      {/* <Box>
        <Typography variant='h4'>
          {movie[0]?.TITLE}
        </Typography>
      </Box> */}
      <Box
        display={"flex"}
        flexDirection={"column"}
        position={"absolute"}
        top="120%"
        // justifycontent={"center"}
        // alignItems={"center"}        
        width={"70%"}
        height={"20vh"}
        // margin={"auto"}
        // marginTop={-105}
        padding={1}
        // borderRadius={10}
      >
        <Typography
          color={"#7c4699"}
          textAlign={"left"}
          fontWeight={"bold"} 
          variant='h5'
        >
          SYNOPSIS
        </Typography>
        <Typography 
          variant='h5'
          marginTop={2}
          fontWeight={"bold"}
          // textAlign={"center"}
        >
          {movie[0]?.SYNOPSIS}
        </Typography>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        position={"absolute"}
        top="110%"
        left="20%"
      >
        <Typography
          color={"#7c4699"}
          textAlign={"center"}
          fontWeight={"bold"} 
          variant='h5'
          marginRight={2}
        >
          Ratings
        </Typography>
        <Rating
          name="simple-controlled"
          value={value}
          size={"large"}
          onChange={(event, newValue) => {
            setUserValue(newValue);
            setOpen(true);
            setValue(movie[0]?.RATING)
          }}
        />
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        position={"absolute"}
        top="130%"
        // justifycontent={"center"}
        // alignItems={"center"}        
        width={"70%"}
        height={"20vh"}
        // margin={"auto"}
        // marginTop={-105}
        padding={1}
        // borderRadius={10}
      >
        <Typography
          color={"#7c4699"}
          // textAlign={"center"}
          fontWeight={"bold"} 
          variant='h5'
          marginTop={15}
        >
          REVIEWS
          <hr></hr>
        </Typography>

        {reviews.map((review, index) => (
          <Box
            display={"flex"}
            flexDirection={"column"}
            // position={"absolute"}
            // top="130%"
            // justifycontent={"center"}
            // alignItems={"center"}        
            // width={"70%"}
            height={"30vh"}
            // margin={"auto"}
            marginTop={0}
            // padding={1}
            // borderRadius={10}
          >
            <Box
              display={'flex'}
              flexDirection={'row'}
              marginRight={2}
            >
              <Typography
                color={"red"}
                // textAlign={"center"}
                fontWeight={"bold"} 
                variant='h6'
                marginTop={3}
              >
                {review.NAME}
              </Typography>

              {review.U_ID===localStorage.getItem("userId") && (
                <>
              <Button
                type="submit"
                variant="outlined"
                sx={{
                    marginLeft: 2,
                    marginTop: 2,
                    height: 40,
                    color: 'white',
                    bgcolor: 'green',
                    fontSize: '12px',
                    '&:hover': {
                        backgroundColor: '#e3e4e6',
                        borderColor: '#7c4699',
                        color: '#7c4699'
                    },
                }}
            >
                Edit
            </Button>
            <Button
                type="submit"
                variant="outlined"
                sx={{
                    marginLeft: 2,
                    marginTop: 2,
                    height: 40,
                    color: 'white',
                    bgcolor: 'red',
                    fontSize: '12px',
                    '&:hover': {
                        backgroundColor: '#e3e4e6',
                        borderColor: '#7c4699',
                        color: '#7c4699'
                    },
                }}
            >
                Delete
            </Button>
            </>
            )}

            </Box>
            <Typography
              // color={"#7c4699"}
              // textAlign={"center"}
              // fontWeight={"bold"} 
              variant='h5'
              marginTop={3}
            >
              {review.REVIEW}
            </Typography>
            
          </Box>
        ))}

      </Box>
      <Dialog PaperProps={{style:{borderRadius:40}}} open={open}>
        <Box 
          padding={10}          
        >
          <Box
            align={"center"}
            marginBottom={5}
          >
            <Rating
              name="simple-controlled"
              value={userValue}
              align={"center"}
              size={"large"}
            />
          </Box>        
          <Typography
            color={"#7c4699"}
            textAlign={"center"}
            fontWeight={"bold"} 
            variant='h4'
            
          >
            You Rated This Movie {userValue} Out of 5!
          </Typography>
          <Typography
            color={"#black"}
            textAlign={"center"}
            fontWeight={"bold"} 
            variant='h5'
            marginTop={5}
          >
            Would you like to give a review?
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            marginTop={7}
          >
            <Button
              onClick={handleYesClick}
              variant={"outlined"} 
              sx={{
                margin:"auto",
                color:"white", 
                bgcolor:"green", 
                fontSize:"12px", 
                borderColor:"#7c4699",
                width:"30%",
                '&:hover': {
                  backgroundColor: '#085410', 
                  borderColor: '#900c3f', 
                  color:"#e3e4e6"}}}
            >
              Yes
            </Button>
            <Button
              onClick={handleNoClick}
              variant={"outlined"} 
              sx={{
                margin:"auto",
                color:"white", 
                bgcolor:"red", 
                fontSize:"12px", 
                borderColor:"#7c4699",
                width:"30%",
                '&:hover': {
                  backgroundColor: '#900c3f', 
                  borderColor: '#900c3f', 
                  color:"#e3e4e6"}}}
            >
              No
            </Button>
          </Box>
        </Box>
       
      </Dialog>
      <Dialog PaperProps={{style:{borderRadius:20, width:'70vw'}}} open={reviewOpen}>
        <Box sx={{ml:"auto", padding:1}}>
              <IconButton onClick={handleClose}>
                  <CloseRoundedIcon/>
              </IconButton>
        </Box>
        <Box
          padding={5}          
        >
          <Typography
            color={"#7c4699"}
            textAlign={"center"}
            fontWeight={"bold"} 
            variant='h4'
          >
            Share Your Thougths!
          </Typography>
          <form onSubmit={handleSubmit}>
            <Textarea
              id="synopsis"
              name="synopsis"
              minRows={8} // Minimum number of rows
              maxRows={10} // Maximum number of rows
              value={review}
              onChange={handleChange}
              required
              sx={{
                  marginTop: '20px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '20px',
                  fontFamily: 'Arial, sans-serif',
                  color: 'black',
                  resize: 'vertical',
              }}>
            </Textarea>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              marginTop={4}
            >
              <Button
                onClick={handleNoClick}
                type='submit'
                variant={"outlined"} 
                sx={{
                  margin:"auto",
                  color:"white", 
                  bgcolor:"#7c4699", 
                  fontSize:"12px", 
                  borderColor:"#7c4699",
                  width:"30%",
                  '&:hover': {
                    backgroundColor: '#900c3f', 
                    borderColor: '#900c3f', 
                    color:"#e3e4e6"}}}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Dialog>
    </Box>
    
  )
}

export default Bookings
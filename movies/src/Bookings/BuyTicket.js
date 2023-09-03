import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import BasicMenu from './BasicMenu'
import RowRadioButtonsGroup from './SeatCategory';
import SeatBooking from './SeatBooking';
import TicketSummary from './TicketSummary';
import { useParams } from 'react-router-dom';
import { getAllCities, getCitiesAndTheatres, getCitiesByMovieId, getMovieById, getMovieShowdates, getMovieShowtimes, getTheatresByCity } from '../api-helpers/api-helpers';
// import { getTheatreByCity } from '../../../backend/controller/theatreController';

const BuyTicket = () => {
    const [movie, setMovie] = useState([]);

    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('City');
    
    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState('Location');
    const [theatre, setTheatre] = useState(0);
    const [showDate, setShowDate] = useState([]);
    const [selectedDate, setSelectedDate] = useState();
    const [date, setDate] = useState('--');
    const [showTime, setShowTime] = useState([]);
    const [time, setTime] = useState('--');
    const [selectedTime, setSelectedTime] = useState();
    const id = useParams().id;
    console.log(id);

    useEffect(()=>{
        getMovieById(id)
        .then((res) => setMovie(res.movie))
        .catch((err) => console.log(err));

        getCitiesByMovieId(id)
        .then((res) => setCities(res.cities))
        .catch((err) => console.log(err));
    },[id]);

    useEffect(()=>{
        getTheatresByCity(id,city)
        .then((res) => setLocations(res.theatres))
        .catch((err) => console.log(err));
    },[id,city]);

    useEffect(()=>{
        getMovieShowdates(id,theatre)
        .then((res) => setShowDate(res.dates))
        .catch((err) => console.log(err));
    },[id,theatre]);
    console.log(showDate);
    console.log(theatre);

    useEffect(()=>{
        getMovieShowtimes(theatre,id,selectedDate)
        .then((res) => setShowTime(res.showtimes))
        .catch((err) => console.log(err));
    },[id,theatre,selectedDate]);

  const dummyArray = [0, 1, 2, 3];
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isShowTimeSelected, setIsShowTimeSelected] = useState(false);
  const [isSeatSelected, setIsSeatSelected] = useState(false);
  return (
    <Box
        display={"flex"}
        flexDirection={"row"}
        // justifyContent={"center"}
        // alignItems={"center"}        
        width={"70vw"}
        height={"200vh"}
        margin={"auto"}
        marginTop={4}
        // bgcolor={"#edeef0"}
    >
        <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"left"}
            alignItems={"left"}        
            width={"70%"}
            height={"100%"}
            margin={"auto"}
            marginRight={1}
            // padding={1}
            // borderRadius={10}
            // bgcolor={"#e8ebed"}
        >
          <Box>
            <BasicMenu 
              variant={1} 
              option = {cities} 
              selection = {city} 
              setSelection = {setCity}
            />
            <BasicMenu 
              variant={2} 
              option = {locations} 
              selection = {location} 
              setSelection = {setLocation} 
              setTheatre={setTheatre}
            />
            {/* <Typography 
              variant='h6'
              color='#7c4699'
              fontFamily={'Sans-serif'}
              margin={'auto'}
              marginLeft={1}
              >
              Shimanta Shambhar, Dhanmondi 2
            </Typography> */}
            <hr></hr>
          </Box>
          
          <Box>
            <Box marginTop={2}>
              <Typography 
                variant='h6'
                // color='#7c4699'
                fontFamily={'Sans-serif'}
                margin={'auto'}
                marginLeft={1}
                marginTop={4}
                fontWeight={'bold'}
                >
                Select Date
              </Typography>
            </Box>

            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"left"}
              alignItems={"left"}        
              width={"100%"}
              height={"50%"}
              margin={"auto"}
              marginTop={1}
              // marginRight={1}
              // marginLeft={0.5}
              borderRadius={2}
              // padding={2}
              // borderRadius={10}
              // bgcolor={"#edeef0"}
            >
              {showDate.map((index) => (
                <Button
                  key={index}
                  onClick={() => {setIsDateSelected(!isDateSelected)
                                  setIsShowTimeSelected(false)
                                  setIsSeatSelected(false)
                                  setSelectedDate(index.EXTRACTED_DATE)
                                  console.log(index.EXTRACTED_DATE)
                                  setDate(`${new Date(index.EXTRACTED_DATE).toDateString().split(" ")[2]}, ` +
                                        `${new Date(index.EXTRACTED_DATE).toDateString().split(" ")[1]}, ` +
                                        `${new Date(index.EXTRACTED_DATE).toDateString().split(" ")[3]}`)
                          }}
                  disableRipple={true}
                  style={{
                    textAlign:'left',
                    width:'21%', 
                    fontFamily:'Sans-serif', 
                    fontWeight:'bold',  
                    color:'black',
                    "&:hover":'none',
                  }}
                >
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    padding={1.5}
                    margin={"auto"}
                    // marginRight={1}
                    // marginLeft={0}
                    bgcolor={"#edeef0"}
                    aligncontent={"left"}
                    width={"100%"}
                    height={"80%"}
                    // textAlign={"center"}
                    borderRadius={2}
                    key={index}
                    sx={{ "&:hover": { boxShadow: 10 } }}
                >
                  <Box 
                    height={'30%'}
                    width={'100%'}  
                    padding={0.5} 
                    justifyContent={"left"}
                    alignContent={'left'}
                    // margin={'auto'}
                    // marginLeft={0}
                  >
                    <Typography 
                      fontFamily={'Sans-serif'}
                      color={"black"}
                      justifyContent={"left"}
                      alignItems={"left"}  
                    >
                      {new Date(index.EXTRACTED_DATE).toDateString().split(" ")[0]}
                    </Typography>
                  </Box>

                  <Box 
                    height={'70%'} 
                    display={"flex"}
                    // padding={1}
                    flexDirection={"row"}>
                    <Box width={'30%'} padding={0.5}>
                      <Typography variant='h5' fontFamily={'Sans-serif'}>
                        {new Date(index.EXTRACTED_DATE).toDateString().split(" ")[2]}
                      </Typography>
                    </Box>

                    <Box width={'70%'} padding={1}>
                      <Typography fontFamily={'Sans-serif'}>
                        {new Date(index.EXTRACTED_DATE).toDateString().split(" ")[1]}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                </Button>                
              ))}
            </Box>
          </Box>

          {isDateSelected && (
            <>
            <Box 
              marginTop={2}
              display={"flex"}
              flexDirection={"column"}
              width={"100%"}
              alignContent={"left"}
              // borderRadius={4}
              // bgcolor={"white"}
            >
            <Box>
              <Typography 
                variant='h6'
                // color='#7c4699'
                fontFamily={'Sans-serif'}
                margin={'auto'}
                marginLeft={1}
                marginTop={4}
                fontWeight={'bold'}
                >
                Select ShowTime
              </Typography>
            </Box>

            <Box
              height={'100%'}
              width={"95%"}
              justifyContent={"center"}
              alignContent={"center"}
              marginLeft={1}
            >
              {dummyArray.map((item) => (
                <Box
                  key={item}
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"center"}
                  // alignItems={"left"}        
                  // width={"95%"}
                  height={"8vh"}
                  // margin={"auto"}
                  marginTop={2}
                  // marginRight={1}
                  // marginLeft={0.5}
                  borderRadius={2}
                  // padding={1}
                  // borderRadius={10}
                  bgcolor={"#edeef0"}
                  sx={{ "&:hover": { boxShadow: 10 } }}
                >
                  <Box 
                    width={'20%'} 
                    justifyContent={"center"}
                    margin={'auto'}
                    marginLeft={1.5}
                  >
                    <Typography 
                      variant='h6' 
                      fontFamily={'sans-serif'} 
                      fontWeight={'bold'}
                    >
                      Hall 1
                    </Typography>
                  </Box>

                  <Box 
                    width={'80%'}
                    height={'60%'}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"right"}
                    margin={'auto'}
                    marginRight={1}
                    // padding={1}
                  >
                    {showTime.map((index) => (
                      <Box
                        key={index}
                        // display={"flex"}
                        // flexDirection={"row"}
                        // padding={1}
                        // margin={"auto"}
                        marginRight={1}
                        alignContents={'right'}
                        bgcolor={"white"}
                        width={"18%"}
                        height={"90%"}
                        // textAlign={"center"}
                        borderRadius={2}
                        sx={{ "&:hover": { boxShadow: 10 } }}
                    >
                      <Button
                        // disableRipple={true}
                        onClick={() => {setIsShowTimeSelected(!isShowTimeSelected);
                                        setIsSeatSelected(false)}}
                        style={{
                          margin:'auto',
                          textAlign:'left',
                          width:'100%',
                          height:'100%', 
                          fontFamily:'Sans-serif', 
                          fontWeight:'bold',  
                          color:'black',
                          "&:hover":'none'
                        }}
                      >
                        <Box 
                          // height={'60%'} 
                          width={'100%'}  
                          padding={0.5} 
                          // margin={'auto'}
                          marginLeft={1}
                          // alignContent={'center'}
                          justifyContent={'center'}
                        >
                          <Typography fontFamily={'Sans-serif'}>
                            {index.EXTRACTED_TIME}
                          </Typography>
                        </Box>
                      </Button>
                      </Box>
                    ))}
                  </Box>
                  
                </Box>

                ))}
            </Box>
                          
            </Box>
            </>
          )}

          {isShowTimeSelected && (
            <>
              <Box
                marginTop={5}
              >
                <RowRadioButtonsGroup
                  isSeatSelected={isSeatSelected}
                  setIsSeatSelected={setIsSeatSelected}
                />
              </Box>
            </>
          )}
          
          {
            isSeatSelected && (
              <>
                <Box
                  marginTop={4}
                >
                  <Box>
                    <Typography 
                      variant='h6'
                      // color='#7c4699'
                      fontFamily={'Sans-serif'}
                      margin={'auto'}
                      marginLeft={1}
                      marginTop={4}
                      fontWeight={'bold'}
                      >
                      Select Seats
                    </Typography>
                  </Box>
                </Box>
                <Box
                  width={"95%"}
                  height={"40%"}
                  margin={"auto"}
                  // marginTop={2}
                  // marginLeft={1}
                  bgcolor={"#edeef0"}
                  borderRadius={2}
                >
                  <SeatBooking/>
                </Box>
              </>
            )
          }
          
        </Box>

        <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"right"}
            alignItems={"right"}        
            width={"30%"}
            height={"100%"}
            margin={"auto"}
            marginLeft={1}
            // padding={1}
            // borderRadius={10}
            // bgcolor={"#e8ebed"}
        >
          <Box>
            <Typography 
              variant='h6'
              // color='#7c4699'
              fontFamily={'Sans-serif'}
              margin={'auto'}
              marginLeft={1}
              marginTop={1}
              fontWeight={'bold'}
              >
              Ticket Summary
            </Typography>
          </Box>            
          <Box
            marginTop={2}
          >
            <TicketSummary movie={movie[0]} date={date}/>
          </Box>
          
        </Box>

    </Box>
  )
}

export default BuyTicket
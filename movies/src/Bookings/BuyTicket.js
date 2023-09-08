import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import BasicMenu from './BasicMenu'
import RowRadioButtonsGroup from './SeatCategory';
import SeatBooking from './SeatBooking';
import TicketSummary from './TicketSummary';
import { useParams } from 'react-router-dom';
import { getCitiesByMovieId, getGalleriesAndShowTimes, getMovieById, getMovieShowdates, getMovieShowtimes, getSeatPrice, getSeats, getTheatresByCity, getTotalCost } from '../api-helpers/api-helpers';
// import { getGalleries } from '../../../backend/controller/bookingController';
// import { getTheatreByCity } from '../../../backend/controller/theatreController';

const BuyTicket = (props) => {
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

    const [galleries, setGalleries] = useState([]);
    const [gallery, setGallery] = useState(0);
    const [selectedGallery, setSelectedGallery] = useState('--');

    const [category, setCategory] = useState('--');
    const [show, setShow] = useState(0);

    const [seats, setSeats] = useState();
    const [selectedSeats, setSelectedSeats] = useState('--');

    const [regular, setRegular] = useState(0);
    const [premium, setPremium] = useState(0);

    const [quantity, setQuantity] = useState('--');
    const [count, setCount] = useState(0);
    const [cost, setCost] = useState('--');
    const [total, setTotal] = useState(0);

    const [greenButtonNames, setGreenButtonNames] = useState([]); 

    const id = useParams().id;
    console.log(id);

    useEffect(()=>{
      setSelectedSeats(greenButtonNames.join(', '));
      console.log(selectedSeats);
    },[greenButtonNames]);

    useEffect(()=>{
      getTotalCost(greenButtonNames.map((value) => String(value)), gallery)
      .then((res) => setTotal(res.total))
      .catch((err) => console.log(err));
    },[greenButtonNames, gallery]);

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
        getSeatPrice(gallery)
        .then((res) => {
          setRegular(res.regular);
          setPremium(res.premium);
        })
        .catch((err) => console.log(err));
    },[gallery])

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

    useEffect(()=>{
        getGalleriesAndShowTimes(theatre, id, selectedDate)
        .then((res) => setGalleries(res.galleries))
        .catch((err) => console.log(err));
    },[id,theatre,selectedDate]);

    useEffect(()=>{
        getSeats(gallery, show, category)
        .then((res) => setSeats(res))
        .catch((err) => console.log(err));
    },[gallery,show,category]);

  const dummyArray = [0, 1, 2, 3];
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isShowTimeSelected, setIsShowTimeSelected] = useState(false);
  const [isSeatSelected, setIsSeatSelected] = useState(false);
  return (
    <Box
        display={"flex"}
        flexDirection={"row"}
        // justifyContent={"center"}
        // alignItems={"center"}        
        width={"80vw"}
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
              setIsLocationSelected={setIsLocationSelected}
            />
            <hr></hr>
          </Box>
          
          {isLocationSelected && (
            <>
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
              {showDate && showDate.map((index,item) => (
                <Button
                  key={item}
                  onClick={() => {setIsDateSelected(true)
                                  setIsShowTimeSelected(false)
                                  setIsSeatSelected(false)
                                  setSelectedDate(index.EXTRACTED_DATE)
                                  
                                  setDate(`${new Date(index.EXTRACTED_DATE).toDateString().split(" ")[2]}, ` +
                                        `${new Date(index.EXTRACTED_DATE).toDateString().split(" ")[1]}, ` +
                                        `${new Date(index.EXTRACTED_DATE).toDateString().split(" ")[3]}`)
                          }}
                  disableRipple={true}
                  style={{
                    textAlign:'left',
                    width:'18%', 
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
                    aligncontents={"left"}
                    width={"100%"}
                    height={"80%"}
                    // textAlign={"center"}
                    borderRadius={2}
                    // key={index}
                    sx={{ "&:hover": { boxShadow: 10 } }}
                >
                  <Box 
                    height={'30%'}
                    width={'100%'}  
                    padding={0.5} 
                    justifyContent={"left"}
                    aligncontents={'left'}
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
          </>
          )}

          {isDateSelected && (
            <>
            <Box 
              marginTop={2}
              display={"flex"}
              flexDirection={"column"}
              width={"100%"}
              aligncontents={"left"}
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
              aligncontents={"center"}
              marginLeft={1}
            >
              {galleries.map((item,index) => (
                <Box
                  key={index}
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
                      Hall {item.NAME}
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
                    {item.TIMES.map((index,hash) => (
                      <Box
                        key={hash}
                        // display={"flex"}
                        // flexDirection={"row"}
                        // padding={1}
                        // margin={"auto"}
                        marginRight={1}
                        aligncontents={'right'}
                        bgcolor={"white"}
                        width={"18%"}
                        height={"90%"}
                        // textAlign={"center"}
                        borderRadius={2}
                        sx={{ "&:hover": { boxShadow: 10 } }}
                    >
                      <Button
                        // disableRipple={true}
                        onClick={() => {setIsShowTimeSelected(true);
                                        setIsSeatSelected(false)
                                        setTime(index.SHOWTIMES)
                                        setShow(item.SHOW_ID)
                                        setSelectedTime(index.SHOWTIMES)
                                        setGallery(item.G_ID)
                                        setSelectedGallery(item.NAME)                                        
                                }}
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
                          // marginLeft={1}
                          // aligncontents={'center'}
                          justifyContent={'center'}
                        >
                          <Typography 
                            fontFamily={'Sans-serif'}
                            textAlign={'center'}  
                          >
                            {index.SHOWTIMES}
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
                  setCategory = {setCategory}
                  regular = {regular}
                  premium = {premium}
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
                  // margin={"auto"}
                  marginTop={2}
                  // marginTop={2}
                  marginLeft={1}
                  bgcolor={"#edeef0"}
                  borderRadius={2}
                >
                  <SeatBooking 
                    seats={seats} 
                    category={category=='premium'? 'Premium' : 'Regular'}
                    greenButtonNames={greenButtonNames}
                    setGreenButtonNames={setGreenButtonNames}
                    setSelectedSeats={setSelectedSeats}
                    count = {count}
                    setCount={setCount}
                  />
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
              // marginTop={1}
              fontWeight={'bold'}
              >
              Ticket Summary
            </Typography>
          </Box>            
          <Box
            marginTop={2}
          >
            <TicketSummary 
              movie={movie[0]} 
              date={date} 
              time={time} 
              category={category}
              selectedGallery={selectedGallery}
              selectedSeats={selectedSeats}
              quantity={quantity}
              cost={cost}
              greenButtonNames={greenButtonNames}
              count = {count}
              total={total}
              gallery={gallery}
              show={show}
              booking={props.booking}
              setBooking={props.setBooking}
            />
          </Box>
          
        </Box>

    </Box>
  )
}

export default BuyTicket
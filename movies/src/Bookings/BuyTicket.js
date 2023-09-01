import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import BasicMenu from './BasicMenu'
import RowRadioButtonsGroup from './SeatCategory';
import SeatBooking from './SeatBooking';
import TicketSummary from './TicketSummary';

const BuyTicket = () => {
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
            <BasicMenu/>
            <BasicMenu/>
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
              {dummyArray.map((index) => (
                <Button
                  onClick={() => {setIsDateSelected(!isDateSelected)
                                  setIsShowTimeSelected(false)
                                  setIsSeatSelected(false)}}
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
                    alignContent={"left"}
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
                      Thu
                    </Typography>
                  </Box>

                  <Box 
                    height={'70%'} 
                    display={"flex"}
                    // padding={1}
                    flexDirection={"row"}>
                    <Box width={'30%'} padding={0.5}>
                      <Typography variant='h5' fontFamily={'Sans-serif'}>
                        31
                      </Typography>
                    </Box>

                    <Box width={'70%'} padding={1}>
                      <Typography fontFamily={'Sans-serif'}>
                        Aug
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
                    {dummyArray.map((index) => (
                      <Box
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
                        key={index}
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
                            7:30 PM
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
            <TicketSummary/>
          </Box>
          
        </Box>

    </Box>
  )
}

export default BuyTicket
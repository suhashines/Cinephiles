import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ChairIcon from '@mui/icons-material/Chair';
import TimesOneMobiledataIcon from '@mui/icons-material/TimesOneMobiledata';
import WeekendIcon from '@mui/icons-material/Weekend';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const TicketSummary = () => {
    const [value, setValue] = useState(0);
  return (
    <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        // alignItems={"right"}        
        width={"100%"}
        height={"80vh"}
        margin={"auto"}
        // marginTop={4}
        bgcolor={"#edeef0"}
        borderRadius={2}
    >
        <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}        
            width={"100%"}
            height={"22%"}
            margin={"auto"}
            // padding={1}
            // borderRadius={10}
        >
            <Box
                display={"flex"}
                flexDirection={"row"}
                width={"40%"}
                height={"100%"}
                justifyContent={"left"}
                // borderRadius={10}
            >
                <img 
                    src={'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2022/07/barbie-2748009.jpg?tf=384x'} 
                    alt={'Logo'} 
                    height={'100%'} 
                    width={'80%'}
                    // style={{ float: 'left', marginRight: '10px' }} // Add this style
                    // borderRadius={10}
                ></img>
            </Box>

            <Box
                // display={"flex"}
                // flexDirection={"column"}
                width={"40%"}
                // height={"100%"}
                marginTop={1}
                justifyContent={"left"}
                // flexWrap={"wrap"}
                whiteSpace="normal" // Set whiteSpace to "normal"
                overflow="hidden" // Set overflow to "hidden"
            >
                <Typography
                    // height={"100%"}
                    variant={'h6'}
                    fontSize={'20px'}
                    color={'#7c4699'}
                    fontFamily={'Sans-serif'}
                    margin={'auto'}
                    // width={'50%'}
                    // marginLeft={1}
                    // marginTop={4}
                    fontWeight={'bold'}
                >
                    Barbie
                </Typography>
                
                <Typography>
                    Duration - 1h 48m
                </Typography>
                
            </Box>
        </Box>

        <Box
            // justifyContent={"center"}
            // alignContent={"center"}
            height={"40%"}
            width={"90%"}
            margin={"auto"}
        >
            <Box display={"flex"} flexDirection={"row"} width={'100%'} height={'20%'}>
                <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"left"}
                    width={'100%'}
                    height={'60%'}
                >
                    <CalendarMonthIcon style={{color:'#7c4699'}}/>
                    <span style={{ paddingLeft: '8px'}}>Show Date</span>
                </Box>
                    <Box
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"right"}
                        width={"100%"}
                    >
                        <Typography textAlign={"right"} marginRight={1}>31 Aug, 2023</Typography>
                    </Box>                
                </Box>
            <Box display={"flex"} flexDirection={"row"} width={'100%'} height={'20%'}>
                <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"left"}
                    width={'100%'}
                    height={'60%'}
                >
                    <FormatListNumberedIcon style={{color:'#7c4699'}}/>
                    <span style={{ paddingLeft: '8px' }}>Hall Name</span>
                </Box>
                    <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"right"}
                    width={"100%"}
                >
                    <Typography textAlign={"right"} marginRight={1}>Hall 1</Typography>
                </Box>
            </Box>
            <Box display={"flex"} flexDirection={"row"} width={'100%'} height={'20%'}>
            <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"left"}
                    width={'100%'}
                    height={'60%'}
                >
                    <WatchLaterIcon style={{color:'#7c4699'}}/>
                    <span style={{ paddingLeft: '8px' }}>Show Time</span>
                    </Box>
                    <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"right"}
                    width={"100%"}
                >
                    <Typography textAlign={"right"} marginRight={1}>7:30 pm</Typography>
                </Box>
            </Box>
            <Box display={"flex"} flexDirection={"row"} width={'100%'} height={'20%'}>
            <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"left"}
                    width={'100%'}
                    height={'60%'}
                >
                    <ChairIcon style={{color:'#7c4699'}}/>
                    <span style={{ paddingLeft: '8px' }}>Seat Type</span>
                    </Box>
                    <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"right"}
                    width={"100%"}
                >
                    <Typography textAlign={"right"} marginRight={1}>Premium</Typography>
                </Box>
            </Box>
            <Box display={"flex"} flexDirection={"row"} width={'100%'} height={'20%'}>
                {/* <Button onClick={()=>setValue(4)}  style={{color:'black', width: '100%', height: '100%', justifyContent: 'left'}}> */}
                <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"left"}
                    width={'100%'}
                    height={'60%'}
                >
                    <TimesOneMobiledataIcon style={{color:'#7c4699'}}/>
                    <span style={{ paddingLeft: '8px' }}>Ticket Quantity</span>
                </Box>
                {/* </Button> */}
                <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"right"}
                    width={"100%"}
                >
                    <Typography textAlign={"right"} marginRight={1}>2</Typography>
                </Box>
            </Box>
            <Box display={"flex"} flexDirection={"row"} width={'100%'} height={'20%'}>
            <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"left"}
                    width={'100%'}
                    height={'60%'}
                >
                    <WeekendIcon style={{color:'#7c4699'}}/>
                    <span style={{ paddingLeft: '8px' }}>Selected Seat</span>
                    </Box>
                    <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"right"}
                    width={"100%"}
                >
                    <Typography textAlign={"right"} marginRight={1}>F5,F6</Typography>
                </Box>
            </Box>
            <Box display={"flex"} flexDirection={"row"} width={'100%'} height={'20%'}>
            <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"left"}
                    width={'100%'}
                    height={'60%'}
                >
                    <MonetizationOnIcon style={{color:'#7c4699'}}/>
                    <span style={{ paddingLeft: '8px' }}>Total Amount</span>
                    </Box>
                    <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"right"}
                    width={"100%"}
                >
                    <Typography textAlign={"right"} marginRight={1}>900 TK BDT</Typography>
                </Box>
            </Box>
        </Box>

        <Box
            width={"90%"}
            margin={"auto"}
            marginTop={12}
            justifyContent={"center"}
        >
            <Button
                variant="outlined"
                color="primary"
                sx={{margin:"auto", color:"#7c4699", bgcolor:"#edeef0", fontSize:"12px", borderColor:"#7c4699", padding: 2, width: '100%',
                '&:hover': {backgroundColor: '#7c4699', borderColor: '#900c3f', color:"#e3e4e6"}}}
                // className={classes.button}
                // startIcon={<EditIcon />}
            >
                <Typography
                    variant={'p'}
                    fontSize={'15px'}
                    // color={'black'}
                    fontFamily={'Sans-serif'}
                    margin={'auto'}
                    // width={'50%'}
                    fontWeight={'bold'}
                >
                    Purchase Ticket
                </Typography>                
            </Button> 
        </Box>
    </Box>
  )
}

export default TicketSummary
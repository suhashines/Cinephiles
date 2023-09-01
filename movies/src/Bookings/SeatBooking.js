import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const SeatBooking = () => {
    const seatArray = [['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11'],
                      ['B1', 'B2', 'B3', 'B4', 'B5'],
                      ['C1', 'C2', 'C3', 'C4', 'C5'],
                      ['D1', 'D2', 'D3', 'D4', 'D5'],
                      ['E1', 'E2', 'E3', 'E4', 'E5']];
  return (
    <Box
        display={"flex"}
        flexDirection={"row"}
        flexWrap={"wrap"}
        height={"80%"}
        width={"90%"}
        margin={"auto"}
        marginTop={8}
        // justifyContent={"center"}
        // padding={1}
        // bgcolor={'white'}
    >
        {
            seatArray.map((row) => (
                <Box
                    display={"flex"}
                    flexDirection={"row"}
                    flexWrap={"wrap"}
                    height={"20%"}
                    width={"100%"}
                    // margin={"auto"}
                    // marginLeft={1}
                    // justifyContent={"center"}
                    // padding={1}
                    // bgcolor={'white'}
                >{                                                
                row.map((index) => (
                    <Box
                        width={`${90 / row.length}%`}
                        // width={'20%'}
                        margin={"auto"}
                        // marginRight={1}
                        // marginLeft={1}
                        padding={0.2}
                        // justifyContent={"center"}
                    >
                        <Button
                            variant="outlined"
                            style={{ 
                                backgroundColor: 'white',
                                borderColor: 'black',
                                color:"black",
                                // fontSize:"15px",
                                fontFamily: 'Sans-serif',
                                // fontWeight: 'bold',
                                // borderRadius: '5px',
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                transition: 'none',
                            }}
                        >
                            <Typography
                                variant={'p'}
                                fontSize={'10px'}
                                color={'black'}
                                fontFamily={'Sans-serif'}
                                margin={'auto'}
                                // width={'50%'}
                                // marginLeft={1}
                                // marginTop={4}
                                fontWeight={'bold'}
                            >
                                {index}
                            </Typography>                                
                        </Button>
                    </Box>
                ))
                        }</Box>
            ))
        }
    </Box>
  )          
}

export default SeatBooking
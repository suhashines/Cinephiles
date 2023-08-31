import React from 'react'
import MultiLevelDropdownMenu from './NestedMenu'
import { Box } from '@mui/material'

const BuyTicket = () => {
  return (
    <Box
        display={"flex"}
        flexDirection={"row"}
        // justifyContent={"center"}
        // alignItems={"center"}        
        width={"65vw"}
        height={"200vh"}
        margin={"auto"}
        marginTop={4}
        bgcolor={"#edeef0"}
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
            bgcolor={"#e8ebed"}
        >

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
            bgcolor={"#e8ebed"}
        >

        </Box>

    </Box>
    // <MultiLevelDropdownMenu/>
  )
}

export default BuyTicket
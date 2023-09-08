import { Box, Typography } from '@mui/material'
import React from 'react'

const BasicInfo = ({user}) => {
  return (
    <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"left"}
        alignItems={"left"}        
        width={"100%"}
        height={"90%"}
        margin={"auto"}
        // marginTop={1}
        padding={1}
        borderRadius={2}
    >
        <Box
            // padding={2}
            // width={"100%"}
            height={'15%'}
        >
            <Typography variant='h5'>
                Basic Information
            </Typography>
            <hr></hr>
        </Box>
        <Box
            padding={1}
            height={'15%'}
        >
            <Typography fontWeight={'bold'}>
                Name
            </Typography>
            <Typography>
                {user?.NAME}
            </Typography>
        </Box>
        <Box
            padding={1}
            height={'15%'}
        >
            <Typography fontWeight={'bold'}>
                Email
            </Typography>
            <Typography>
                {user?.EMAIL}
            </Typography>
        </Box>
        <Box
            padding={1}
            height={'15%'}
        >
            <Typography fontWeight={'bold'}>
                Mobile
            </Typography>
            <Typography>
                {user?.MOBILE}
            </Typography>
        </Box>
        <Box
            padding={1}
            height={'20%'}
        >
            <Typography fontWeight={'bold'}>
                Gender
            </Typography>
            <Typography>
                {user?.GENDER}
            </Typography>
        </Box>
        <Box
            padding={1}
            height={'20%'}
        >
            <Typography fontWeight={'bold'}>
                Member Since
            </Typography>
            <Typography>
                {user?.MEMBER_SINCE}
            </Typography>
        </Box>
    </Box>
    
  )
}

export default BasicInfo
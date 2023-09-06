import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box, Typography } from '@mui/material';

export default function RowRadioButtonsGroup({isSeatSelected, setIsSeatSelected, setCategory, premium, regular}) {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">
        <Typography 
            variant='h6'
            color='black'
            fontFamily={'Sans-serif'}
            margin={'auto'}
            marginLeft={1}
            marginTop={4}
            fontWeight={'bold'}
            >
            Select Category
        </Typography>
      </FormLabel>
      <Box               
        padding={2}
        margin={"auto"}
        marginLeft={1}
        marginTop={2}
        // marginRight={1}
        // marginLeft={0}
        bgcolor={"#edeef0"}
        aligncontents={"left"}
        width={"100%"}
        height={"80%"}
        // textAlign={"center"}
        borderRadius={2}
        sx={{ "&:hover": { boxShadow: 10 } }}
      >
        <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={(event) => {setIsSeatSelected(true);
                            setCategory(event.target.value)
                            }}
        >
            <FormControlLabel 
                value="regular" 
                control={<Radio />} 
                label={
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"left"}
                        alignItems={"left"}        
                        // width={"100%"}
                        height={"100%"}
                        margin={"auto"}
                        marginRight={4}
                        // padding={1}
                        // borderRadius={10}
                    >
                        <Typography 
                        variant='p'
                        color='black'
                        fontFamily={'Sans-serif'}
                        margin={'auto'}
                        marginLeft={1}
                        // marginTop={4}
                        fontWeight={'bold'}
                        >
                        Regular
                    </Typography>
                    <Typography 
                        variant='p'
                        color='black'
                        fontFamily={'Sans-serif'}
                        margin={'auto'}
                        marginLeft={1}
                        // marginTop={4}
                        // fontWeight={'bold'}
                        >
                        BDT {regular} TK
                    </Typography>
                    </Box>                
                } 
            />
            <FormControlLabel 
                value="premium" 
                control={<Radio />} 
                label={
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"left"}
                        alignItems={"left"}        
                        // width={"100%"}
                        height={"100%"}
                        margin={"auto"}
                        marginRight={4}
                        // padding={1}
                        // borderRadius={10}
                    >
                        <Typography 
                            variant='p'
                            color='black'
                            fontFamily={'Sans-serif'}
                            margin={'auto'}
                            marginLeft={1}
                            // marginTop={4}
                            fontWeight={'bold'}
                        >
                        Premium
                    </Typography>
                    <Typography 
                        variant='p'
                        color='black'
                        fontFamily={'Sans-serif'}
                        margin={'auto'}
                        marginLeft={1}
                        // marginTop={4}
                        // fontWeight={'bold'}
                        >
                        BDT {premium} TK
                    </Typography>
                    </Box>                
                } 
            />
            {/* <FormControlLabel value="other" control={<Radio />} label="Other" />
            <FormControlLabel
            value="disabled"
            disabled
            control={<Radio />}
            label="other"
            /> */}
        </RadioGroup>
      </Box>
    </FormControl>
  );
}
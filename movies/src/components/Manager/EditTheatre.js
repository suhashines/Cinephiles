import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { editTheatreDetails, getTheatreDetails } from '../../api-helpers/api-helpers';
import { Box, Button, Dialog, FormLabel, IconButton, TextField, Typography } from '@mui/material';

const EditTheatre = ({setTabValue}) => {

    const id = useParams().id;
    const [theatre, setTheatre] = useState();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    useEffect(()=>{
        setTabValue(2)
    },[])

    useEffect(()=>{
        getTheatreDetails(id)
        .then((data) => setTheatre(data.theatre))
        .catch((err) => console.log(err));
    },[id])

/****************************************************************/

    const [theatreFormData, setTheatreFormData] = useState({
        name: theatre?.NAME,
        building: theatre?.BUILDING,
        road: theatre?.ROAD,
        city: theatre?.CITY,
        t_id: id
    });

    useEffect(() => {
        setTheatreFormData({
            name: theatre?.NAME,
            building: theatre?.BUILDING,
            road: theatre?.ROAD,
            city: theatre?.CITY,
            t_id: id
        });
    }, [theatre]);

    const handleTheatreInputChange = (e) => {
        const { name, value } = e.target;
        setTheatreFormData({
            ...theatreFormData,
            [name]: value,
        });
        console.log(theatreFormData)
        // console.log(value);
    };

    const handleTheatreSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here, e.g., send data to an API
        editTheatreDetails(theatreFormData)
        .catch((err) => console.log(err));

        console.log(theatreFormData);

        // Reset the form after submission
        // setTheatreFormData({
        //     name: theatre?.NAME,
        //     building: theatre?.BUILDING,
        //     road: theatre?.ROAD,
        //     city: theatre?.CITY,
        //     t_id: id
        // });

        handleOpen();
        // window.location.reload();
    };
  return (
    <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="60vw"
        height="100%"
        margin="auto"
        marginTop={5}
        marginBottom={5}
        backgroundColor="#edeef0"
        borderRadius={5}
    >


        <Box
            width="80%"
            alignItems={"center"}
        >
            <Typography
                variant="h3"
                textAlign="center"
                sx={{ fontWeight: 'bold', mb: 3 }}
                color={'#7c4699'}
                marginTop={5}
            >
                Theatre Details Form
            </Typography>
            <form onSubmit={handleTheatreSubmit}>
                <FormLabel
                    sx={{ 
                        fontWeight: 'bold', 
                        fontSize: '30px',
                        fontFamily: 'Montserrat',
                        color: '#6e6e6e',
                        
                    }}
                >
                    Theatre Name:
                </FormLabel>
                <TextField
                    sx={{
                        marginLeft: '20px',
                        backgroundColor: 'white',
                        width: '60%',
                    }}
                    type="text"
                    id="name"
                    name="name"
                    value={theatreFormData?.name}
                    onChange={handleTheatreInputChange}
                    required
                />
                <br /><br />
                
                <FormLabel
                    sx={{ 
                        fontWeight: 'bold', 
                        fontSize: '30px',
                        fontFamily: 'Montserrat',
                        color: '#6e6e6e',
                    }}
                >
                    Building:
                </FormLabel>
                <TextField
                    sx={{
                        marginLeft: '94px',
                        backgroundColor: 'white',
                        width: '60%',
                    }}
                    type="address"
                    id="building"
                    name="building"
                    value={theatreFormData?.building}
                    onChange={handleTheatreInputChange}
                    required
                /><br /><br />

                <FormLabel
                    sx={{ 
                        fontWeight: 'bold', 
                        fontSize: '30px',
                        fontFamily: 'Montserrat',
                        color: '#6e6e6e',
                    }}
                >
                    Road:
                </FormLabel>
                <TextField
                    sx={{
                        marginLeft: '137px',
                        backgroundColor: 'white',
                        width: '60%',
                    }}
                    type="text"
                    id="road"
                    name="road"
                    value={theatreFormData?.road}
                    onChange={handleTheatreInputChange}
                    required
                /><br /><br />
                <Box
                    display={'flex'}
                    flexDirection={'row'}
                >
                    <FormLabel
                        sx={{ 
                            fontWeight: 'bold', 
                            fontSize: '30px',
                            fontFamily: 'Montserrat',
                            color: '#6e6e6e',
                        }}
                    >
                        City:
                    </FormLabel>
                    <TextField
                        sx={{
                            marginLeft: '150px',
                            backgroundColor: 'white',
                            width: '60%',
                        }}
                        type="text"
                        id="city"
                        name="city"
                        value={theatreFormData?.city}
                        onChange={handleTheatreInputChange}
                        required
                    />
                </Box>                
                <br /><br />
                <Box
                    align={"center"}
                >
                    <Button 
                        variant={"outlined"}
                        type='submit' 
                        sx={{
                            margin:"auto",
                            marginTop:2,
                            marginBottom: 7,
                            height:60, 
                            color:"white", 
                            bgcolor:"#7c4699", 
                            fontSize:"20px", 
                            borderColor:"#7c4699",
                            width:"25%",
                            borderRadius:10,
                            '&:hover': {
                                backgroundColor: '#900c3f', 
                                borderColor: '#900c3f', 
                                color:"#e3e4e6"
                            }
                        }}                
                    >
                        Edit Theatre
                    </Button>
                </Box>
                
            </form>
        </Box>
        <Dialog PaperProps={{style:{borderRadius:20, padding:40}}} open={open}>
            <Typography variant="h4" textAlign={"center"}>
                Theatre Editted
            </Typography>
            <Typography variant="h4" textAlign={"center"}>
                Successfully
            </Typography>
            <Typography variant="h4" textAlign={"center"}>
                <br></br>
            </Typography>
            <Box
                align='center'
                margin={"auto"}
                // justifyContent={"center"}
                width='50%'
            >
                <Button
                    onClick={()=>{
                                handleClose();
                                window.location.reload();
                            }} 
                    sx={{mt:2, borderRadius:10, bgcolor:"#2b2d42", color:"white", align:'center'}} 
                    variant={"contained"} 
                    // fullWidth
                >
                    OK
                </Button>
            </Box>            
        </Dialog>        
    </Box>
  )
}

export default EditTheatre
import { Box, Button, FormControl, FormLabel, InputLabel, MenuItem, TextField, TextareaAutosize, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Textarea from '@mui/joy/Textarea';
import Select from '@mui/joy/Select';
import Autocomplete from '@mui/material/Autocomplete';
import { addGalleryInfo, addMovie, addTheatreInfo, getAllCities } from '../../api-helpers/api-helpers';

const AddTheatre = ({setTabValue}) => {

    const [cities, setCities] = useState([])

    useEffect(()=>{
        setTabValue(2)
        getAllCities()
        .then((data)=>setCities(data.result))
        .catch((err)=>console.log(err))
    },[])
    
    const [page, setPage] = useState(1);
    const [galleryPage, setGalleryPage] = useState(0);

/****************************************************************/
    const [theatre, setTheatre] = useState();

    const [theatreFormData, setTheatreFormData] = useState({
        name: '',
        manager_id: localStorage.getItem('adminId'),
        building: '',
        road: '',
        city: '',
        count: ''
    });

    const handleTheatreInputChange = (e) => {
        const { name, value } = e.target;
        setTheatreFormData({
        ...theatreFormData,
        [name]: value,
        });
        console.log(value);
    };

    const handleTheatreSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here, e.g., send data to an API
            addTheatreInfo(theatreFormData)
            .then((data) => setTheatre(data))
            .catch((err) => console.log(err));
        // Reset the form after submission
        setTheatreFormData({
            name: '',
            building: '',
            road: '',
            city: '',
            count: ''
        });
        setPage(2);
        // window.location.reload();
    };

/****************************************************************/

const [gallery, setGallery] = useState();

    const [galleryFormData, setGalleryFormData] = useState({
        g_id: theatre?.galleries[galleryPage]?.g_id,
        t_id: theatre?.t_id,
        name: '',
        tiers: '',
        columns: '',
        price: ''
    });

    const handleGalleryInputChange = (e) => {
        const { name, value } = e.target;
        setTheatreFormData({
        ...theatreFormData,
        [name]: value,
        });
        console.log(value);
    };

    const handleGallerySubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here, e.g., send data to an API
            addGalleryInfo(galleryFormData)
            .then((data) => setTheatre(data))
            .catch((err) => console.log(err));
        // Reset the form after submission
        setTheatreFormData({
            name: '',
            tiers: '',
            columns: '',
            price: ''
        });
        setGalleryPage(galleryPage + 1);
        if(galleryPage == theatre?.galleries.length()) setPage(3);
        // window.location.reload();
    };

/****************************************************************/

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

{/***************************************************************/}

        {page===1 && (<>
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
                        value={theatreFormData.name}
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
                        value={theatreFormData.building}
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
                        value={theatreFormData.road}
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
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={cities}
                            sx={{ width: 460, marginLeft: 19, bgcolor: 'white' }}
                            renderInput={(params) => <TextField {...params} label="City" />}
                        />
                    </Box>
                    
                    <br /><br />
                    <FormLabel
                        sx={{ 
                            fontWeight: 'bold', 
                            fontSize: '30px',
                            fontFamily: 'Montserrat',
                            color: '#6e6e6e',
                            
                        }}
                    >            
                        Number of Galleries:
                    </FormLabel>
                    <TextField
                        sx={{
                            marginLeft: '90px',
                            backgroundColor: 'white',
                            width: '20%',
                        }}
                        type="number"
                        id="count"
                        name="count"
                        value={theatreFormData.count}
                        onChange={handleTheatreInputChange}
                        required
                    /><br /><br />
                    <Box
                        align={"center"}
                    >
                        <Button 
                            variant={"outlined"}
                            type='submit' 
                            sx={{
                                margin:"auto",
                                marginTop:5,
                                marginBottom: 7,
                                height:60, 
                                color:"white", 
                                bgcolor:"#7c4699", 
                                fontSize:"20px", 
                                borderColor:"#7c4699",
                                width:"35%",
                                borderRadius:10,
                                '&:hover': {
                                    backgroundColor: '#900c3f', 
                                    borderColor: '#900c3f', 
                                    color:"#e3e4e6"
                                }
                            }}                
                        >
                            Add Theatre
                        </Button>
                    </Box>
                    
                </form>
            </Box>        
        </>)}

{/***************************************************************/}

        {/* {page===2 && ((theatre) && galleryPage < theatre?.galleries.length()) && ( */}
        {page===2 && (
            <>
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
                    Gallery {galleryPage + 1} Details Form
                </Typography>
                <form onSubmit={handleGallerySubmit}>
                    <FormLabel
                        sx={{ 
                            fontWeight: 'bold', 
                            fontSize: '30px',
                            fontFamily: 'Montserrat',
                            color: '#6e6e6e',
                            
                        }}
                    >
                        Gallery Name:
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
                        value={galleryFormData.name}
                        onChange={handleGalleryInputChange}
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
                        No. of Tiers:
                    </FormLabel>
                    <TextField
                        sx={{
                            marginLeft: '190px',
                            backgroundColor: 'white',
                            width: '20%',
                        }}
                        type="number"
                        id="tires"
                        name="tiers"
                        value={galleryFormData.tiers}
                        onChange={handleGalleryInputChange}
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
                        No. of Columns:
                    </FormLabel>
                    <TextField
                        sx={{
                            marginLeft: '140px',
                            backgroundColor: 'white',
                            width: '20%',
                        }}
                        type="number"
                        id="columns"
                        name="columns"
                        value={galleryFormData.road}
                        onChange={handleGalleryInputChange}
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
                        Regular Seat Price:
                    </FormLabel>
                    <TextField
                        sx={{
                            marginLeft: '100px',
                            backgroundColor: 'white',
                            width: '20%',
                        }}
                        type="number"
                        id="price"
                        name="price"
                        value={galleryFormData.price}
                        onChange={handleGalleryInputChange}
                        required
                    /><br /><br />
                    <Box
                        align={"center"}
                    >
                        <Button 
                            variant={"outlined"}
                            type='submit' 
                            sx={{
                                margin:"auto",
                                marginTop:5,
                                marginBottom: 7,
                                height:60, 
                                color:"white", 
                                bgcolor:"#7c4699", 
                                fontSize:"20px", 
                                borderColor:"#7c4699",
                                width:"35%",
                                borderRadius:10,
                                '&:hover': {
                                    backgroundColor: '#900c3f', 
                                    borderColor: '#900c3f', 
                                    color:"#e3e4e6"
                                }
                            }}                
                        >
                            Add Theatre
                        </Button>
                    </Box>
                    
                </form>
            </Box>        
        </>)}
        
    </Box>
  );
}

export default AddTheatre
import { Alert, Box, Button, Dialog, FormControl, FormLabel, InputLabel, MenuItem, TextField, TextareaAutosize, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Textarea from '@mui/joy/Textarea';
import Select from '@mui/joy/Select';
import Autocomplete from '@mui/material/Autocomplete';
import { addCategoryInfo, addGalleryInfo, addMovie, addTheatreInfo, getAllCities } from '../../api-helpers/api-helpers';
import FormControlContext from '@mui/material/FormControl/FormControlContext';

const AddTheatre = ({setTabValue}) => {

    

    const [cities, setCities] = useState([])

    useEffect(()=>{
        setTabValue(2)
        getAllCities()
        .then((data)=>setCities(data.cities))
        .catch((err)=>console.log(err))
    },[])
    
    const [page, setPage] = useState(1);
    const [galleryPage, setGalleryPage] = useState(0);

/****************************************************************/
    const [theatre, setTheatre] = useState();
    const [count, setCount] = useState(0);

    const [theatreFormData, setTheatreFormData] = useState({
        name: '',
        manager_id: localStorage.getItem('adminId'),
        building: '',
        road: '',
        city: '',
        count: 0
    });

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
        addTheatreInfo(theatreFormData)
        .then((data) => setTheatre(data))
        .catch((err) => console.log(err));

        setCount(theatreFormData.count);

        console.log(theatreFormData);

        // Reset the form after submission
        setTheatreFormData({
            name: '',
            building: '',
            road: '',
            city: '',
            count: 0
        });
        setPage(2);
        // window.location.reload();
    };

/****************************************************************/

    const [gallery, setGallery] = useState();

    const [galleryFormData, setGalleryFormData] = useState({
        g_id: 0,
        t_id: 0,
        name: '',
        tiers: 0,
        columns: 0,
        price: 0
    });

    const handleGalleryInputChange = (e) => {
        const { name, value } = e.target;
        setGalleryFormData({
            ...galleryFormData,
            [name]: value,
            g_id: theatre?.galleries[galleryPage],
            t_id: theatre?.t_id
        });
    };

    const handleGallerySubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here, e.g., send data to an API
            addGalleryInfo(galleryFormData)
            .then((data) => setGallery(data))
            .catch((err) => console.log(err));
        // Reset the form after submission

        console.log(galleryFormData)

        setGalleryFormData({
            name: '',
            tiers: 0,
            columns: 0,
            price: 0
        });

        if(galleryPage < count - 1) setPage(3);
        if(galleryPage == count - 1) {
            setPage(3);
        }
        // window.location.reload();
    };

/****************************************************************/

    const [buttonColors, setButtonColors] = useState([]);
    const [seats, setSeats] = useState([]);;
    
    const toggleButtonColor = (seatId) => {
        setButtonColors((prevColors) => ({
            ...prevColors,
            [seatId]: prevColors[seatId] === 'green' ? 'white' : 'green',
        }));

        console.log(seatId);

        // setSeats(() => {
        //     if (seats?.includes(seatId)) {
        //         return seats.filter((name) => name !== seatId);
        //     } else {
        //         return [...seats, seatId];
        //     }        
        // });

        // setCategoryFormData((prevCategoryFormData) => ({
        //     ...prevCategoryFormData,
        //     seats: seats,
        // }));

        setSeats((prevSeats) => {
            let updatedSeats;
            if (prevSeats?.includes(seatId)) {
              updatedSeats = prevSeats.filter((name) => name !== seatId);
            } else {
              updatedSeats = [...prevSeats, seatId];
            }
            
            // Ensure that setSeats completes before setting categoryFormData
            setCategoryFormData((prevCategoryFormData) => ({
              ...prevCategoryFormData,
              seats: updatedSeats,
            }));
          
            return updatedSeats; // Return the updated value for setSeats
        });
          

        console.log(categoryFormData);

        console.log(seats);
    };

    const [category, setCategory] = useState();

    const [categoryFormData, setCategoryFormData] = useState({
        g_id: 0,
        seats: [],
        price: 0
    });

    

    useEffect(() => {
        setSeats(seats)
        console.log('seats:', seats);
    }, [seats]);

    useEffect(() => {
        setCategoryFormData({
            ...categoryFormData,
            seats: seats
        });
        console.log('categoryFormData:', categoryFormData);
    }, [seats]);

    const handleCategoryInputChange = (e) => {
        const { name, value } = e.target;
            setCategoryFormData({
                ...categoryFormData,
                [name]: value,
                g_id: theatre?.galleries[galleryPage],
        });
    };

    const handleCategorySubmit = (e) => {
        e.preventDefault();

        console.log(seats);

        setCategoryFormData({
            ...categoryFormData,
            seats: seats
        });

        console.log(categoryFormData);

        // You can handle form submission here, e.g., send data to an API
        addCategoryInfo(categoryFormData)
        .then((data) => setCategory(data))
        .catch((err) => console.log(err));

        console.log(categoryFormData)
        // Reset the form after submission
        setCategoryFormData({
            ...categoryFormData,
            seats: [],
            price: 0
        });

        // categoryFormData.seats = [];

        console.log(categoryFormData);

        setButtonColors([]);
        setSeats([]);

        setGalleryPage(galleryPage + 1);
        if(galleryPage < count - 1) setPage(2);
        if(galleryPage == count - 1) {
            setPage(1);
            setGalleryPage(0);
            setCount(0);
        }
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
                        {/* <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={cities}
                            value={theatreFormData.city}
                            name={"city"}
                            onChange={(event, newValue) => {
                                setTheatreFormData({
                                    ...theatreFormData,
                                    city: newValue,
                                });
                            }}
                            sx={{ width: 460, marginLeft: 19, bgcolor: 'white' }}
                            renderInput={(params) => <TextField 
                                {...params} 
                                label="City"                                 
                            />}
                        /> */}
                        <TextField
                            sx={{
                                marginLeft: '150px',
                                backgroundColor: 'white',
                                width: '60%',
                            }}
                            type="text"
                            id="city"
                            name="city"
                            value={theatreFormData.city}
                            onChange={handleTheatreInputChange}
                            required
                        />
                        {/* <Box
                            width={'60%'}
                            marginLeft={19}
                        >                        
                        <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">City</InputLabel>
                              <Select
                                id="demo-simple-select"
                                value={theatreFormData.city}
                                required
                                label="City"
                                name="city"
                                type='text'
                                onChange={handleTheatreInputChange}
                              > */}
                                {/* {cities.map((city, index) => (<>
                                    <MenuItem key={index} value={city}>{city}</MenuItem>
                                </>))} */}
                                {/* <MenuItem value="title">Title</MenuItem>
                                <MenuItem value="actor">Actor</MenuItem>
                                <MenuItem value="director">Director</MenuItem>
                                <MenuItem value="genre">Genre</MenuItem>
                                <MenuItem value="duration">Duration</MenuItem>
                              </Select>
                            </FormControl>
                            </Box> */}
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
                    <Typography
                        variant="h6"
                        textAlign="center"
                        color="red"
                    >
                        {category?.message}
                    </Typography>
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
                        value={galleryFormData.columns}
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
                            Add Gallery
                        </Button>
                    </Box>
                    
                </form>
            </Box>        
        </>)}
        
{/***************************************************************/}

        {/* {page===2 && ((theatre) && galleryPage < theatre?.galleries.length()) && ( */}
        {page===3 && (
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
                    Gallery {galleryPage + 1} Seats Details Form
                </Typography>
                <form onSubmit={handleCategorySubmit}>                    
                    <FormLabel
                        sx={{ 
                            fontWeight: 'bold', 
                            fontSize: '30px',
                            fontFamily: 'Montserrat',
                            color: '#6e6e6e',
                        }}
                    >
                        Premium Seats Price:
                    </FormLabel>
                    <TextField
                        sx={{
                            marginLeft: '190px',
                            backgroundColor: 'white',
                            width: '20%',
                        }}
                        type="number"
                        id="price"
                        name="price"
                        value={categoryFormData.price}
                        onChange={handleCategoryInputChange}
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
                        Select Premium Seats:
                    </FormLabel>
                    <Box
                        display={'flex'}
                        flexDirection={'row'}
                        width='100%'
                        align='center'
                        margin='auto'
                        flexWrap={"wrap"}
                    >
                        {gallery?.seats.map((seat, index) => (
                            <Box
                                key={index}
                                width={`${90 / 5}%`}
                                // width={'8%'}
                                margin={"auto"}
                                // marginRight={1}
                                // marginLeft={1}
                                padding={0.2}
                                paddingBottom={1}
                                sx={{ "&:hover": { boxShadow: 5 } }}
                                // justifyContent={"center"}
                            >
                                <Button
                                    variant="outlined"
                                    onClick={() => {            
                                        toggleButtonColor(seat);
                                        // handleCategoryInputChange;                                                               
                                    }}
                                    
                                    style={{ 
                                        backgroundColor: buttonColors[seat] || 'white',
                                        borderColor: 'black',
                                        color: "black",
                                        // fontsize:"10px",
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
                                        color="black"
                                        fontFamily={'Sans-serif'}
                                        margin={'auto'}
                                        // width={'10vw'}
                                        // marginLeft={1}
                                        // marginTop={4}
                                        fontWeight={'bold'}
                                    >
                                        {seat}
                                    </Typography>                                
                                </Button>
                            </Box>
                        ))}
                    </Box>
                    
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
                            Confirm
                        </Button>
                    </Box>
                    
                </form>
        
            </Box>        
        </>)}
{/***************************************************************/}

    </Box>
  );
}

export default AddTheatre
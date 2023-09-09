import { Box, Button, FormControl, FormLabel, InputLabel, MenuItem, TextField, TextareaAutosize, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Textarea from '@mui/joy/Textarea';
import Select from '@mui/joy/Select';
import Autocomplete from '@mui/material/Autocomplete';
import { addMovie } from '../../api-helpers/api-helpers';

const AddMovie = ({setTabValue}) => {
    useEffect(()=>{setTabValue(2)},[])
    const [formData, setFormData] = useState({
        manager_id: localStorage.getItem('adminId'),
        title: '',
        releaseDate: '',
        duration: '',
        synopsis: '',
        posterUrl: '',
        backPosterUrl: '',
        genres: '',
        directorName: '',
        country: '',
        dob: '',
    });

    function formatDate(inputDate) {
        // Split the input date by '/' to get day, month, and year components
        const dateComponents = inputDate.split('/');
        
        // Ensure the input format is correct (day, month, year)
        if (dateComponents.length !== 3) {
        return "Invalid Date";
        }
        
        // Extract day, month, and year components
        const [day, month, year] = dateComponents;
    
        // Create a new date object in the desired format "dd-mm-yyyy"
        const formattedDate = `${day}-${month}-${year}`;
    
        return formattedDate;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
        console.log(value);
    };

    const genres = ['action', 'adventure', 'comedy', 'drama', 'fantasy', 'family', 'horror', 'mystery', 'romance', 'sci-fi', 'thriller', 'western'];

    const handleGenreChange = (e) => {
        const { options } = e.target;
        const selectedGenres = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

        setFormData({
        ...formData,
        genres: selectedGenres,
        });
    };

    const handleDateChange = (e) => {
        const originalDateString = e.target.value;
        const parts = originalDateString.split("-");
        const rearrangedDateString = `${parts[2]}-${parts[1]}-${parts[0]}`;

        setFormData({
            ...formData,
            releaseDate: rearrangedDateString,
        });

        console.log(formData.dob)
    }

    function formatDate(inputDate) {
        const originalDateString = inputDate;
        const parts = originalDateString.split("-");
        const rearrangedDateString = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here, e.g., send data to an API
            addMovie(formData)
            .catch((err) => console.log(err));
        // Reset the form after submission
        setFormData({
        title: '',
        releaseDate: '',
        duration: '',
        synopsis: '',
        posterUrl: '',
        backPosterUrl: '',
        genres: '',
        directorName: '',
        country: '',
        dob: '',
        });
        window.location.reload();
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
        marginBottom={5}
      >
        Movie Details Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormLabel
            sx={{ 
                fontWeight: 'bold', 
                fontSize: '30px',
                fontFamily: 'Montserrat',
                color: '#6e6e6e',
                
            }}
        >
            Movie Title:
        </FormLabel>
        <TextField
            sx={{
                marginLeft: '20px',
                backgroundColor: 'white',
                width: '60%',
            }}
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
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
            Release Date:
        </FormLabel>
        <TextField
            sx={{
                marginLeft: '20px',
                backgroundColor: 'white',
                width: '30%',
            }}
          type="date"
          id="releaseDate"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleInputChange}
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
            Duration (minutes):
        </FormLabel>
        <TextField
            sx={{
                marginLeft: '20px',
                backgroundColor: 'white',
                width: '20%',
            }}
          type="number"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
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
            Synopsis:
        </FormLabel>
        <Textarea
            id="synopsis"
            name="synopsis"
            minRows={8} // Minimum number of rows
            maxRows={10} // Maximum number of rows
            value={formData.synopsis}
            onChange={handleInputChange}
            required
            sx={{
                marginTop: '20px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '16px',
                fontFamily: 'Arial, sans-serif',
                color: 'black',
                resize: 'vertical',
            }}>
        </Textarea>
        <br /><br />

        <FormLabel
            sx={{ 
                fontWeight: 'bold', 
                fontSize: '30px',
                fontFamily: 'Montserrat',
                color: '#6e6e6e',
            }}
        >
            Poster URL:
        </FormLabel>
        <TextField
            sx={{
                marginLeft: '20px',
                backgroundColor: 'white',
                width: '60%',
            }}
          type="url"
          id="posterUrl"
          name="posterUrl"
          value={formData.posterUrl}
          onChange={handleInputChange}
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
            Back Poster URL:
        </FormLabel>
        <TextField
            sx={{
                marginLeft: '20px',
                backgroundColor: 'white',
                width: '60%',
            }}
          type="url"
          id="backPosterUrl"
          name="backPosterUrl"
          value={formData.backPosterUrl}
          onChange={handleInputChange}
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
                Genres:
            </FormLabel>
            <Autocomplete
                onChange={(event, newValue) => {
                    setFormData({
                        ...formData,
                        genres: newValue.join(', ')
                    });
                    console.log(newValue.join(', '))
                }}
                sx={{
                    marginLeft: '20px',
                    backgroundColor: 'white',
                    width: '60%',
                }}
                multiple
                id="tags-outlined"
                options={genres}
                getOptionLabel={(option) => option}
                // defaultValue={[genres[0]]}
                filterSelectedOptions
                renderInput={(params) => (
                <TextField
                    {...params}
                    label=""
                    placeholder="Genres"
                />
                )}
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
            Director's Name:
        </FormLabel>
        <TextField
            sx={{
                marginLeft: '20px',
                backgroundColor: 'white',
                width: '60%',
            }}
          type="text"
          id="directorName"
          name="directorName"
          value={formData.directorName}
          onChange={handleInputChange}
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
            Country:
        </FormLabel>
        <TextField
            sx={{
                marginLeft: '20px',
                backgroundColor: 'white',
                width: '60%',
            }}
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
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
            Date of Birth:
        </FormLabel>
        <TextField
            sx={{
                marginLeft: '20px',
                backgroundColor: 'white',
                width: '30%',
            }}
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            required
        />
            <br /><br />

            <Button 
                variant={"outlined"}
                type='submit' 
                sx={{
                    margin:"auto",
                    // marginTop:5,
                    marginBottom: 5,
                    height:60, 
                    color:"white", 
                    bgcolor:"#7c4699", 
                    fontSize:"20px", 
                    borderColor:"#7c4699",
                    width:"100%",
                    borderRadius:10,
                    '&:hover': {
                    backgroundColor: '#900c3f', 
                    borderColor: '#900c3f', 
                    color:"#e3e4e6"}}}                
            >
                Add Movie
            </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddMovie;
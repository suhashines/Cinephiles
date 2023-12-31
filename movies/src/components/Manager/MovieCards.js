import { Box, Button, Card, CardActions, CardContent, Dialog, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { addMovieToTheatre, deleteTheatreMovie } from '../../api-helpers/api-helpers';

const MovieCards = ({title,releaseDate,posterurl,id, t_id}) => {
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  
      const [open, setOpen] = React.useState(false);
  
      const handleOpen = () => {
          setOpen(true);
      }
  
      const handleClose = () => {
          setOpen(false);
      }
  
    return (
      <Card sx={{ 
          width:280, 
          height: 540, 
          borderRadius: 5,
          margin: 2, 
          ":hover":{
              boxShadow:"10px 10px 20px #ccc"
          }}}>
        <img height={"65%"} width="100%" src={posterurl} alt={title}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div"
          sx={{
            height: '2.5em', // Adjust the height to accommodate your desired number of lines
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            'WebkitLineClamp': 2, // Adjust the number of lines
            'WebkitBoxOrient': 'vertical',
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(releaseDate).toDateString()}
          </Typography>
        </CardContent>
        <CardActions>
          <Button 
              onClick={()=>{
                  handleOpen();
              }} 
              sx={{margin:"auto", 
              textAlign:'center'}} 
              size="small"
          >
              Add
          </Button>       
        </CardActions>
        <Dialog PaperProps={{style:{borderRadius:20, padding:40}}} open={open}>
              <Box sx={{ml:"auto", padding:0}}>
                  <IconButton onClick={handleClose}>
                      <CloseRoundedIcon/>
                  </IconButton>
              </Box>
              <Typography variant="h4" textAlign={"center"}>
                  Are you sure
              </Typography>
              <Typography variant="h4" textAlign={"center"}>
                  you want to add
              </Typography>
              <Typography variant="h4" textAlign={"center"}>
                  this Movie?
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
                                  addMovieToTheatre(t_id, id)
                                  handleClose();                    
                                //   window.location.reload();
                              }} 
                      sx={{mt:2, borderRadius:10, bgcolor:"#2b2d42", color:"white", align:'center'}} 
                      variant={"contained"} 
                      // fullWidth
                  >
                      Yes
                  </Button>
              </Box>            
          </Dialog>
      </Card>
    )
}

export default MovieCards
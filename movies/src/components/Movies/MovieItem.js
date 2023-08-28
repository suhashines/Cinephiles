import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const MovieItems = ({title,releaseDate,posterurl,id}) => {
  return (
    <Card sx={{ 
        width:280, 
        height: 520, 
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
        <Button LinkComponent={Link} to={`/bookings/${id}`} sx={{margin:"auto"}} size="small">Book</Button>
      </CardActions>
    </Card>
  )
}

export default MovieItems